// Synthesised sound design for the R-REX logo formation. No audio files needed.
// Browsers only allow audio after a user gesture, so call unlockAudio() from a click/tap/keydown handler.

let ctx: AudioContext | null = null
let master: GainNode | null = null
let verb: ConvolverNode | null = null
let noiseBuf: AudioBuffer | null = null

type Bus = { dry: GainNode; wet: GainNode }

export function unlockAudio(): boolean {
  try {
    if (!ctx) {
      const Ctor: typeof AudioContext =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctx = new Ctor()
      master = ctx.createGain()
      master.gain.value = 0.8
      master.connect(ctx.destination)

      const len = Math.floor(ctx.sampleRate * 2.5)
      const ir = ctx.createBuffer(2, len, ctx.sampleRate)
      for (let c = 0; c < 2; c++) {
        const d = ir.getChannelData(c)
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3)
      }
      verb = ctx.createConvolver()
      verb.buffer = ir
      const vg = ctx.createGain()
      vg.gain.value = 0.5
      verb.connect(vg)
      vg.connect(master)

      const nl = ctx.sampleRate * 3
      noiseBuf = ctx.createBuffer(1, nl, ctx.sampleRate)
      const nd = noiseBuf.getChannelData(0)
      for (let i = 0; i < nl; i++) nd[i] = Math.random() * 2 - 1
    }
    void ctx.resume()
    return true
  } catch {
    return false
  }
}

export function isAudioReady(): boolean {
  return ctx !== null && ctx.state === 'running'
}

function env(g: GainNode, t: number, a: number, d: number, v: number) {
  g.gain.setValueAtTime(0.0001, t)
  g.gain.linearRampToValueAtTime(v, t + a)
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + d)
}

function tone(c: AudioContext, bus: Bus, t: number, f0: number, f1: number, dur: number, type: OscillatorType, v: number, a = 0.005, wet = false) {
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(f0, t)
  o.frequency.exponentialRampToValueAtTime(f1, t + dur)
  env(g, t, a, dur, v)
  o.connect(g)
  g.connect(bus.dry)
  if (wet) g.connect(bus.wet)
  o.start(t)
  o.stop(t + dur + a + 0.1)
}

function noise(c: AudioContext, bus: Bus, t: number, dur: number, type: BiquadFilterType, f0: number, f1: number, v: number, wet = false) {
  if (!noiseBuf) return
  const s = c.createBufferSource()
  s.buffer = noiseBuf
  const f = c.createBiquadFilter()
  f.type = type
  f.frequency.setValueAtTime(f0, t)
  f.frequency.exponentialRampToValueAtTime(f1, t + dur)
  const g = c.createGain()
  env(g, t, dur * 0.5, dur * 0.5, v)
  s.connect(f)
  f.connect(g)
  g.connect(bus.dry)
  if (wet) g.connect(bus.wet)
  s.start(t, Math.random() * 0.5)
  s.stop(t + dur + 0.2)
}

/** Schedules the whole formation soundtrack (matches LogoFormation's timeline). Returns a stop function, or null if audio is locked. */
export function playFormationSound(rate = 1): (() => void) | null {
  if (!ctx || !master || !verb || ctx.state !== 'running') return null
  const c = ctx
  const dry = c.createGain()
  const wet = c.createGain()
  dry.connect(master)
  wet.connect(verb)
  const bus: Bus = { dry, wet }
  const t0 = c.currentTime + 0.08
  const s = (x: number) => t0 + x / rate
  const click = (x: number, f: number, v: number) => {
    tone(c, bus, s(x), f, f * 0.5, 0.05, 'square', v, 0.001)
    noise(c, bus, s(x), 0.04, 'highpass', 3000, 6000, v * 0.6)
  }
  const thunk = (x: number, v: number) => {
    tone(c, bus, s(x), 90, 38, 0.35, 'sine', v)
    noise(c, bus, s(x), 0.12, 'lowpass', 500, 80, v * 0.8)
  }

  tone(c, bus, s(0), 100, 100, 1.2, 'sawtooth', 0.02, 0.4) // quiet electrical buzz
  tone(c, bus, s(0), 40, 50, 1.6, 'sine', 0.2, 0.9) // sub swell
  noise(c, bus, s(0.1), 1.7, 'bandpass', 200, 900, 0.12) // head travel
  thunk(1.95, 0.5)
  noise(c, bus, s(2.1), 1.1, 'bandpass', 500, 2500, 0.09) // inner neck air
  click(3.45, 1800, 0.15)
  thunk(3.5, 0.3)
  tone(c, bus, s(3.5), 120, 700, 1.1, 'sawtooth', 0.03, 0.5) // rising electrical buzz
  tone(c, bus, s(4.5), 3200, 3200, 0.25, 'sine', 0.05) // eye glint
  noise(c, bus, s(4.6), 1.3, 'bandpass', 300, 1800, 0.1) // orange travel
  click(6.05, 1400, 0.18)
  thunk(6.05, 0.3)
  noise(c, bus, s(4.9), 1.3, 'bandpass', 300, 1800, 0.1) // yellow travel
  click(6.35, 1600, 0.18)
  thunk(6.35, 0.3)
  noise(c, bus, s(6.4), 0.6, 'bandpass', 600, 3000, 0.08) // triangle rise
  click(7.05, 2800, 0.2)
  thunk(7.05, 0.35)
  noise(c, bus, s(7.1), 1.4, 'bandpass', 800, 5000, 0.06) // wordmark sweep
  tone(c, bus, s(9.0), 70, 28, 1.8, 'sine', 0.9, 0.01, true) // final impact + reverb
  noise(c, bus, s(9.0), 0.5, 'lowpass', 2000, 60, 0.5, true)

  return () => {
    const now = c.currentTime
    for (const g of [dry, wet]) {
      g.gain.cancelScheduledValues(now)
      g.gain.setTargetAtTime(0, now, 0.05)
    }
  }
}
