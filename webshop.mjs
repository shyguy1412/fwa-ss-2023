#!/usr/bin/env node

import { Command } from "commander";
import { spawn } from 'child_process';
import { fileURLToPath } from "url";
import { createSocket } from 'dgram';
import { config } from "dotenv";

config();

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const programm = new Command();

const npm = process.platform == 'win32' ? 'npm.cmd' : 'npm';

programm
  .command('start')
  .description('starts the server')
  .option('--install', 'runs npm install before starting', false)
  .action(({ install }) => {
    if (install === true) {
      const installProcess = spawn(`${npm}`, ['i']);
      installProcess.stdout.on('data', data => process.stdout.write(data));
      installProcess.stderr.on('data', data => process.stderr.write(data));
      installProcess.addListener('exit', () => {
        spawnServerAndExit();
      });
    } else {
      spawnServerAndExit();
    }
  });

programm
  .command('stop')
  .description('stops the server')
  .action(() => {
    const ipcSocket = createSocket('udp4');
    const port = Number.parseInt(process.env.EXPRESS_PORT ?? 0) || 3000;
    ipcSocket.send('exit', port + 1, 'localhost', (err) => {
      console.log(err ?? 'EXITED');
      process.exit();
    });
  });



programm.parse();


function spawnServerAndExit() {
  spawn(`${npm}`, ['start'], {
    cwd: __dirname,
    detached: true
  });
  process.exit();
}