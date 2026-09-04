// Progressive Image Frame Preloader for 3D Turntable Avatar

export interface FramePreloadResult {
  frames: HTMLImageElement[];
  totalFrames: number;
}

export interface FramePreloadOptions {
  totalFrames?: number;
  criticalThreshold?: number; // Minimum loaded frames before interactive reveal
  onProgress?: (progress: number, loadedCount: number, totalCount: number) => void;
  onCriticalReady?: () => void;
  onError?: (err: Error) => void;
}

const TOTAL_FRAMES = 240;
const CRITICAL_COUNT = 24; // Initial 10% frames loaded to start experience immediately
const CONCURRENCY_LIMIT = 8; // Concurrency limit for background image loading

export function getFrameUrl(index: number): string {
  // Frame numbering is 1-indexed (001 to 240)
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/assets/avatar-frames/ezgif-frame-${frameNumber}.jpg`;
}

class FramePreloader {
  private static instance: FramePreloader;
  private cachedImages: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
  private isLoading = false;
  private isCriticalReady = false;
  private loadedCount = 0;
  private subscribers: Set<(progress: number, loadedCount: number, totalCount: number) => void> = new Set();
  private criticalCallbacks: Set<() => void> = new Set();

  private constructor() {}

  public static getInstance(): FramePreloader {
    if (!FramePreloader.instance) {
      FramePreloader.instance = new FramePreloader();
    }
    return FramePreloader.instance;
  }

  public getLoadedFrames(): (HTMLImageElement | null)[] {
    return this.cachedImages;
  }

  public getLoadedRatio(): number {
    return this.loadedCount / TOTAL_FRAMES;
  }

  public isReady(): boolean {
    return this.isCriticalReady;
  }

  public async preload(options: FramePreloadOptions = {}): Promise<HTMLImageElement[]> {
    const {
      totalFrames = TOTAL_FRAMES,
      criticalThreshold = CRITICAL_COUNT,
      onProgress,
      onCriticalReady,
      onError,
    } = options;

    if (onProgress) this.subscribers.add(onProgress);
    if (onCriticalReady) {
      if (this.isCriticalReady) {
        onCriticalReady();
      } else {
        this.criticalCallbacks.add(onCriticalReady);
      }
    }

    if (this.isLoading) {
      // Already running, will notify subscribers
      return this.cachedImages.filter((img): img is HTMLImageElement => img !== null);
    }

    this.isLoading = true;

    try {
      // 1. Load First Frame with maximum priority
      await this.loadImage(0);

      // 2. Load evenly distributed critical keyframes first (e.g. frame 0, 10, 20, 30...)
      // plus first few consecutive frames so initial scroll or scrub is crisp
      const criticalIndices = new Set<number>();
      for (let i = 0; i < Math.min(criticalThreshold, totalFrames); i++) {
        criticalIndices.add(i);
      }
      const step = Math.max(1, Math.floor(totalFrames / criticalThreshold));
      for (let i = 0; i < totalFrames; i += step) {
        criticalIndices.add(i);
      }

      const criticalList = Array.from(criticalIndices);
      await this.loadBatch(criticalList);

      this.isCriticalReady = true;
      this.criticalCallbacks.forEach((cb) => cb());
      this.criticalCallbacks.clear();

      // 3. Progressively load all remaining frames in the background
      const remainingIndices: number[] = [];
      for (let i = 0; i < totalFrames; i++) {
        if (!this.cachedImages[i]) {
          remainingIndices.push(i);
        }
      }

      await this.loadBatch(remainingIndices);

      return this.cachedImages.filter((img): img is HTMLImageElement => img !== null);
    } catch (err) {
      if (onError && err instanceof Error) {
        onError(err);
      }
      // Return whatever we have so far
      return this.cachedImages.filter((img): img is HTMLImageElement => img !== null);
    }
  }

  private async loadBatch(indices: number[]): Promise<void> {
    const queue = [...indices];
    const workers: Promise<void>[] = [];

    for (let w = 0; w < CONCURRENCY_LIMIT; w++) {
      workers.push(
        (async () => {
          while (queue.length > 0) {
            const idx = queue.shift();
            if (idx !== undefined && !this.cachedImages[idx]) {
              try {
                await this.loadImage(idx);
              } catch {
                // If single frame fails, log & continue; canvas fallback will use nearest neighbor
              }
            }
          }
        })()
      );
    }

    await Promise.all(workers);
  }

  private loadImage(index: number): Promise<HTMLImageElement> {
    if (this.cachedImages[index]) {
      return Promise.resolve(this.cachedImages[index]!);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = getFrameUrl(index);
      img.decoding = 'async';

      img.onload = () => {
        this.cachedImages[index] = img;
        this.loadedCount++;
        const progress = this.loadedCount / TOTAL_FRAMES;
        this.subscribers.forEach((cb) => cb(progress, this.loadedCount, TOTAL_FRAMES));
        resolve(img);
      };

      img.onerror = (e) => {
        // Find nearest loaded frame as placeholder if available
        reject(e);
      };
    });
  }

  public getNearestFrame(index: number): HTMLImageElement | null {
    if (this.cachedImages[index]) return this.cachedImages[index];

    // Search outward for nearest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      if (prev >= 0 && this.cachedImages[prev]) return this.cachedImages[prev];
      const next = index + offset;
      if (next < TOTAL_FRAMES && this.cachedImages[next]) return this.cachedImages[next];
    }

    return null;
  }
}

export const framePreloader = FramePreloader.getInstance();
