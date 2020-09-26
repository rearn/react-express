type Keys = 'html' | 'css' | 'js' | 'cp';

type Config = {
  srcRoot: string,
  dest: string,
  src?: {
    backendJs: string[],
    frontendJs: string[],
    alljs: string,
    all: string[],
  },
  DestOptions: Object,
};

const config: Config = {
  srcRoot: './src',
  dest: './dist/',
  DestOptions: {
    sourcemaps: './maps',
  },
};
const getSrc = (suffix: string) => `${config.srcRoot}/**/${suffix}`;

config.src = {
  backendJs: [`${config.srcRoot}/backend/**/*.ts`, `!${config.srcRoot}/frontend/**/*.ts`],
  frontendJs: [`${config.srcRoot}/frontend/**/*.ts`, `!${config.srcRoot}/backend/**/*.ts`],
  alljs: getSrc('*.ts'),
  all: ['*.ts', '*.tsx', '*.styl'].map((v) => getSrc(v)),
};
export default config;
