export const onlyDigits = (s: string) => (s || '').replace(/\D/g, '')

export function isValidCpf(d: string) {
  if (!d || d.length !== 11 || /^(\d)\1+$/.test(d)) return false
  const calc = (base: string, factors: number[]) =>
    factors.reduce((sum, f, i) => sum + Number(base[i]) * f, 0)
  const d1 = ((calc(d, [10, 9, 8, 7, 6, 5, 4, 3, 2]) * 10) % 11) % 10
  const d2 = ((calc(d, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]) * 10) % 11) % 10
  return d.endsWith(`${d1}${d2}`)
}

export function maskCPF(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}