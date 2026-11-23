import { useEffect, useState } from 'react'
import LogoFormation from '@/components/ui/LogoFormation'
import { unlockAudio } from '@/lib/logoSound'

const SEEN_KEY = 'rrex-intro-seen'
type Phase = 'gate' | 'playing' | 'leaving' | 'done'

function shouldSkip() {
  try {
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem(SEEN_KEY) === '1'
    )
  } catch {
    return false
  }
}

/** Full-screen intro: the logo forms from parts, with sound if the visitor opts in. Plays once per session. */
export default function LogoIntro({ onDone }: { onDone?: () => void }) {
  const [phase, setPhase] = useState<Phase>(() => (shouldSkip() ? 'done' : 'gate'))
  const [withSound, setWithSound] = useState(false)

  const start = (sound: boolean) => {
    if (sound) unlockAudio()
    setWithSound(sound)
    setPhase('playing')
  }
  const leave = () => setPhase((p) => (p === 'done' ? p : 'leaving'))

  useEffect(() => {
    if (phase === 'done') {
      onDone?.()
      return
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [phase, onDone])

  useEffect(() => {
    if (phase !== 'leaving') return
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignore */
    }
    const id = window.setTimeout(() => setPhase('done'), 700)
    return () => window.clearTimeout(id)
  }, [phase])

  useEffect(() => {
    if (phase === 'done') return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && leave()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  if (phase === 'done') return null

  const btn = {
    minHeight: 44,
    padding: '0 22px',
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    border: '1px solid #EF6713',
  } as const

  return (
    <div
      role="dialog"
      aria-label="R-REX Solutions intro"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#160D05',
        color: '#FCF0E1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 16,
        opacity: phase === 'leaving' ? 0 : 1,
        transition: 'opacity 700ms ease',
      }}
    >
      {phase === 'gate' ? (
        <>
          <p style={{ letterSpacing: '0.3em', fontSize: 13, opacity: 0.7, margin: 0 }}>R-REX SOLUTIONS</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button autoFocus onClick={() => start(true)} style={{ ...btn, background: '#EF6713', color: '#160D05' }}>
              Enter with sound
            </button>
            <button onClick={() => start(false)} style={{ ...btn, background: 'transparent', color: '#FCF0E1' }}>
              Enter silently
            </button>
          </div>
        </>
      ) : (
        <>
          <LogoFormation size="min(82vw, 72vh, 760px)" sound={withSound} onComplete={() => window.setTimeout(leave, 1200)} />
          <button
            onClick={leave}
            style={{ ...btn, border: '1px solid rgba(252,240,225,.3)', background: 'transparent', color: '#FCF0E1', minHeight: 44 }}
          >
            Skip
          </button>
        </>
      )}
    </div>
  )
}
