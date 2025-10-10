export const getAllNonRepeatingPermutations = (
  arr: string[],
  len: number,
  base: string[] = []
): Array<string[]> => {
  if (len === 0) {
    return [base];
  }
  const output: Array<string[]> = [];
  arr.forEach((char,index) => {
    const newArr = [...arr.slice(0,index), ...arr.slice(index+1)];
    const out = getAllNonRepeatingPermutations(newArr, len - 1, [...base, char]);
    // if (out.length > 0)
    out.forEach((perm) => {
      output.push(perm);
    });
  });
  return output;
};
