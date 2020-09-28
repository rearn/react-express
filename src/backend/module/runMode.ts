// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = (e: string | undefined, d: string) => (e === undefined ? d : e);

export default _(process.env.CI, _(process.env.NODE_ENV, 'development'));
