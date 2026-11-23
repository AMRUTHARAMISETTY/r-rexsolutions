import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { playFormationSound } from '@/lib/logoSound'

// Layer boxes in px of the original 1254×1254 artwork. PNGs are in public/assets/logo-layers/.
const S = 1254
const BOX = {
  head: { x: 314, y: 181, w: 719, h: 683 },
  patch: { x: 710, y: 239, w: 279, h: 133 },
  inner: { x: 497, y: 400, w: 511, h: 299 },
  tri: { x: 549, y: 749, w: 166, h: 115 },
  eye: { x: 739, y: 270, w: 59, h: 48 },
  orange: { x: 455, y: 572, w: 162, h: 292 },
  yellow: { x: 647, y: 620, w: 156, h: 244 },
  word: { x: 86, y: 915, w: 1090, h: 89 },
} as const
type LayerName = keyof typeof BOX
type Mover = 'head' | 'inner' | 'eye' | 'orange' | 'yellow' | 'tri'

// [start, end, dx, dy, rotation] — seconds / px / radians
const T: Record<Mover, [number, number, number, number, number]> = {
  head: [0.0, 2.0, -110, -80, -0.03],
  // The structural pieces now arrive together as one formation beat.
  inner: [0.0, 2.0, 0, 140, 0],
  tri: [0.0, 2.0, 0, 220, 0],
  // Facial details and coloured braces follow after the structure locks.
  eye: [2.35, 3.25, -60, 0, 0],
  orange: [3.25, 4.75, -340, 320, -0.3],
  yellow: [3.25, 4.75, 340, 320, 0.3],
}
const WORD: [number, number] = [4.75, 6.25]
const WIPE: [number, number] = [2.35, 3.25]
const HIGHLIGHT: [number, number] = [8.8, 10.0]
export const FORMATION_SECONDS = 10.8

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const ease = (p: number) => 1 - Math.pow(1 - clamp(p), 3)

export interface LogoFormationProps {
  /** CSS size of the square canvas (number = px). */
  size?: number | string
  /** Play the synthesised sound effects (audio must have been unlocked by a user gesture, see unlockAudio). */
  sound?: boolean
  showWordmark?: boolean
  loop?: boolean
  loopDelay?: number
  speed?: number
  /** Change this number to replay the animation. */
  replayToken?: number
  onComplete?: () => void
  className?: string
  style?: CSSProperties
  basePath?: string
}

