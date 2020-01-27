const {app, BrowserWindow, Menu} = require('electron')


function createWindow () {   
    // Create the browser window.
  let win = new BrowserWindow({width: 800, height: 600})
        
  // and load the index.html of the app.     
  win.loadURL("http://localhost:3000/");


  let menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {
          label:'Dashboard',
          click() {
            alert("Dashboard clicked");
          }
        },
        {label:'Do something'},
        {
          label:'Exit',
          click() {
            app.quit()
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);

}      
app.on('ready', createWindow);


