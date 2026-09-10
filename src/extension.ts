import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

    // -------------------------------------------------
    // Open the AES JSON Workbench (WebView)
    // -------------------------------------------------
    const openCommand = vscode.commands.registerCommand(
        'aesjsontool.open',
        () => {

            // Get the current editor column.
            // If no editor is active, use Column One.
            const column = vscode.window.activeTextEditor?.viewColumn
                ?? vscode.ViewColumn.One;

            // Media folder containing:
            // index.html
            // crypto-js.min.js
            // css/js/images etc.
            const mediaRoot = vscode.Uri.file(
                path.join(context.extensionPath, 'media')
            );

            /**
             * Create a NEW WebviewPanel.
             *
             * IMPORTANT:
             * We intentionally do NOT keep this panel
             * in a global variable.
             *
             * Therefore, every command execution
             * creates a separate tab.
             */
            const panel = vscode.window.createWebviewPanel(
                'aesjsontool',
                'Workbench - AES JSON',
                column,
                {
                    enableScripts: true,

                    // Keep WebView state when switching tabs.
                    retainContextWhenHidden: true,

                    // Allow resources only from the media folder.
                    localResourceRoots: [
                        mediaRoot
                    ]
                }
            );

            panel.webview.html = getHtml(context, panel.webview);

            panel.onDidDispose(() => {}, null, context.subscriptions);
        }
    );

    // -------------------------------------------------
    // Beautify current document (JSON or XML)
    // -------------------------------------------------
    const beautifyJsonCommand = vscode.commands.registerCommand(
        'aesjsontool.beautifyJsonXml',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active editor found.');
                return;
            }

            const document = editor.document;
            const originalText = document.getText().trim();

            if (!originalText) {
                vscode.window.showErrorMessage('Document is empty.');
                return;
            }

            let beautified: string;
            let languageId: string;

            // 1. Try JSON first
            try {
                const parsed = JSON.parse(originalText);
                beautified = JSON.stringify(parsed, null, 2);
                languageId = 'json';
            }
            // 2. Fallback to XML
            catch {
                try {
                    beautified = formatXml(originalText);
                    languageId = 'xml';
                } catch (err: any) {
                    vscode.window.showErrorMessage(
                        `Content is neither valid JSON nor well-formed XML.\n${err?.message || ''}`
                    );
                    return;
                }
            }

            // Replace entire document content
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(document.getText().length)
            );

            await editor.edit(editBuilder => {
                editBuilder.replace(fullRange, beautified);
            });

            // Set correct language mode
            await vscode.languages.setTextDocumentLanguage(document, languageId);

            vscode.window.showInformationMessage(
                languageId === 'json'
                    ? 'JSON beautified successfully.'
                    : 'XML beautified successfully.'
            );
        }
    );

    context.subscriptions.push(openCommand, beautifyJsonCommand);
}

/**
 * Reliable pure-JS XML pretty printer (no dependencies)
 * Handles:
 *  - nested elements
 *  - self-closing tags
 *  - comments <!-- -->
 *  - processing instructions <?xml ... ?>
 *  - CDATA
 *  - attributes
 *  - mixed content reasonably well
 */
function formatXml(xml: string, indentSize: number = 2): string {
    const PADDING = ' '.repeat(indentSize);
    let formatted = '';
    let pad = 0;

    // Normalize line endings and put tags on separate lines
    xml = xml
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/(>)(\s*)(<)/g, '>$2\n<')   // ensure every tag starts on a new line
        .replace(/\n\s*\n/g, '\n');          // remove empty lines

    const lines = xml
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    for (const line of lines) {
        // Closing tag → decrease indent first
        if (line.startsWith('</')) {
            pad = Math.max(0, pad - 1);
            formatted += PADDING.repeat(pad) + line + '\n';
            continue;
        }

        // Self-closing, processing instruction, comment, or CDATA
        if (
            line.endsWith('/>') ||
            line.startsWith('<?') ||
            line.startsWith('<!--') ||
            line.startsWith('<![CDATA[')
        ) {
            formatted += PADDING.repeat(pad) + line + '\n';
            continue;
        }

        // Opening tag
        if (line.startsWith('<')) {
            formatted += PADDING.repeat(pad) + line + '\n';

            // Increase pad only for real opening elements
            // (not self-closing and not containing a closing tag on same line)
            if (!line.endsWith('/>') && !line.includes('</')) {
                pad++;
            }
            continue;
        }

        // Text content / mixed content
        formatted += PADDING.repeat(pad) + line + '\n';
    }

    return formatted.trimEnd() + '\n';
}

