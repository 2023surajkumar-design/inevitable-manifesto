// Accessibility utilities and hooks

import { useEffect } from 'react';

/**
 * Hook to respect user's motion preferences
 * Disables animations if user prefers reduced motion
 */
export const useReducedMotion = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion;
};

/**
 * Hook to add skip-to-content functionality
 */
export const useSkipToContent = () => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt + S to skip to main content
      if (e.altKey && e.key === 's') {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
};

/**
 * Hook to add keyboard navigation for sections
 */
export const useSectionNavigation = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const sectionIds = Array.from(sections).map(section => section.id);
    let currentIndex = 0;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt + Arrow Down to next section
      if (e.altKey && e.key === 'ArrowDown') {
        e.preventDefault();
        currentIndex = Math.min(currentIndex + 1, sectionIds.length - 1);
        document.getElementById(sectionIds[currentIndex])?.scrollIntoView({ behavior: 'smooth' });
      }
      // Alt + Arrow Up to previous section
      else if (e.altKey && e.key === 'ArrowUp') {
        e.preventDefault();
        currentIndex = Math.max(currentIndex - 1, 0);
        document.getElementById(sectionIds[currentIndex])?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
};

/**
 * Announce content changes to screen readers
 */
export const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Add ARIA labels for better accessibility
 */
export const addARIALabels = () => {
  // Add aria-label to navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const targetId = href.substring(1);
      link.setAttribute('aria-label', `Navigate to ${targetId} section`);
    }
  });
};
