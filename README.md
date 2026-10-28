# ASTROBOT v4.5 by BENJOOL

Bot WhatsApp berbasis Baileys untuk Termux/Android. Perubahan v4.5 mempertahankan fitur AI dan koneksi yang sudah ada, serta menambahkan downloader TikTok/YouTube/Instagram dan ekstraksi MP3.

## Fitur
- Gemini AI chat dengan konteks percakapan sementara.
- Vision AI untuk foto/screenshot.
- Audio AI untuk voice note/audio.
- Coding Assistant melalui `/coding`.
- Web Search melalui `/search`.
- Smart Memory opt-in: `/memory on`, `/memory off`, `/forget`.
- Downloader video: `.donlot`, `.donlot URL`.
- Konversi audio: `.mp3 URL`.
- Hasil video/audio dikirim sebagai **dokumen WhatsApp**.
- Reconnect bertahap, QR login, dan log internal Baileys disenyapkan.

## Instalasi Termux (Android)
1. Instal Termux dari sumber tepercaya dan buka Termux.
2. Instal paket yang diperlukan:
   ```bash
   pkg update && pkg upgrade
   pkg install nodejs-lts python ffmpeg unzip
   python -m pip install -U yt-dlp
   ```
3. Ekstrak ZIP ke folder pilihan. Contoh jika ZIP berada di Download:
   ```bash
   termux-setup-storage
   cd ~/storage/downloads
   unzip ASTROBOT_ULTIMATE_v4.5.zip
   cd ASTROBOT_ULTIMATE
   ```
   Nama folder bisa berbeda sesuai lokasi ekstraksi.
4. Pasang dependency Node.js:
   ```bash
   npm install
   ```
5. Salin `.env.example` menjadi `.env` jika ingin mengatur konfigurasi sendiri. Isi `GEMINI_API_KEY` dengan API key milik sendiri; jangan bagikan file `.env`.
   ```bash
   cp .env.example .env
   nano .env
   ```
   Bot juga dapat meminta Gemini API key saat pertama dijalankan.
6. Jalankan:
   ```bash
   npm start
   ```
7. Scan QR dari WhatsApp > Perangkat tertaut > Tautkan perangkat. Sesi lokal yang sudah ada tidak disertakan dalam ZIP; untuk mempertahankan login lama, salin folder `session` milikmu sendiri ke folder proyek baru secara lokal.

## Perintah WhatsApp
- `/menu` daftar perintah lama
- `/about` informasi bot
- `/ai pertanyaan`
- `/search topik`
- `/coding pertanyaan`
- `/vision` bersama gambar
- `/audio` bersama voice note/audio
- `/memory on` / `/memory off` / `/forget`
- `/reset`
- `.donlot` menampilkan menu downloader
- `.donlot https://link-video` mengunduh video dari TikTok, YouTube, atau Instagram
- `.donlot tiktok` / `.donlot youtube` / `.donlot instagram` memilih platform; kirim URL pada pesan berikutnya
- `.mp3 https://link-video` mengekstrak audio MP3

Gunakan hanya konten yang kamu miliki atau yang pengunduhannya diizinkan oleh pemilik konten dan ketentuan platform. Downloader tidak meminta password/cookie akun dan tidak dapat mengakses konten privat atau yang membutuhkan login. Dukungan platform dapat berubah.

## Konfigurasi downloader
```env
DOWNLOAD_MAX_MB=50
DOWNLOAD_TIMEOUT_SECONDS=480
```
`DOWNLOAD_MAX_MB` membatasi ukuran hasil yang dikirim dan menjadi batas yang diminta ke yt-dlp. Nilai yang terlalu besar dapat membebani RAM, penyimpanan, dan kuota Android. Downloader hanya menjalankan satu pekerjaan pada satu waktu. File kerja dibuat di `tmp/downloader/` dan dibersihkan setelah proses sukses maupun gagal.

## Pemeriksaan
```bash
npm run check
```
Ini memeriksa sintaks JavaScript, bukan menguji login WhatsApp, akses jaringan, download aktual, atau API Gemini. Pastikan `node`, `yt-dlp`, dan `ffmpeg` tersedia:
```bash
node -v
yt-dlp --version
ffmpeg -version
```

## Keamanan dan catatan
- ZIP tidak menyertakan `.env`, `node_modules`, atau folder `session` pribadi.
- Jangan menghapus folder `session` lama jika ingin mempertahankan perangkat tertaut.
- Tidak ada password media sosial yang diminta atau disimpan.
- File sementara hanya dihapus di direktori pekerjaan downloader, bukan file pengguna di lokasi lain.
- Pengiriman dokumen dan batas ukuran aktual mengikuti versi Baileys/WhatsApp yang digunakan; file besar bisa gagal dikirim. Default batas hasil 50 MB dapat diturunkan melalui `.env`.
- Proyek memakai library WhatsApp Web pihak ketiga, bukan WhatsApp Business Platform resmi. Kompatibilitas dan kebijakan layanan dapat berubah.
