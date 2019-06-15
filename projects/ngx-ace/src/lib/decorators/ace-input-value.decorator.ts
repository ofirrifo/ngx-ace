export function aceInputValue(prefixPath: string, defaultVal: string) {
  const cachedValueKey = Symbol();
  return (target: any, key: PropertyKey) => {
    Object.defineProperty(target, key, {
      set(value: any) {
        this[cachedValueKey] = value ? `${prefixPath}${value}` : void 0;
      },
      get(): any {
        return this[cachedValueKey] ? this[cachedValueKey] : `${prefixPath}${defaultVal}`;
      },
    });
  };
}
