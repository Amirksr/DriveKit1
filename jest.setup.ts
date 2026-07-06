// Extends Jest's `expect` with DOM-specific matchers (toBeInTheDocument, etc.)
import "@testing-library/jest-dom";

/**
 * jsdom doesn't implement IntersectionObserver, but Framer Motion's
 * `whileInView` animations (used throughout the homepage components)
 * rely on it. A minimal no-op polyfill is enough for component tests,
 * which only care that rendering doesn't throw — not that the
 * intersection callback actually fires.
 */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
