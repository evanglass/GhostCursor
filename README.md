# Ghost Cursor

![Ghost Cursor Icon](images/icon.png)

## Description

Ghost Cursor is a Visual Studio Code extension that provides a "ghost cursor" feature, allowing you to drop and activate secondary cursors for enhanced editing capabilities.

## Features

- Drop a ghost cursor at any position in the editor. This cursor will not move as you navigate your file with your regular cursor. 
- Activate the ghost cursor(s) to automatically place cursors at each of the ghost cursor positions.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view (Ctrl+Shift+X).
3. Search for "Ghost Cursor" and install the extension.
4. Alternatively, download the .vsix file and install it manually.

## Usage

- By default the **Drop Ghost Cursor** action is assigned the keybind of **Ctrl+Alt+A**. Use this key combination to drop a ghost cursor at the current cursor position. Running the action on a position which already has a ghost cursor will remove that ghost cursor. 
- You can then activate all the placed ghost cursors at once by running the **Activate Ghost Cursors** action, which is assigned a default keybind of **Ctrl+Alt+D**.

## License

This project is licensed under the MIT License.
