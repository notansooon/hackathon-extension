# AI Hackathon Chrome Extension

This project requires Node.js and pnpm. Follow the instructions below to get set up and start developing.

## Prerequisites
### 1. Install Node.js
Download and install Node.js from nodejs.org.

### 2. Install pnpm
Once Node.js is installed, run the following command to install pnpm:
```bash
npm install -g pnpm
```
### 3. Install Dependencies
After cloning the repository, install the project dependencies by running:
```bash
pnpm i
```
## Development
To start development, use:
```bash
pnpm dev
```
## Load Extension in Chrome Canary
1. Open Chrome Canary and navigate to chrome://extensions.
2. Enable "Developer mode" in the top-right corner.
3. Click "Load Unpacked" and select the dist/ folder in this repository.
Your extension should now be loaded in Chrome Canary for testing. Click the extension action icon to load the app.