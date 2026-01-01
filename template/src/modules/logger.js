/**
 * Logger utility for development and production environments
 * Automatically disables logs in production for better performance
 */

const isDev = typeof process !== "undefined" && process.env?.NODE_ENV === "development" || 
              (typeof window !== "undefined" && window.location.hostname === "localhost" || 
               window.location.hostname === "127.0.0.1" || 
               window.location.hostname.includes("localhost"));

export const logger = {
  /**
   * Log information (only in development)
   * @param {...any} args - Arguments to log
   */
  log: (...args) => {
    if (isDev) {
      console.log(...args);
    }
  },

  /**
   * Log errors (always logged, even in production)
   * @param {...any} args - Arguments to log
   */
  error: (...args) => {
    console.error(...args);
  },

  /**
   * Log warnings (only in development)
   * @param {...any} args - Arguments to log
   */
  warn: (...args) => {
    if (isDev) {
      console.warn(...args);
    }
  },

  /**
   * Log debug information (only in development)
   * @param {...any} args - Arguments to log
   */
  debug: (...args) => {
    if (isDev) {
      console.debug(...args);
    }
  },

  /**
   * Log performance metrics (only in development)
   * @param {string} label - Performance label
   * @param {number} duration - Duration in milliseconds
   */
  perf: (label, duration) => {
    if (isDev) {
      console.log(`[PERF] ${label}: ${duration.toFixed(2)}ms`);
    }
  },

  /**
   * Group logs (only in development)
   * @param {string} label - Group label
   * @param {Function} callback - Callback function to execute within group
   */
  group: (label, callback) => {
    if (isDev) {
      console.group(label);
      try {
        callback();
      } finally {
        console.groupEnd();
      }
    } else {
      callback();
    }
  }
};

export default logger;

