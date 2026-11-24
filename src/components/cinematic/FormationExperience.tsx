import { useState } from 'react'
import LogoFormation from '../ui/LogoFormation'

const SEEN_KEY = 'rrex-formation-seen'
function seen() {
  try { return sessionStorage.getItem(SEEN_KEY) === '1' } catch { return false }
}

export function FormationExperience({ reducedMotion }: { reducedMotion: boolean }) {
  const [settled, setSettled] = useState(() => reducedMotion || seen())
  const complete = () => {
    setSettled(true)
    try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* Storage is optional. */ }
  }
  return (
    <div className="formation-experience">
      <LogoFormation className="hero-logo-formation" size="min(42vw, 34rem)" settled={settled || reducedMotion}
        onComplete={complete} />
    </div>
  )
}
