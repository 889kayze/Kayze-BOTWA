// Filter only noisy libsignal session diagnostics; keep ASTRO errors visible.
const noisySessionLog = /^(Closing session:|Decrypted message with closed session\.|Removing old closed session:)/;
for (const method of ['log', 'info', 'warn', 'error']) {
  const original = console[method].bind(console);
  console[method] = (...args) => {
    const first = args.length ? String(args[0] ?? '') : '';
    if (noisySessionLog.test(first.trim())) return;
    original(...args);
  };
}

require('dotenv').config();

const { startConnection } = require('./src/connection');
const { printBanner, log } = require('./src/utils/logger');
const { ensureConfig } = require('./src/config');

async function main() {
  printBanner();
  await ensureConfig();
  log('SYSTEM', 'Memuat ASTROBOT v4.5...');
  await startConnection();
}

main().catch((error) => {
  log('FATAL', error?.message || String(error), '31');
  process.exitCode = 1;
});
