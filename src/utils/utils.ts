export const fibonacci = (number: number): number => (number < 3 ? 1 : fibonacci(number - 1) + fibonacci(number - 2));

export const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
