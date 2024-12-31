export const CONFIG = {
  DESCRIPTION: {
    MAX_LENGTH: 240,
    PLACEHOLDER: "Type your video description..."
  },
  RATE_LIMIT: {
    MAX_REQUESTS: 5,
    WINDOW: 60 * 1000,
    CLEANUP_INTERVAL: 5 * 60 * 1000
  }
} as const; 