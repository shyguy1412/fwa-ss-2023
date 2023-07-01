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

  const generateApi = spawn(`${npm}`, ['run', 'generate:api'], {
    stdio: ['inherit', 'inherit', 'inherit']
  });

  await new Promise(resolve => {
    generateApi.addListener('exit', () => resolve());
  });
}

//Dynamic import to prevent loading uninstalled dependencies
const { Command } = await import('commander');
const { config } = await import('dotenv');

config();

const program = new Command();

if (process.argv.includes('--docker')) {
  const docker = spawn(`docker`, ['compose', 'create'], {
    stdio: ['inherit', 'inherit', 'inherit']
  });

  await new Promise(resolve => {
    docker.addListener('exit', () => resolve());
  });

  spawn(`docker`, ['compose', 'start'], {
    cwd: __dirname,
  });
}

program
  .command('start')
  .description('starts the server')
  .option('--install', 'runs npm install before starting', false)
  .option('--docker', 'create and start docker container', false)
  .action(() => {
    const ipcSocket = createSocket('udp4');
    const port = Number.parseInt(process.env.EXPRESS_PORT ?? 0) || 3000;
    //Process must NOT inherit stdio. This causes the CI/CD pipeline to get stuck (because why not?)
    //even after the CLI process terminates
    const serverProcess = spawn(`${npm}`, ['start'], {
      cwd: __dirname,
    });


    ipcSocket.on("message", function (msg) {
      if (msg.toString('utf-8') == 'started')
        process.exit();
    });

    ipcSocket.bind(port - 1, 'localhost');

    //We still gotta get the console output tho
    serverProcess.stdout.on('data', data => process.stdout.write(data));
    serverProcess.stderr.on('data', data => process.stderr.write(data));
    serverProcess.unref();
  });

program
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



program.parse();


function spawnServerAndExit() {

}
