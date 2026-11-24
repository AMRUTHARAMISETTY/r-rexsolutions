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

  tone(c, bus, s(0), 40, 65, 0.6, 'sine', 0.22, 0.08)
  tone(c, bus, s(0.1), 100, 600, 0.5, 'sawtooth', 0.025, 0.08)
  for (const [start, end, pitch] of [[0.6, 1.6, 900], [1.3, 2.3, 1200], [3, 4, 1400], [3.5, 4.5, 1800], [4.3, 4.9, 2400]]) {
    noise(c, bus, s(start), (end - start) / rate, 'bandpass', 200, pitch, 0.1)
    click(end, pitch, 0.12)
    thunk(end, 0.3)
  }
  tone(c, bus, s(2.7), 700, 3200, 0.15, 'sine', 0.05)
  noise(c, bus, s(5.4), 0.9 / rate, 'bandpass', 800, 5000, 0.06)
  tone(c, bus, s(4.9), 70, 28, 1.0, 'sine', 0.55, 0.01, true)
  noise(c, bus, s(4.9), 0.35, 'lowpass', 2000, 60, 0.25, true)

  return () => {
    const now = c.currentTime
    for (const g of [dry, wet]) {
      g.gain.cancelScheduledValues(now)
      g.gain.setTargetAtTime(0, now, 0.05)
    }
  }
}

/** Mute the live bus without restarting the visual timeline. */
export function setFormationMuted(muted: boolean) {
  if (ctx && master) master.gain.setTargetAtTime(muted ? 0 : 0.8, ctx.currentTime, 0.025)
}
