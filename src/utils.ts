

// =================== GENERAL UTILS =====================
export const enforce = (conditional: boolean, errorMessage: string) => {
  if (!conditional) throw new Error(errorMessage)
}

export const zeroAddress = '0x0000000000000000000000000000000000000000'

/// ================== FIRST / LAST IN LIST ======================
export const firstOrNull = <T>(array: Array<T>): T | null => {
  if (array.length === 0) return null
  return array[0]
}

export const first = <T>(array: Array<T>): T => {
  enforce(array.length > 0, 'First for empty array')
  return array[0]
}

export const last = <T>(array: Array<T>): T => {
  enforce(array.length > 0, 'Last for empty array')
  return array[array.length - 1]
}

// ======================= TYPESCRIPT INTROSPECTION =======================
export type PromiseType<T> = T extends PromiseLike<infer U> ? U : T
// type PromiseType = PromiseType<typeof promisedOne> // => number

export const assertUnreachable = (_x: never): never => { throw new Error('Didn\'t expect to get here') }
