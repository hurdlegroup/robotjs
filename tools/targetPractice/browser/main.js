const { app, BrowserWindow, ipcMain: ipc, screen } = require('electron');

let mainWindow = null;

app.on('window-all-closed', () => {
  mainWindow = null;
  app.quit();
});

app.on('ready', () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  ipc.on('event', (event, message) => {
    if (process.send) {
      process.send({
        type: 'event',
        data: message,
      });
    }
  });

  ipc.on('ready', (event, elements) => {
    if (process.send) {
      const winPos = mainWindow.getPosition();
      for (const x in elements)
      {
        elements[x].x += winPos[0];
        elements[x].y += winPos[1];
      }

      process.send({
        type: 'ready',
        data: elements,
      });
    }
  });

  mainWindow = new BrowserWindow(
    {
      width: width,
      height: height,
      frame: false,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
