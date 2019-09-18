# Electron Renderer Process Leak Demonstration

Used electron-quick-start as a base to show how with a SharedWorker and preload file (that uses `remote` module) causes Chromium renderer process to leak (doesn't exit with other electron processes) on Windows 10.

Tested with:
- Windows 10
- Electron 6.0.4, 6.0.7
- nodejs v10.16.3

