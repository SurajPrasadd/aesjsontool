import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let currentPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {

    const openCommand = vscode.commands.registerCommand(
        'aesjsontool.open',
        () => {

            const column = vscode.window.activeTextEditor
                ? vscode.window.activeTextEditor.viewColumn
                : undefined;

            // If panel already exists, show it
            if (currentPanel) {
                currentPanel.reveal(column);
                return;
            }

            const mediaRoot = vscode.Uri.file(
                path.join(context.extensionPath, 'media')
            );

            currentPanel = vscode.window.createWebviewPanel(
                'aesjsontool',
                'AesJsonTool — AES Workbench',
                column || vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                    localResourceRoots: [mediaRoot]
                }
            );

            currentPanel.webview.html = getHtml(
                context,
                currentPanel.webview
            );

            // Cleanup when panel is closed
            currentPanel.onDidDispose(
                () => {
                    currentPanel = undefined;
                },
                null,
                context.subscriptions
            );
        }
    );

    context.subscriptions.push(openCommand);
}


function getHtml(
    context: vscode.ExtensionContext,
    webview: vscode.Webview
): string {

    const htmlPath = path.join(
        context.extensionPath,
        'media',
        'index.html'
    );

    let html = fs.readFileSync(
        htmlPath,
        'utf8'
    );

    const cryptoJsUri = webview.asWebviewUri(
        vscode.Uri.file(
            path.join(
                context.extensionPath,
                'media',
                'crypto-js.min.js'
            )
        )
    );

    html = html
        .replace(
            /{{CRYPTO_JS_URI}}/g,
            cryptoJsUri.toString()
        )
        .replace(
            /{{CSP_SOURCE}}/g,
            webview.cspSource
        );

    return html;
}


export function deactivate() {
}