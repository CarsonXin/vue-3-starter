export const isEqual: (value1: any, value2: any) => boolean = (value1, value2) => {
  return Object.is(value1, value2)
}

