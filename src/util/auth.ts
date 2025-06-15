import crypto from 'crypto';
import express from 'express';

// ─── Simple password-hash helper ───────────────────────────────────────────────
export const hash = (value: string) =>
  crypto.createHash('sha256').update(value).digest('hex');

export const EXPECTED_HASH = hash(process.env.AUTH_PASSWORD ?? 'changeme');


// ─── Authentication middleware ────────────────────────────────────────────────
export function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const cookieHash = req.cookies?.auth;
  if (cookieHash && cookieHash === EXPECTED_HASH) return next();

  res.status(401).json({ error: 'Unauthorized' });
}
