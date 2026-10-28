#!/data/data/com.termux/files/usr/bin/bash
set -e
echo "=== ASTROBOT v4.5 INSTALLER ==="
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js belum terpasang. Jalankan: pkg update && pkg install nodejs-lts"
  exit 1
fi
node -v
pkg install -y ffmpeg python
python -m pip install -U yt-dlp
npm install
echo
echo "Instalasi selesai."
echo "Jalankan bot dengan: node index.js"
