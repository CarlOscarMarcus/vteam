import { describe, it, expect, vi } from 'vitest';
import { signupBackend } from '../app/(auth)/signupBackend';

describe('signupBackend', () => {
  it('skapar konto vid lyckad signup', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
    });

    const result = await signupBackend(
      'Test User',
      'test@test.com',
      'password123'
    );

    expect(result).toBe(true);
    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/signup'),
      expect.objectContaining({
        method: 'POST',
      })
    );
  });

  it('kastar fel vid misslyckad signup', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'E-post finns redan' }),
    });

    await expect(
      signupBackend('Test', 'test@test.com', '123')
    ).rejects.toThrow('E-post finns redan');
  });
});
