
export const inArray = (arr: string[], key: string) => {
    let count = 0;
    arr.forEach(val => {
        if (val === key) {
            count++;
        }
    });
    return count;
};
