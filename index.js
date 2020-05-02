const electron = require("electron");
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    dialog
} = electron;
const url = require("url");

let mainWindow;
let newProjectWindow;

app.on("ready", function () {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        minWidth: 1000,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: require("path").join(__dirname, "views", "homeWindow.html"),
        protocol: "file",
        slashes: true
    }));

    mainWindow.setMenuBarVisibility(null);
});

ipcMain.on("home:newProject", function () {
    newProject();
});

ipcMain.on("newProject:createProject", function () {
    projectWindowOpen();
});

function newProject() {
    newProjectWindow = new BrowserWindow({
        width: 500,
        height: 500,
        minWidth: 500,
        minHeight: 500,
        maxHeight: 500,
        maxWidth: 500,
        webPreferences: {
            nodeIntegration: true
        }
    });

    newProjectWindow.loadURL(url.format({
        pathname: require("path").join(__dirname, "views", "newProject.html"),
        protocol: "file",
        slashes: true
    }));

    newProjectWindow.setMenuBarVisibility(null);
}


function projectWindowOpen() {
    mainWindow.loadURL(url.format({
        pathname: require("path").join(__dirname, "views", "projectWindow.html"),
        protocol: "file",
        slashes: true
    }));

    newProjectWindow.close()
}