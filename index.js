let win
let win1

const fs = require('fs')
const express = require('express')
const web = express()
const http = require('http');
const server = http.createServer(web)
const {
    Server
} = require("socket.io")
const io = new Server(server);
const {
    app,
    BrowserWindow
} = require('electron')

web.use('/static', express.static('static'))


web.get('/ass', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})

web.get('/disclogin', (req, res) => {
    win1 = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        autoHideMenuBar: true
    })
    win1.loadURL('https://discord.com/api/oauth2/authorize?client_id=931619653275508837&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code&scope=identify%20email')
})



io.on('connection', (socket) => {
    console.log('a user connected');
});
server.listen(3000, () => {
    console.log('listening on *:3000');
});
app.whenReady().then(() => {
    if (!fs.existsSync(__dirname + '/config.json')) {
        // ASSistant de configuration

        const win = new BrowserWindow({
            width: 600,
            height: 800,
            frame: false,
            resizable: false
        })

        win.loadURL('http://localhost:3000/ass')
        win.webContents.on('new-window', function (e, url) {
            e.preventDefault();
            require('electron').shell.openExternal(url);
        });

    }
})


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 650
    })

    win.loadFile('index.html')
}