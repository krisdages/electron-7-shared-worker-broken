// Modules to control application life and create native browser window
const {app, BrowserWindow, session, protocol } = require('electron')
const path = require('path')
const nodePath = path;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let secondWindow
let fileWindow

const APP_PROTOCOL = "app";
const APP_URL_BASE = `${APP_PROTOCOL}://a`;
const urlBaseLen = APP_URL_BASE.length;

protocol.registerSchemesAsPrivileged([
  { scheme: APP_PROTOCOL, privileges: { standard: true, secure: true, allowServiceWorkers: true } }
]);

function registerAppProtocol() {
  protocol.registerFileProtocol(APP_PROTOCOL,
      (request, callback) => {
        let qsi = request.url.indexOf("?");
        if (qsi < 0) {
          qsi = request.url.indexOf("#");
        }
        const url = qsi > 0 ? request.url.slice(urlBaseLen, qsi) : request.url.substr(urlBaseLen);
        const path = nodePath.normalize(`${__dirname}/${url}`);
        //console.log(url, path);
        callback(path);
      },
      (error) => {
       console.error(error);
      }
  );
}

if (app.isReady()) {
  registerAppProtocol();
}
else {
  app.on("ready", () => registerAppProtocol());
}

function createAppProtocolWindow (windowProp = "mainWindow") {
  // Create the browser window.
  const mainWindow = global[windowProp] = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      webviewTag: true,
      contextIsolation: false,
      nodeIntegrationInWorker: true,
}
  })

  mainWindow.loadURL('app://a/page-with-worker.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    global[windowProp] = null
  })
}

// function createFileWindow (windowProp = "secondWindow") {
//   // Create the browser window.
//   const mainWindow = global[windowProp] = new BrowserWindow({
//     width: 1000,
//     height: 800,
//     webPreferences: {
//       //preload: path.join(__dirname, 'preload.js'),
//       nodeIntegration: true,
//       webviewTag: true,
//       contextIsolation: false,
//       nodeIntegrationInWorker: true,
//     }
//   })
//
//   mainWindow.loadFile('page-with-worker.html');
//
//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()
//
//   // Emitted when the window is closed.
//   mainWindow.on('closed', function () {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     global[windowProp] = null
//   })
// }


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createAppProtocolWindow("mainWindow");
  createAppProtocolWindow("secondWindow");
  //createFileWindow("fileWindow");
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