/** Transparent-background R-REX logo formation: parts → complete logo. */
export default function LogoFormation({
  size = 480,
  sound = false,
  showWordmark = true,
  loop = false,
  loopDelay = 4000,
  speed = 1,
  replayToken = 0,
  onComplete,
  className,
  style,
  basePath = `${import.meta.env.BASE_URL}assets/logo-layers`,
}: LogoFormationProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const doneRef = useRef(onComplete)
  doneRef.current = onComplete

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const off = document.createElement('canvas')
    off.width = S
    off.height = S
    const o = off.getContext('2d')
    if (!o) return

    const imgs: Partial<Record<LayerName, HTMLImageElement>> = {}
    let raf = 0
    let timer = 0
    let dead = false
    let stopSound: (() => void) | null = null

    const band = (x: number, w: number, a: number) => {
      o.globalCompositeOperation = 'source-atop'
      const g = o.createLinearGradient(x - w, 0, x + w, 0)
      g.addColorStop(0, 'rgba(255,225,170,0)')
      g.addColorStop(0.5, `rgba(255,232,190,${a})`)
      g.addColorStop(1, 'rgba(255,225,170,0)')
      o.fillStyle = g
      o.fillRect(0, 0, S, S)
      o.globalCompositeOperation = 'source-over'
    }

    const fireAtmosphere = (t: number) => {
      const fade = clamp(1 - Math.max(0, t - 7.8) / 2.6)
      if (fade <= 0) return
      o.save()
      o.globalCompositeOperation = 'lighter'
      const heat = o.createRadialGradient(570, 650, 20, 570, 650, 390)
      heat.addColorStop(0, `rgba(255,104,18,${0.16 * fade})`)
      heat.addColorStop(0.42, `rgba(239,103,19,${0.07 * fade})`)
      heat.addColorStop(1, 'rgba(239,103,19,0)')
      o.fillStyle = heat
      o.fillRect(170, 300, 800, 620)

      for (let i = 0; i < 72; i += 1) {
        const seed = i * 17.371
        const rise = (t * (18 + (i % 5) * 5) + seed * 7) % 430
        const x = 310 + ((Math.sin(seed) + 1) * 0.5) * 520 + Math.sin(t * 1.7 + seed) * 12
        const y = 850 - rise
        const alpha = fade * (0.16 + ((i * 13) % 9) / 30) * (1 - rise / 500)
        o.globalAlpha = alpha
        o.fillStyle = i % 3 === 0 ? '#FCF0E1' : i % 2 === 0 ? '#F9A32C' : '#EF6713'
        o.shadowColor = '#EF6713'
        o.shadowBlur = 12
        o.beginPath()
        o.arc(x, y, 1 + (i % 3) * 0.7, 0, Math.PI * 2)
        o.fill()
      }
      o.restore()
    }

    const piece = (r: Mover, t: number) => {
      const im = imgs[r]
      const [s, e, dx, dy, rot] = T[r]
      if (!im || t < s) return
      const b = BOX[r]
      const p = clamp((t - s) / (e - s))
      const k = ease(p)
      const glow = 54 * (1 - k) + (t > e ? 34 * Math.exp(-(t - e) * 9) : 0)
      o.save()
      o.globalAlpha = clamp(p * 3)
      o.shadowColor = 'rgba(255,104,18,.95)'
      o.shadowBlur = t > e + 0.6 ? 0 : glow
      o.translate(b.x + b.w / 2 + dx * (1 - k), b.y + b.h / 2 + dy * (1 - k))
      o.rotate(rot * (1 - clamp(k / 0.8)))
      o.drawImage(im, -b.w / 2, -b.h / 2)
      o.restore()
    }

    const render = (t: number) => {
      o.clearRect(0, 0, S, S)
      ctx.clearRect(0, 0, S, S)
      fireAtmosphere(t)
      piece('head', t)
      // The supplied head artwork contains the facial details baked into it.
      // Hold that small region back so the eyebrow/eye can resolve after the
      // main silhouette, matching the staged assembly timing.
      if (imgs.head && t < WIPE[1]) {
        const reveal = t < WIPE[0] ? 0 : ease((t - WIPE[0]) / (WIPE[1] - WIPE[0]))
        o.save()
        o.fillStyle = '#FCF0E1'
        o.fillRect(700, 238, 132, 112)
        if (reveal > 0) {
          o.globalAlpha = reveal
          o.beginPath()
          o.rect(700, 238, 132, 112)
          o.clip()
          o.drawImage(imgs.head, BOX.head.x, BOX.head.y)
        }
        o.restore()
      }
      const patch = imgs.patch
      if (patch && t < WIPE[1]) {
        const b = BOX.patch
        const p = t < WIPE[0] ? 0 : ease((t - WIPE[0]) / (WIPE[1] - WIPE[0]))
        o.save()
        o.globalAlpha = clamp(t / 0.7)
        o.beginPath()
        o.rect(b.x + b.w * p, b.y, b.w * (1 - p), b.h)
        o.clip()
        o.drawImage(patch, b.x, b.y)
        o.restore()
      }
      piece('eye', t)
      piece('inner', t)
      piece('orange', t)
      piece('yellow', t)
      piece('tri', t)
      const word = imgs.word
      if (showWordmark && word && t > WORD[0]) {
        const b = BOX.word
        const p = ease((t - WORD[0]) / (WORD[1] - WORD[0]))
        o.save()
        o.beginPath()
        o.rect(b.x, b.y, b.w * p, b.h)
        o.clip()
        o.drawImage(word, b.x, b.y)
        o.restore()
        if (p < 1) band(b.x + b.w * p, 90, 0.7)
      }
      if (t > HIGHLIGHT[0] && t < HIGHLIGHT[1])
        band(-200 + (S + 400) * ((t - HIGHLIGHT[0]) / (HIGHLIGHT[1] - HIGHLIGHT[0])), 130, 0.35)
      const sc = t < 8 ? 1.06 - 0.06 * ease(t / 8) : 1
      ctx.save()
      ctx.translate(S / 2, S / 2)
      ctx.scale(sc, sc)
      ctx.translate(-S / 2, -S / 2)
      ctx.drawImage(off, 0, 0)
      ctx.restore()
    }

    const play = () => {
      if (dead) return
      stopSound?.()
      stopSound = sound ? playFormationSound(speed) : null
      const t0 = performance.now()
      const frame = (n: number) => {
        if (dead) return
        const t = Math.min(FORMATION_SECONDS, ((n - t0) / 1000) * speed)
        render(t)
        if (t < FORMATION_SECONDS) raf = requestAnimationFrame(frame)
        else {
          doneRef.current?.()
          if (loop) timer = window.setTimeout(play, loopDelay)
        }
      }
      raf = requestAnimationFrame(frame)
    }

    const names = Object.keys(BOX) as LayerName[]
    void Promise.all(
      names.map(
        (n) =>
          new Promise<void>((res) => {
            const im = new Image()
            im.onload = () => {
              imgs[n] = im
              res()
            }
            im.onerror = () => res()
            im.src = `${basePath}/${n}.png`
          }),
      ),
    ).then(() => {
      if (dead) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        render(FORMATION_SECONDS + 1)
        doneRef.current?.()
      } else play()
    })

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      stopSound?.()
    }
  }, [basePath, loop, loopDelay, speed, showWordmark, sound, replayToken])

  return (
    <canvas
      ref={ref}
      width={S}
      height={S}
      role="img"
      aria-label="R-REX Solutions logo"
      className={className}
      style={{ width: size, height: size, maxWidth: '100%', background: 'transparent', ...style }}
    />
  )
}
