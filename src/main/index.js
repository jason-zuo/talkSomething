'use strict'
const electron = require('electron');
// import {app, BrowserWindow, shell, ipcMain, ipcRenderer} from 'electron';
const {app, BrowserWindow, shell, ipcMain, ipcRenderer} = require('electron');
const globalShortcut = electron.globalShortcut;
const {autoUpdater,CancellationToken } = require('electron-updater');
const feedUrl = "https://jasonzuo.cn";  //暂时没有接入
const log = require('electron-log');

let cancellationTokenKey ;

let mainParams = {
    width: 1000,
    height: 620,
    show: true,
    frame: false,
    // icon: './client/static/logos/main.png',
    transparent: false, // make the top-toolBar transparent
    resizable: false,
    webPreferences: {
        allowRunningInsecureContent: true,
        webSecurity: false
    }
    // resizable: false, // control the resize of the window
}

let mainWindow
let isFull = false // 判断是否全屏
let isOnClass = false // 判断是否上课用于触发resize的重绘
var cancelToken ;

let sendUpdateMessage = (message, data) => {
    mainWindow.send('message', {message, data})
}

const winURL = "http://localhost:8888"

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow(mainParams)

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

autoUpdater.setFeedURL(feedUrl);
autoUpdater.autoDownload = false;

autoUpdater.on('error', function (message) {
    sendUpdateMessage('error', message);
    log.info('error', message);
});
autoUpdater.on('checking-for-update', function (message) {
    sendUpdateMessage('checking-for-update', message);
    log.info('checking-for-update', message);
});
autoUpdater.on('update-available', function (message) {
    sendUpdateMessage('update-available', message);
    log.info('update-available', message);
});
autoUpdater.on('update-not-available', function (message) {
    sendUpdateMessage('update-not-available', message);
    log.info('update-not-available', message);
});
autoUpdater.on('update-not-available', function (info) {
    sendUpdateMessage('已经是最新版本' + info.version);
});
// 更新下载进度事件
autoUpdater.on('download-progress', function (progressObj) {
    sendUpdateMessage('downloadProgress', progressObj);
})
autoUpdater.on('update-not-available', function (info) {
    sendUpdateMessage('已经是最新版本' + info.version);
});
autoUpdater.on('cancel-download', function (info) {
    sendUpdateMessage('取消更新' + info);
});
autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    sendUpdateMessage('update-downloaded',updateUrl);
    ipcMain.on('updateNow', (e, arg) => {
        //some code here to handle event
        autoUpdater.quitAndInstall();
    })
});
ipcMain.on("isDownload", () => {
    cancellationTokenKey = null;
    cancellationTokenKey = new CancellationToken();
    autoUpdater.downloadUpdate(cancellationTokenKey)
})

ipcMain.on('updateNow', () => {
    //some code here to handle event
    autoUpdater.quitAndInstall();
})

ipcMain.on("cancelDownload", () => {
    log.info('取消下载');
    cancellationTokenKey.cancel()
});

let checkForUpdates = () => {
    //执行自动更新检查
    autoUpdater.checkForUpdates().then(() => {
        // cancelToken = downloadPromise.cancellationToken
    });
};

/*
* 老版本electron实现单例方法
* */
// const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
//     // Someone tried to run a second instance, we should focus our window.
//     if (mainWindow) {
//         if (mainWindow.isMinimized()) mainWindow.restore()
//         mainWindow.focus()
//     }
// })
//
// if (shouldQuit) {
//     app.quit()
// }

app.on('ready', () => {
    createWindow();
    setTimeout(checkForUpdates, 3000);
    ipcMain.on('maximize', (event) => {
        if (isFull) {
            mainWindow.unmaximize()
            mainWindow.center()
            isFull = false
        } else {
            mainWindow.maximize()
            isFull = true
        }

        // 如果在上课，触发重绘命令
        if (isOnClass) {
            event.sender.send('redraw')
        }
    })

    ipcMain.on('minimize', () => {
        mainWindow.minimize()
    })

    // 监听退出事件
    ipcMain.on('quitApp', () => {
        app.quit()
    })
    // 监听esc键
    ipcMain.on('esc', (event) => {
        mainWindow.setFullScreen(false)
        // 如果在上课，触发重绘命令
        if (isOnClass) {
            event.sender.send('redraw')
        }
    })
    // 全屏
    ipcMain.on('fullScreen', () => {
        mainWindow.setFullScreen(true)
    })

    // 登陆小屏幕
    ipcMain.on('login', () => {
        mainWindow.setSize(300, 530)
        mainWindow.center()
    })

    ipcMain.on('mainContent', () => {
        mainWindow.setSize(1000, 620)
        mainWindow.center()
    })
    // 缩小屏幕
    ipcMain.on('shrinkScreen', () => {
        if (!isFull) {
            mainWindow.setFullScreen(false)
        }
    })

    // 跳转网页
    ipcMain.on('tobroser', () => {
        shell.openExternal('http://www.xuexibao.cn/')
    })

    // 上课状态
    ipcMain.on('onClass', (e, arg) => {
        isOnClass = arg
    })

    // 监听更新状态
    ipcMain.on('upDate', (e, arg) => {
        checkForUpdates()
    })

    globalShortcut.register('Control+Alt+K', function(){
        mainWindow.webContents.openDevTools();
    })

    process.on('uncaughtException', (error) => {
        console.error(error)
    })
    mainWindow.on('maximize', () => {
        console.log('最大化了啊')
    })
    mainWindow.on('unmaximize', () => {
        console.log('最大化了啊')
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
