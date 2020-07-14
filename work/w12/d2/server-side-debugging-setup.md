<img src="https://i.imgur.com/nEhLgzv.png">

# Server-side Debugging Setup for Node Apps

### Intro

Knowing how to use debugging tools is a mandatory skill of a developer.

[Chrome's DevTools](https://developers.google.com/web/tools/chrome-devtools) are invaluable for inspecting and debugging the DOM, JavaScript, CSS, Network activity, etc. of the loaded web page.

In addition, the ability to debug the code that runs on the server is equally as important when developing full-stack applications.

Prior to the availability of today's amazing debugging tools, a dev would have to do quite a bit of logging to check the values of variables.  However, logging is not as effective nor as efficient as true server-side debugging using VS Code's built-in debugger for Node (other languages are supported via installable extensions).

### Project Setup

Each project has to be setup for server-side debugging.

However, this only has to be done once and takes less than a minute!

Basically, the debugger simply needs to know how to start the Node server.

#### Setup for a Node/Express App Created Using Express Generator

##### Open the Debugger Pane

Pressing `shift-command-D` will open the debugging pane.  Doing so will result in this view if the app has yet to be setup for debugging:

<img src="https://i.imgur.com/LLv6TaK.png">

##### Create the `launch.json` Configuration File

We now need to click the **create a launch.json file** link to inform the debugger how to start up the server.  Doing so results in this small popup window:

<img src="https://i.imgur.com/4EyvxXa.png">

All that's left is to click on **Node.js**!

There will now be a `launch.json` file within a `.vscode` folder in the project with the following contents:

<img src="https://i.imgur.com/PRU4vng.png">

Note that it's the `"program": "${workspaceFolder}/bin/www"` line that informs VS Code how to start the server; and VS Code has automatically detected and configured debugging for this Express Generated app.

#### Setup for a Node App NOT Created Using Express Generator

If you created your own `server.js` Node/Express app, or any other Node app that you want to debug, VS Code will need to know which startup file/module to run using Node...

##### Create the `launch.json` Configuration File

We'll use react-mastermind to demo.

Click the **create a launch.json file** link which again results in this small popup window:

<img src="https://i.imgur.com/4EyvxXa.png">

Again, select **Node.js** in the popup.

A `launch.json` file within a `.vscode` folder is again created, however, it is specifying the file/module as `start` (which does not exist):

```js
"program": "${workspaceFolder}/start"
```

All we have to do, is specify the correct file/module, which with the architecture used in the Full-stack React lesson, is `server.js`.

Therefore, update `launch.json` as follows:

```js
"program": "${workspaceFolder}/server"
```

**That's all it takes to configure server-side debugging for a Node application!**

### Debugging

To debug your server-side JavaScript, it's best to refer to [VS Code's excellent debugging documentation](https://code.visualstudio.com/docs/editor/debugging).

> Note that since starting the debugger will start up the server code, it's very important to shut down the server if it's already running in terminal.

Once, you start server-side debugging, you'll be glad you did!

