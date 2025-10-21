// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let decorationType = vscode.window.createTextEditorDecorationType({
      before: {
          contentText: '',
          border: '1px solid red',
          margin: '0 -1.5px 0 0',
      }
  });

  function updateDecorations() {
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }
    
    let uri = editor.document.uri.toString();
    let key = `ghostPositions_${uri}`;
    let ghostPositions: { line: number; character: number }[] = context.workspaceState.get(key, []);

    let ranges = ghostPositions.map(p => {
      let line = editor.document.lineAt(p.line);
      let endChar = p.character < line.text.length ? p.character + 1 : p.character;
      return new vscode.Range(p.line, p.character, p.line, endChar);
    });

    editor.setDecorations(decorationType, ranges);
  }

  // Register command to drop ghost cursor
  const dropDisposable = vscode.commands.registerCommand(
    "ghost-cursor.dropGhost",
    () => {
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      let uri = editor.document.uri.toString();
      let key = `ghostPositions_${uri}`;
      let ghostPositions: { line: number; character: number }[] = context.workspaceState.get(key, []);
      let pos = editor.selection.active;

      let existingIndex = ghostPositions.findIndex(p => p.line === pos.line && p.character === pos.character);

      if (existingIndex !== -1) {
        ghostPositions.splice(existingIndex, 1);
      } else {
        ghostPositions.push({ line: pos.line, character: pos.character });
      }

      context.workspaceState.update(key, ghostPositions);

      updateDecorations();
    }
  );

  // Register command to activate ghost cursors
  const activateDisposable = vscode.commands.registerCommand(
    "ghost-cursor.activateGhosts",
    () => {
      let editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      let uri = editor.document.uri.toString();
      let key = `ghostPositions_${uri}`;
      let ghostPositions: { line: number; character: number }[] = context.workspaceState.get(key, []);

      let selections = ghostPositions.map(
        (p) => new vscode.Selection(p.line, p.character, p.line, p.character)
      );

      editor.selections = selections;

      context.workspaceState.update(key, []);

      updateDecorations();
    }
  );

  context.subscriptions.push(dropDisposable, activateDisposable);

  // Update decorations on editor change
  vscode.window.onDidChangeActiveTextEditor(
    updateDecorations,
    null,
    context.subscriptions
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
