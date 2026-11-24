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
  head: [0.6, 1.6, -240, -180, -0.16],
  inner: [1.3, 2.3, 300, 40, 0.2],
  eye: [2.35, 2.85, 0, 0, 0],
  orange: [3.0, 4.0, -340, 320, -0.45],
  yellow: [3.5, 4.5, 340, -240, 0.42],
  tri: [4.3, 4.9, 0, 220, -0.15],
}
const WORD: [number, number] = [5.4, 6.3]
const HIGHLIGHT: [number, number] = [4.9, 5.7]
export const FORMATION_SECONDS = 7

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const ease = (p: number) => 1 - Math.pow(1 - clamp(p), 3)

export interface LogoFormationProps {
  /** CSS size of the square canvas (number = px). */
  size?: number | string
  /** Play the synthesised sound effects (audio must have been unlocked by a user gesture, see unlockAudio). */
  sound?: boolean
  /** Show the final artwork immediately, without running a timeline. */
  settled?: boolean
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
  settled = false,
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
    let finish = () => {}
    let visible = true
    let loaded = false
    let quality = navigator.hardwareConcurrency <= 4 || window.innerWidth < 640 ? 0 : navigator.hardwareConcurrency >= 10 ? 2 : 1
    let slowFrames = 0
    canvas.dataset.quality = ['performance', 'balanced', 'ultra'][quality]
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
      const fade = clamp(1 - Math.max(0, t - 4.9) / 1.4)
      if (fade <= 0) return
      o.save()
      o.globalCompositeOperation = 'lighter'
      const heat = o.createRadialGradient(570, 650, 20, 570, 650, 390)
      heat.addColorStop(0, `rgba(255,104,18,${0.16 * fade})`)
      heat.addColorStop(0.42, `rgba(239,103,19,${0.07 * fade})`)
      heat.addColorStop(1, 'rgba(239,103,19,0)')
      o.fillStyle = heat
      o.fillRect(170, 300, 800, 620)

      for (let i = 0; i < [16, 36, 64][quality]; i += 1) {
        const seed = i * 17.371
        const rise = (t * (18 + (i % 5) * 5) + seed * 7) % 430
        const x = 310 + ((Math.sin(seed) + 1) * 0.5) * 520 + Math.sin(t * 1.7 + seed) * 12
        const y = 850 - rise
        const alpha = fade * (0.16 + ((i * 13) % 9) / 30) * (1 - rise / 500)
        o.globalAlpha = alpha
        o.fillStyle = i % 3 === 0 ? '#FCF0E1' : i % 2 === 0 ? '#F9A32C' : '#EF6713'
        o.shadowColor = '#EF6713'
        o.shadowBlur = quality === 0 ? 0 : 8
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
      const depth = 1 - (r === 'orange' ? 0.35 : 0.16) * (1 - k)
      o.scale(depth, depth)
      o.drawImage(im, -b.w / 2, -b.h / 2)
      o.restore()
    }

    const render = (t: number) => {
      o.clearRect(0, 0, S, S)
      ctx.clearRect(0, 0, S, S)
      if (t < FORMATION_SECONDS) fireAtmosphere(t)
      // Finite ignition and localized locking rings, all on the same clock.
      for (const beat of [0.05, 1.6, 2.3, 2.85, 4, 4.5, 4.9]) {
        const age = t - beat
        if (age < 0 || age > 0.55) continue
        o.save()
        o.globalAlpha = (1 - age / 0.55) * 0.65
        o.strokeStyle = beat === 4.5 ? '#f9b633' : '#ef6713'
        o.lineWidth = 2 * (1 - age / 0.55)
        o.beginPath()
        o.ellipse(627, beat < 1 ? 590 : 700, 18 + age * 620, 8 + age * 150, -0.15, 0, Math.PI * 2)
        o.stroke()
        o.restore()
      }
      piece('head', t)
      // The supplied patch masks the baked-in facial cuts while the head moves.
      if (imgs.patch && t >= T.head[0] && t < 3.1) {
        const k = ease((t - T.head[0]) / (T.head[1] - T.head[0]))
        const b = BOX.head
        const reveal = ease((t - 2.1) / 1)
        o.save()
        o.translate(b.x + b.w / 2 - 240 * (1 - k), b.y + b.h / 2 - 180 * (1 - k))
        o.rotate(-0.16 * (1 - clamp(k / 0.8)))
        o.scale(1 - 0.16 * (1 - k), 1 - 0.16 * (1 - k))
        o.globalAlpha = clamp((t - 0.6) * 3)
        o.beginPath()
        o.rect(BOX.patch.x - b.x - b.w / 2 + BOX.patch.w * reveal, BOX.patch.y - b.y - b.h / 2, BOX.patch.w * (1 - reveal), BOX.patch.h)
        o.clip()
        o.drawImage(imgs.patch, BOX.patch.x - b.x - b.w / 2, BOX.patch.y - b.y - b.h / 2)
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
      const sc = t < 6.3 ? 1.045 - 0.045 * ease(t / 6.3) : 1
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
      let elapsed = 0
      let previous = performance.now()
      let completed = false
      finish = () => {
        if (completed) return
        completed = true
        cancelAnimationFrame(raf)
        stopSound?.()
        render(FORMATION_SECONDS)
        doneRef.current?.()
        if (loop) timer = window.setTimeout(play, loopDelay)
      }
      const frame = (n: number) => {
        if (dead || completed) return
        if (!visible || document.hidden) { finish(); return }
        const delta = n - previous
        previous = n
        elapsed += delta
        if (delta > 28) slowFrames++; else slowFrames = Math.max(0, slowFrames - 1)
        if (slowFrames > 35 && quality > 0) {
          quality--; slowFrames = 0
          canvas.dataset.quality = ['performance', 'balanced', 'ultra'][quality]
        }
        const t = Math.min(FORMATION_SECONDS, elapsed / 1000 * Math.max(0.1, speed))
        render(t)
        if (t < FORMATION_SECONDS) raf = requestAnimationFrame(frame)
        else finish()
      }
      raf = requestAnimationFrame(frame)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!visible && loaded) finish()
    })
    observer.observe(canvas)
    const hide = () => { if (document.hidden && loaded) finish() }
    document.addEventListener('visibilitychange', hide)

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
      loaded = true
      if (settled || !visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        render(FORMATION_SECONDS + 1)
        doneRef.current?.()
      } else play()
    })

    return () => {
      dead = true
      observer.disconnect()
      document.removeEventListener('visibilitychange', hide)
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      stopSound?.()
    }
  }, [basePath, loop, loopDelay, speed, showWordmark, sound, replayToken, settled])

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
