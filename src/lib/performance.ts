/**
 * Performance Optimization Utilities
 * Lazy loading, viewport detection, and performance monitoring
 */

import { useEffect, useState, useRef } from 'react';

/**
 * Hook to detect if an element is in the viewport
 * Useful for lazy loading heavy 3D components
 */
export function useInViewport(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    const currentRef = ref.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasBeenInView, options]);

  return { ref, isInView, hasBeenInView };
}

/**
 * Hook to detect device capabilities
 * Returns true if device is likely to handle heavy 3D graphics well
 */
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isHighPerformance: true,
    isMobile: false,
    hasWebGL: true,
    preferLowMotion: false,
  });

  useEffect(() => {
    // Check if mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const hasWebGL = !!(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    );

    // Check for low-end devices (basic heuristic)
    const isHighPerformance = navigator.hardwareConcurrency 
      ? navigator.hardwareConcurrency >= 4 
      : true;

    // Check reduced motion preference
    const preferLowMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setCapabilities({
      isHighPerformance: isHighPerformance && !isMobile,
      isMobile,
      hasWebGL,
      preferLowMotion,
    });
  }, []);

  return capabilities;
}

/**
 * Preload critical images for better performance
 */
export function preloadImages(imageUrls: string[]): Promise<void[]> {
  const promises = imageUrls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = reject;
    });
  });

  return Promise.all(promises);
}

/**
 * Debounce function for performance-sensitive events
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll and resize events
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if browser supports a feature
 */
export function supportsFeature(feature: string): boolean {
  switch (feature) {
    case 'webgl': {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    }
    
    case 'webgl2': {
      const canvas2 = document.createElement('canvas');
      return !!canvas2.getContext('webgl2');
    }
    
    case 'intersection-observer':
      return 'IntersectionObserver' in window;
    
    case 'resize-observer':
      return 'ResizeObserver' in window;
    
    default:
      return false;
  }
}

/**
 * Get optimized render quality based on device capabilities
 */
export function getRenderQuality(): 'high' | 'medium' | 'low' {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as { deviceMemory?: number }).deviceMemory || 4;

  if (isMobile || cores < 4 || memory < 4) {
    return 'low';
  }
  
  if (cores < 8 || memory < 8) {
    return 'medium';
  }

  return 'high';
}

/**
 * Monitor performance and log if frame rate drops
 */
export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private readonly callback?: (fps: number) => void;

  constructor(callback?: (fps: number) => void) {
    this.callback = callback;
  }

  start() {
    const measure = () => {
      this.frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - this.lastTime;

      if (elapsed >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / elapsed);
        this.frameCount = 0;
        this.lastTime = currentTime;

        if (this.callback) {
          this.callback(this.fps);
        }

        if (this.fps < 30) {
          console.warn(`Low FPS detected: ${this.fps}`);
        }
      }

      requestAnimationFrame(measure);
    };

    requestAnimationFrame(measure);
  }

  getFPS(): number {
    return this.fps;
  }
}
