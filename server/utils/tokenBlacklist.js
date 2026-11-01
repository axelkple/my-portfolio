// Maps token id (jti) -> expiry time (ms). Entries are removed once the token would have expired anyway.
const revoked = new Map();

export const revokeToken = (jti, expSeconds) => {
  revoked.set(jti, expSeconds * 1000);
};

export const isRevoked = (jti) => revoked.has(jti);

setInterval(() => {
  const now = Date.now();
  for (const [jti, expMs] of revoked) {
    if (expMs <= now) revoked.delete(jti);
  }
}, 10 * 60 * 1000).unref();