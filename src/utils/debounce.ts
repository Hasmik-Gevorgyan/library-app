
export function debounce (callback: (...args: any[]) => void, delay: number) {
    let timeoutId: number;

    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(...args)
        }, delay);
    };
  }
  