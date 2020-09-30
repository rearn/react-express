/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';

import gulpEslint from 'gulp-eslint';

import gulpTypescript from 'gulp-typescript';
import gulpPlumber from 'gulp-plumber';
import alias from 'gulp-ts-alias';

import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import config from './config';
import webpackConfigPro from '../webpack.config.production';
import webpackConfigDev from '../webpack.config.development';

const tsProject = gulpTypescript.createProject('src/backend/tsconfig.json');
(<any>tsProject.config.compilerOptions).baseUrl = './';

export const eslint = () => gulp
  .src(config.src.alljs)
  .pipe(gulpEslint())
  .pipe(gulpEslint.format())
  .pipe(gulpEslint.failAfterError());
eslint.displayName = 'eslint';

export const server = () => gulp
  .src(config.src.backendJs)
  .pipe(gulpPlumber({
    errorHandler: (err) => {
      // eslint-disable-next-line no-console
      console.log(err.messageFormatted);
      // this.emit('end');
    },
  }))
  .pipe(alias({ configuration: tsProject.config }))
  .pipe(tsProject())
  .js
  .pipe(gulp.dest(config.dest, config.DestOptions));
server.displayName = 'server';

const webpackConfig = <webpack.Configuration>(() => {
  if (process.env.NODE_ENV === 'production') {
    return webpackConfigPro;
  }
  return webpackConfigDev;
})();

export const client = () => webpackStream(
  webpackConfig,
//  <typeof webpack>webpack,
).pipe(gulp.dest(webpackConfig.output.path, config.DestOptions));
client.displayName = 'client';
