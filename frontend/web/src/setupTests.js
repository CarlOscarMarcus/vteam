import "@testing-library/jest-dom"
import { beforeEach, vi } from 'vitest';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn((url) => {
    // Mocka laddstationer
    if (url.endsWith('/api/charging')) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          { id: 1, position_lat: 59.332, position_long: 18.064 },
          { id: 2, position_lat: 59.333, position_long: 18.065 },
        ],
      });
    }

    // Mocka parkeringsplatser
    if (url.endsWith('/api/parking')) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          { id: 1, position_lat: 59.333, position_long: 18.065, status: 0, scooter_id: null },
          { id: 2, position_lat: 59.334, position_long: 18.066, status: 1, scooter_id: 1 },
        ],
      });
    }

    // Mocka cyklar
    if (url.endsWith('/api/scooters')) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          { id: 1, status: 0 },
          { id: 2, status: 1 },
        ],
      });
    }

    // Mocka kunder
    if (url.endsWith('/api/users')) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          { id: 1, name: 'Test User', email: 'test@example.com' },
          { id: 2, name: 'Another User', email: 'user2@example.com' },
        ],
      });
    }

    return Promise.resolve({
      ok: true,
      json: async () => [],
    });
  }));
});
