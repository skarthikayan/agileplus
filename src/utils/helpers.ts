// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pick(obj: { [x: string]: any }, ...props: any[]) {
  return props.reduce(function (result, prop) {
    result[prop] = obj[prop];
    return result;
  }, {});
}
