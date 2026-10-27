const { spawnSync } = require('child_process');
const path = require('path');

const NODE_BIN = process.execPath;
const PROJECT_DIR = __dirname;
const tscBin = path.join(PROJECT_DIR, 'node_modules', 'typescript', 'bin', 'tsc');
const viteBin = path.join(PROJECT_DIR, 'node_modules', 'vite', 'bin', 'vite.js');

const env = {
  ...process.env,
  // Force rollup to use the wasm/js fallback instead of the native .node addon
  ROLLUP_SKIP_LOAD_NATIVE_PLUGIN: '1',
};

function run(label, bin, args) {
  console.log(`\n${label}...`);
  const r = spawnSync(NODE_BIN, [bin, ...args], {
    cwd: PROJECT_DIR,
    stdio: 'inherit',
    env,
  });
  if (r.status !== 0) {
    console.error(`❌ ${label} failed with exit code ${r.status}`);
    process.exit(r.status || 1);
  }
  console.log(`✅ ${label} done`);
}

run('Type checking', tscBin, ['-b']);
run('Vite build', viteBin, ['build']);
