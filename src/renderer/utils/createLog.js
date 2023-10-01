export const createLog = (arg) => {
    window.electron.ipcRenderer.sendMessage('create-log', arg)
}