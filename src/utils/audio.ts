/**
 * Multi-track Wedding Audio Player Engine
 * Queued playlist with automatic looping:
 * 1. Seetha Kalyana Vaibhogame (Agam)
 * 2. Sada Nannu (Mahanati)
 */

export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  src: string;
}

export const WEDDING_PLAYLIST: TrackInfo[] = [
  {
    id: 'seetha_kalyanam',
    title: 'Seetha Kalyana Vaibhogame',
    artist: 'Agam • Walk of the Bride',
    src: '/assets/music/seetha_kalyanam.mp3',
  },
  {
    id: 'sada_nannu',
    title: 'Sada Nannu',
    artist: 'Mahanati • Slow Reverbed',
    src: '/assets/music/sada_nannu.mp3',
  },
];

type AudioListener = () => void;

class WeddingAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentTrackIndex: number = 0;
  private isPlaying: boolean = false;
  private volume: number = 0.75;
  private isMuted: boolean = false;
  private listeners: Set<AudioListener> = new Set();
  private ctx: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'metadata';
      this.audio.volume = this.volume;
      this.loadTrack(0);

      this.audio.addEventListener('ended', () => {
        this.nextTrack();
      });

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notifyListeners();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });
    }
  }

  private loadTrack(index: number) {
    if (!this.audio) return;
    this.currentTrackIndex = (index + WEDDING_PLAYLIST.length) % WEDDING_PLAYLIST.length;
    const track = WEDDING_PLAYLIST[this.currentTrackIndex];
    this.audio.src = track.src;
    this.notifyListeners();
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  public play() {
    if (!this.audio) return;
    this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.notifyListeners();
      })
      .catch((err) => {
        console.log('Audio playback pending user gesture:', err);
      });
  }

  public pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.notifyListeners();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public nextTrack() {
    const nextIdx = (this.currentTrackIndex + 1) % WEDDING_PLAYLIST.length;
    this.loadTrack(nextIdx);
    if (this.isPlaying) {
      this.play();
    }
  }

  public prevTrack() {
    const prevIdx = (this.currentTrackIndex - 1 + WEDDING_PLAYLIST.length) % WEDDING_PLAYLIST.length;
    this.loadTrack(prevIdx);
    if (this.isPlaying) {
      this.play();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audio) {
      this.audio.volume = this.isMuted ? 0 : this.volume;
    }
    this.notifyListeners();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.volume = this.isMuted ? 0 : this.volume;
    }
    this.notifyListeners();
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentTrack(): TrackInfo {
    return WEDDING_PLAYLIST[this.currentTrackIndex];
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Micro-interactions chime
  public playChime(type: 'reveal' | 'success' = 'reveal') {
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const notes = type === 'reveal' ? [587.33, 739.99, 880.0, 1174.66] : [440.0, 554.37, 659.25, 880.0];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.3);
      });
    } catch {
      // Ignore audio context errors gracefully
    }
  }
}

export const ambientSound = new WeddingAudioPlayer();
