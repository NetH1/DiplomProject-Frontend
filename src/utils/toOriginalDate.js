export const toOriginalDate = (x) => {
    return `${new Date(x).getUTCDate().toString().padStart(2, '0')}.${(new Date(x).getUTCMonth() + 1).toString().padStart(2, '0')}.${new Date(x).getUTCFullYear()}`
}