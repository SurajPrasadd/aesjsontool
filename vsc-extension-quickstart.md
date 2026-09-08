# AES JSON Tool

AES Encryption/Decryption and JSON/XML Formatter for Visual Studio Code.

## 🛠️ Project Setup

### 1. Create the Project

```bash
mkdir aesjson
cd aesjson
npm init -y
```

### 2. Install VS Code Extension Generator

```bash
npm install -g yo generator-code
```

### 3. Generate the Extension

Run:

```bash
yo code
```

Select:

```text
New Extension (TypeScript)
```

Example configuration:

```text
Name: AES JSON Tool
Identifier: aesjsontool
Description: AES Encryption/Decryption and JSON/XML Formatter
Package Manager: npm
```

### 4. Install Dependencies

```bash
npm install
```

Install VSCE for generating the `.vsix` package:

```bash
npm install --save-dev @vscode/vsce
```

Or install it globally:

```bash
npm install -g @vscode/vsce
```

Verify:

```bash
vsce --version
```

### 5. Compile the Extension

```bash
npm run compile
```

After successful compilation, the `out` folder will be generated:

```text
out/
└── extension.js
```

### 6. Run the Extension

Open the project in VS Code:

```bash
code .
```

Press:

```text
F5
```

A new **Extension Development Host** window will open.

Open the Command Palette:

```text
Ctrl + Shift + P
```

Search for:

```text
CipherDeck: Open AES & JSON/XML Workbench
```

The AES JSON Tool will open in a new tab.

> Every time `CipherDeck: Open AES & JSON/XML Workbench` is executed, a new tool tab is created.

## 📦 Generate VSIX

Compile the extension first:

```bash
npm run compile
```

Then generate the VSIX package:

```bash
npx vsce package
```

If VSCE is installed globally:

```bash
vsce package
```

A file similar to this will be generated:

```text
aesjsontool-1.0.0.vsix
```

### Install the VSIX

In VS Code:

```text
Extensions
    ↓
...
    ↓
Install from VSIX...
```

Select:

```text
aesjsontool-1.0.0.vsix
```

Or install from the terminal:

```bash
code --install-extension aesjsontool-1.0.0.vsix
```

## 📁 Project Structure

```text
aesjson/
│
├── src/
│   └── extension.ts              # Extension entry point
│
├── out/
│   └── extension.js              # Compiled JavaScript
│
├── media/
│   ├── index.html                # Tool UI
│   └── crypto-js.min.js          # AES encryption library
│
├── package.json                  # Extension configuration
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # Project documentation
├── LICENSE                       # License
└── .gitignore                    # Git ignored files
```

## ⚙️ Extension Command

| Command               | Description                      |
| --------------------- | -------------------------------- |
| `AES JSON Tool: Open` | Opens AES JSON Tool in a new tab |

## ✨ Features

- JSON & XML Formatter
- AES Encryption / Decryption
- JWT Decode + Basic Auth
- Time & Epoch Converter
- Base64 / URL / Image / PDF Converter
- HTML / CSS / JS Playground
- Light / Dark Theme

## 📋 Requirements

* Visual Studio Code
* Node.js
* npm

No additional configuration is required after installing the extension.

## 🐛 Known Issues

If you find any issues or have suggestions, please report them through the project's issue tracker.

## 🧪 Development

### Compile

```bash
npm run compile
```

### Watch Mode

```bash
npm run watch
```

### Debug

Press:

```text
F5
```

This opens the **Extension Development Host**.

You can set breakpoints in:

```text
src/extension.ts
```

Debug output is available in the VS Code **Debug Console**.

## 🔄 Development Workflow

After making changes:

```bash
npm run compile
```

Then reload the Extension Development Host.

You can also press:

```text
Ctrl + R
```

to reload the VS Code window.

## 🚀 Build and Package

Use the following commands before creating a release:

```bash
npm install
npm run compile
npx vsce package
```

Output:

```text
aesjsontool-x.x.x.vsix
```

## 📚 VS Code Extension Documentation

* [VS Code Extension API](https://code.visualstudio.com/api)
* [Extension UX Guidelines](https://code.visualstudio.com/api/ux-guidelines/overview)
* [Bundling Extensions](https://code.visualstudio.com/api/working-with-extensions/bundling-extension)
* [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
* [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration)
* [Issue Reporting](https://code.visualstudio.com/api/get-started/wrapping-up#issue-reporting)

## 📄 License

This project is licensed under the MIT License.
