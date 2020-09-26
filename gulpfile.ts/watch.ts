/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import browserSync from 'browser-sync';
import { spawn } from 'child_process';
import { resolve } from 'path';

import { build, lint } from './concat';
import config from './config';

let path: string;

let proc: ReturnType<typeof spawn> | null = null;

const sync = (callback: Function) => {
  browserSync.init({
    files: ['dist/**'],
    proxy: 'http://localhost:3000',
    port: 4000,
    open: false,
    reloadDelay: 500,
  });
  callback();
};


const start = (callback: Function) => {
  if (proc !== null) {
    proc.kill('SIGINT');
  }
  proc = spawn('node', [path]);
  proc.stdout.on(
    'data', (data) => process.stdout.write(data.toString()),
  );
  proc.stderr.on(
    'data', (data) => process.stderr.write(data.toString()),
  );
  callback();
}

const restart = start;

const watchFiles = (callback: Function) => {
  gulp.watch(
    config.src.all,
    gulp.series(build, lint, (c: Function) => restart(c)),
  );
  callback();
}

const watchDo = (p: string) => {
  path = p;
  return gulp.series(
    build,
    (callback: Function) => start(callback),
    (callback: Function) => sync(callback),
    (callback: Function) => watchFiles(callback),
  );
};

export const watch = watchDo(resolve(__dirname, '..', 'dist', 'www.js'));
