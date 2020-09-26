/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';

import { server, eslint, client } from './js';

export const build = gulp.parallel(server, client);
build.displayName = 'build';
export const lint = gulp.series(eslint);
lint.displayName = 'lint';
