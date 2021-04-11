const DEFAULT_BASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const toBase = (input: number, baseCharacters: string = DEFAULT_BASE_CHARACTERS): string => {
  const baseLength = baseCharacters.length
  if (input === 0) { return baseCharacters[0] }

  let out: Array<string> = []
  let i = input
  while (i > 0) {
    out.unshift(baseCharacters.charAt(i % baseLength))
    i = Math.floor(i / baseLength)
  }
  return out.join('')
}
