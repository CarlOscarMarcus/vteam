import { describe, it, expect, vi } from 'vitest';
import { loginData } from '../app/(auth)/auth';

describe('loginData', () => {
  it('returnerar token vid lyckad login', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: 'abc123' }),
    });

    const token = await loginData('test@test.com', 'password');
    expect(token).toBe('abc123');
  });

  it('kastar fel vid misslyckad login', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Fel inloggning' }),
    });

    await expect(
      loginData('fel@test.com', '123')
    ).rejects.toThrow('Fel inloggning');
  });
});
