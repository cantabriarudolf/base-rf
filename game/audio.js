/* QSO CERO — motor de audio (Web Audio). Sin dependencias. */
(function (root) {
  "use strict";

  function nowMs() {
    return typeof performance !== "undefined" ? performance.now() : Date.now();
  }

  class MorseAudio {
    constructor() {
      this.ctx = null;
      this.master = null;
      this.volume = 0.7;
      this.toneHz = 650;
      this.playOsc = null;
      this.playGain = null;
      this.noiseSource = null;
      this.noiseGain = null;
      this.keyOsc = null;
      this.keyGain = null;
      this.keyOnState = false;
      this.timers = [];
      this.playing = false;
      this.lastPlayEnd = 0;
    }

    ensure() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) throw new Error("Este navegador no soporta Web Audio.");
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.volume;
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === "suspended") this.ctx.resume();
      return this.ctx;
    }

    setVolume(v) {
      this.volume = Math.max(0, Math.min(1, Number(v) || 0));
      if (this.master && this.ctx) {
        this.master.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.01);
      }
    }

    setTone(hz) {
      this.toneHz = Math.max(300, Math.min(1000, Number(hz) || 650));
      if (this.keyOsc) this.keyOsc.frequency.value = this.toneHz;
    }

    ensureKeyOsc() {
      const ctx = this.ensure();
      if (!this.keyOsc) {
        this.keyOsc = ctx.createOscillator();
        this.keyOsc.type = "sine";
        this.keyOsc.frequency.value = this.toneHz;
        this.keyGain = ctx.createGain();
        this.keyGain.gain.value = 0;
        this.keyOsc.connect(this.keyGain).connect(this.master);
        this.keyOsc.start();
      }
      return ctx;
    }

    keyOn() {
      const ctx = this.ensureKeyOsc();
      if (this.keyOnState) return;
      this.keyOnState = true;
      const t = ctx.currentTime;
      this.keyGain.gain.cancelScheduledValues(t);
      this.keyGain.gain.setValueAtTime(this.keyGain.gain.value, t);
      this.keyGain.gain.linearRampToValueAtTime(1, t + 0.005);
    }

    keyOff() {
      if (!this.keyOsc || !this.keyOnState) return;
      this.keyOnState = false;
      const ctx = this.ctx;
      const t = ctx.currentTime;
      this.keyGain.gain.cancelScheduledValues(t);
      this.keyGain.gain.setValueAtTime(this.keyGain.gain.value, t);
      this.keyGain.gain.linearRampToValueAtTime(0, t + 0.005);
    }

    clearTimers() {
      for (let i = 0; i < this.timers.length; i++) clearTimeout(this.timers[i]);
      this.timers = [];
    }

    play(schedule, opts) {
      opts = opts || {};
      this.stop();
      const ctx = this.ensure();
      const t0 = ctx.currentTime + 0.08;
      const startMs = nowMs();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = this.toneHz;
      gain.gain.value = 0;
      osc.connect(gain).connect(this.master);

      const events = schedule.events || [];
      for (let i = 0; i < events.length; i++) {
        const e = events[i];
        const a = t0 + e.start / 1000;
        const b = a + e.duration / 1000;
        gain.gain.setValueAtTime(0, Math.max(t0, a - 0.003));
        gain.gain.linearRampToValueAtTime(1, a + 0.003);
        gain.gain.setValueAtTime(1, Math.max(a + 0.003, b - 0.003));
        gain.gain.linearRampToValueAtTime(0, b);

        if (opts.onEvent) {
          const onAt = 80 + e.start + (nowMs() - startMs);
          const offAt = onAt + e.duration;
          this.timers.push(
            setTimeout(function () {
              opts.onEvent(true, e);
            }, Math.max(0, onAt))
          );
          this.timers.push(
            setTimeout(function () {
              opts.onEvent(false, e);
            }, Math.max(0, offAt))
          );
        }
      }

      const totalMs = 80 + schedule.duration + 120;
      osc.start(t0);
      osc.stop(t0 + schedule.duration / 1000 + 0.2);
      this.playOsc = osc;
      this.playGain = gain;
      this.playing = true;
      this.lastPlayEnd = nowMs() + totalMs;

      if (opts.noise) this.startNoise(opts.noise);

      this.timers.push(
        setTimeout(
          function () {
            this.playing = false;
            this.stopNoise();
            if (opts.onEnd) opts.onEnd();
          }.bind(this),
          totalMs
        )
      );
    }

    startNoise(level) {
      if (this.noiseSource || !this.ctx) return;
      const ctx = this.ctx;
      const seconds = 2;
      const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 900;
      bp.Q.value = 0.6;
      const g = ctx.createGain();
      g.gain.value = Math.max(0, Math.min(0.5, Number(level) || 0.1));
      src.connect(bp).connect(g).connect(this.master);
      src.start();
      this.noiseSource = src;
      this.noiseGain = g;
    }

    stopNoise() {
      if (this.noiseSource) {
        try {
          this.noiseSource.stop();
        } catch (e) {
          /* ya detenido */
        }
        this.noiseSource.disconnect();
        this.noiseSource = null;
      }
      if (this.noiseGain) {
        this.noiseGain.disconnect();
        this.noiseGain = null;
      }
    }

    stop() {
      this.clearTimers();
      if (this.playOsc) {
        try {
          this.playOsc.stop();
        } catch (e) {
          /* ya detenido */
        }
        this.playOsc.disconnect();
        this.playOsc = null;
      }
      if (this.playGain) {
        this.playGain.disconnect();
        this.playGain = null;
      }
      this.stopNoise();
      this.playing = false;
      this.keyOff();
    }
  }

  root.MorseAudio = MorseAudio;
})(typeof globalThis !== "undefined" ? globalThis : this);
