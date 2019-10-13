# Electron 7.0.0-beta.6 Broken Shared Worker

Used devmonkey22/electron-renderer-leak as a base.

The main process registers a protocol `app://` so that the SharedWorker 
will actually be shared.

## SharedWorker does not execute
 
Two windows should open and each post a message to the SharedWorker.
One window should say "Result: 0" and the other should say "Result: 1"
 
Click the button in each window to post a message. 

If it's working (as it is in Electron 6), 
 a message should appear that says "Result: N", where
 N is the number of times a message has been posted.
 
If it's not working,
 the message will say "No clicks yet."
  
----
## Crash with data URL and `nodeIntegrationInWorker: true`

There is a second button that says "Create Worker with Data URL",
which creates a SharedWorker with a data URL.
 
Clicking this button in Electron 6 creates a functional worker.<br/>
Clicking this button in Electron 7 crashes the renderer.

If you edit `main.js` to disable `nodeIntegrationInWorker`, the SharedWorker object is created,
but the worker is still non-functional.
 
---

Tested with:
- Ubuntu 18.04.2, Windows 10
- Electron 7.0.0-beta.6 (broken)
- Electron 6.0.12 (working)
- nodejs v10.16.0

