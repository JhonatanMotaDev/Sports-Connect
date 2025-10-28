const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Sports Connect Full Stack Application...\n');

function startProcess(command, args, cwd, name, color) {
  const process = spawn(command, args, {
    cwd: cwd,
    shell: true,
    stdio: 'pipe'
  });

  process.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`${color}[${name}]${'\x1b[0m'} ${line}`);
      }
    });
  });

  process.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`${color}[${name}]${'\x1b[0m'} ${line}`);
      }
    });
  });

  process.on('close', (code) => {
    console.log(`${color}[${name}]${'\x1b[0m'} Process exited with code ${code}`);
  });

  return process;
}

console.log('📊 Starting Backend Server...');
const backendProcess = startProcess(
  'npm',
  ['run', 'dev'],
  // eslint-disable-next-line no-undef
  path.join(__dirname, '..', 'backend'),
  'BACKEND',
  '\x1b[36m'
);

setTimeout(() => {
  console.log('📱 Starting Frontend Server...');
  const frontendProcess = startProcess(
    'npm',
    ['run', 'dev:frontend'],
    // eslint-disable-next-line no-undef
    path.join(__dirname, '..'),
    'FRONTEND',
    '\x1b[32m' 
  );

  // Handle cleanup
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    backendProcess.kill();
    frontendProcess.kill();
    process.exit(0);
  });

}, 3000);

console.log('\n✅ Both servers are starting...');
console.log('📊 Backend: http://localhost:3333');
console.log('📱 Frontend: http://localhost:8081');
console.log('🗄️  MongoDB Compass: mongodb://localhost:27017/sportsconnect');
console.log('\nPress Ctrl+C to stop all servers\n');
