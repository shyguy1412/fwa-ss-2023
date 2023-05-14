#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { createSocket } from 'dgram';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const npm = process.platform == 'win32' ? 'npm.cmd' : 'npm';

if (process.argv.includes('--install')) {
  const installProcess = spawn(`${npm}`, ['install'], {
    stdio: ['inherit', 'inherit', 'inherit']
  });

  await new Promise(resolve => {
    installProcess.addListener('exit', () => resolve());
  });
}

//Dynamic import to prevent loading uninstalled dependencies
const { Command } = await import('commander');
const { config } = await import('dotenv');

config();

const programm = new Command();


programm
  .command('start')
  .description('starts the server')
  .option('--install', 'runs npm install before starting', false)
  .action(() => {
    const ipcSocket = createSocket('udp4');
    const port = Number.parseInt(process.env.EXPRESS_PORT ?? 0) || 3000;
    const serverProcess = spawn(`${npm}`, ['start'], {
      cwd: __dirname,
      stdio: ['inherit', 'inherit', 'inherit']
    });

    serverProcess.addListener('exit', () => process.exit());

    ipcSocket.on("message", function (msg) {
      if (msg.toString('utf-8') == 'started')
        process.exit();
    });

    ipcSocket.bind(port - 1, 'localhost');

    serverProcess.unref();
  });

programm
  .command('stop')
  .description('stops the server')
  .action(() => {
    const ipcSocket = createSocket('udp4');
    const port = Number.parseInt(process.env.EXPRESS_PORT ?? 0) || 3000;
    ipcSocket.send('exit', port + 1, 'localhost', (err) => {
      console.log(err ?? 'Stopped');
      process.exit();
    });
  });

programm.parse();
