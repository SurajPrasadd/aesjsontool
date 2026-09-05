# AES JSON Tool

A simple VS Code extension that provides useful developer tools for **AES Encryption/Decryption** and **JSON/XML formatting** directly inside Visual Studio Code.

## ✨ Features

* 🔐 AES Encryption & Decryption
* 📝 JSON Formatter
* 📝 XML Formatter
* ⚡ Easy access through VS Code Command Palette
* 🌐 Simple and lightweight developer toolbox

## 🚀 Usage

1. Install **AES JSON Tool** in VS Code.
2. Open the Command Palette:
   `Ctrl + Shift + P`
3. Search for:
   `AES JSON Tool: Open`
4. Select the command to open the tool.

## 🛠️ Project Setup

### 1. Create the project

```bash
mkdir aesjson
cd aesjson
npm init -y
```

### 2. Install VS Code Extension Generator

```bash
npm install -g yo generator-code
```

### 3. Generate the extension

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

### 4. Install dependencies

```bash
npm install
```

### 5. Compile the extension

```bash
npm run compile
```

After successful compilation, the `out` folder will be generated.

### 6. Run the extension

Open the project in VS Code:

```bash
code .
```

Press:

```text
F5
```

A new **Extension Development Host** window will open.

Then press:

```text
Ctrl + Shift + P
```

Search for:

```text
AES JSON Tool: Open
```

## 📁 Project Structure

```text
aesjson/
│
├── src/
│   └── extension.ts          # Extension entry point
│
├── out/
│   └── extension.js          # Compiled JavaScript
│
├── media/
│   ├── index.html            # Tool UI
│   └── crypto-js.min.js      # AES encryption library
│
├── package.json              # Extension configuration
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Project documentation
└── .gitignore                # Git ignored files
```

## ⚙️ Extension Command

| Command               | Description             |
| --------------------- | ----------------------- |
| `AES JSON Tool: Open` | Opens the AES JSON Tool |

## 📋 Requirements

* Visual Studio Code
* Node.js
* npm

No additional configuration is required after installation.

## 🐛 Known Issues

If you find any issues or have suggestions, please report them through the project's issue tracker.

## 📦 Release Notes

### 1.0.0

Initial release of **AES JSON Tool**.

* Added AES Encryption & Decryption
* Added JSON Formatter
* Added XML Formatter
* Added VS Code integration

## 🌐 Online Developer Toolbox

The same developer tools are also available online:

**https://surajprasadd.github.io/Toolbox/**

## 🛠️ Built With

* TypeScript
* HTML
* CSS
* JavaScript
* VS Code Extension API
* CryptoJS
* AI-assisted development using Claude AI

---

**Enjoy using AES JSON Tool! 🚀**