/**
 * Generates the HTML for the WebView.
 */
function getHtml(
    context: vscode.ExtensionContext,
    webview: vscode.Webview
): string {

    /**
     * Path to:
     *
     * media/index.html
     */
    const htmlPath = path.join(
        context.extensionPath,
        'media',
        'index.html'
    );

    // Read index.html.
    let html = fs.readFileSync(
        htmlPath,
        'utf8'
    );

    // Helper to create a webview-safe URI
    const getUri = (...pathSegments: string[]) => {
        return webview.asWebviewUri(
            vscode.Uri.file(
                path.join(context.extensionPath, 'media', ...pathSegments)
            )
        ).toString();
    };

    const cryptoJsUri          = getUri('js', 'crypto-js.min.js');
    const codemirrorCssUri     = getUri('css', 'codemirror.min.css');
    const materialDarkerCssUri = getUri('css', 'material-darker.min.css');
    const codemirrorJsUri      = getUri('js', 'codemirror.min.js');
    const xmlModeUri           = getUri('js', 'xml.min.js');
    const cssModeUri           = getUri('js', 'css.min.js');
    const jsModeUri            = getUri('js', 'javascript.min.js');
    const htmlmixedModeUri     = getUri('js', 'htmlmixed.min.js');
    const matchBracketsUri     = getUri('js', 'matchbrackets.min.js');
    const closeBracketsUri     = getUri('js', 'closebrackets.min.js');
    const activeLineUri        = getUri('js', 'active-line.min.js');

    const interRegular         = getUri('fonts', 'Inter-Regular.woff2');
    const interMedium          = getUri('fonts', 'Inter-Medium.woff2');
    const interSemiBold        = getUri('fonts', 'Inter-SemiBold.woff2');
    const interBold            = getUri('fonts', 'Inter-Bold.woff2');
    const interTightMedium     = getUri('fonts', 'InterTight-Medium.woff2');
    const interTightSemiBold   = getUri('fonts', 'InterTight-SemiBold.woff2');
    const interTightBold       = getUri('fonts', 'InterTight-Bold.woff2');
    const jetbrainsRegular     = getUri('fonts', 'JetBrainsMono-Regular.woff2');
    const jetbrainsMedium      = getUri('fonts', 'JetBrainsMono-Medium.woff2');

// Build @font-face CSS
    const fontsCss = `
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('${interRegular}') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('${interMedium}') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('${interSemiBold}') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('${interBold}') format('woff2');
}
@font-face {
  font-family: 'Inter Tight';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('${interTightMedium}') format('woff2');
}
@font-face {
  font-family: 'Inter Tight';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('${interTightSemiBold}') format('woff2');
}
@font-face {
  font-family: 'Inter Tight';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('${interTightBold}') format('woff2');
}
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('${jetbrainsRegular}') format('woff2');
}
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('${jetbrainsMedium}') format('woff2');
}
`;
    // Replace all placeholders
    html = html
        .replace(/{{FONTS_CSS}}/g,              fontsCss)
        .replace(/{{CRYPTO_JS_URI}}/g,          cryptoJsUri)
        .replace(/{{CODEMIRROR_CSS}}/g,         codemirrorCssUri)
        .replace(/{{MATERIAL_DARKER_CSS}}/g,    materialDarkerCssUri)
        .replace(/{{CODEMIRROR_JS}}/g,          codemirrorJsUri)
        .replace(/{{XML_MODE}}/g,               xmlModeUri)
        .replace(/{{CSS_MODE}}/g,               cssModeUri)
        .replace(/{{JS_MODE}}/g,                jsModeUri)
        .replace(/{{HTMLMIXED_MODE}}/g,         htmlmixedModeUri)
        .replace(/{{MATCH_BRACKETS}}/g,         matchBracketsUri)
        .replace(/{{CLOSE_BRACKETS}}/g,         closeBracketsUri)
        .replace(/{{ACTIVE_LINE}}/g,            activeLineUri)
        .replace(/{{CSP_SOURCE}}/g,             webview.cspSource);

    return html;
}


/**
 * Extension deactivation.
 */
export function deactivate() {
}