export const getAllPermutations = (
  arr: string[],
  len: number,
  base: string[] = []
): Array<string[]> => {
  if (len === 0) {
    return [base];
  }
  const output: Array<string[]> = [];
  arr.forEach((char) => {
    const out = getAllPermutations(arr, len - 1, [...base, char]);
    // if (out.length > 0)
    out.forEach((perm) => {
      output.push(perm);
    });
  });
  return output;
};
