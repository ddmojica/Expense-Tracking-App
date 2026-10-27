#!/usr/bin/env node
/**
 * Dev server launcher for expense-tracker.
 * Usage: node dev.cjs  (or: agy-node dev.cjs)
 * 
 * This script starts the Vite dev server via the Electron-based Node runtime
 * bundled with Antigravity, since system Node is not available.
 */
const { spawn } = require('child_process');
const path = require('path');

const NODE_BIN = process.execPath;
const PROJECT_DIR = __dirname;
const viteBin = path.join(PROJECT_DIR, 'node_modules', 'vite', 'bin', 'vite.js');

console.log('Starting Vite dev server...');
console.log('Open http://localhost:5173 in your browser\n');

const child = spawn(NODE_BIN, [viteBin], {
  cwd: PROJECT_DIR,
  stdio: 'inherit',
});

child.on('exit', (code) => process.exit(code ?? 0));
process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
