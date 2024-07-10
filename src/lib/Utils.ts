export function numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export function handleNumberDisplay(num: number): string {
    if (num >= 1000000000000000) {
        return `${(num / 1000000000000000).toFixed(3)} Quadrillion`;
    }
    if (num >= 1000000000000) {
        return `${(num / 1000000000000).toFixed(3)} Trillion`;
    }
    if (num >= 1000000000) {
        return `${(num / 1000000000).toFixed(3)} Billion`;
    }
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(3)} Million`;
    }
    return numberWithCommas(+num.toFixed(3));
}
