/**
 *
 * @param index - indices start from 0, 97 is a code for "a"
 * @returns
 */
export const getInputNameByIndex = (index: number, max: number = 26) => {
  let label = String.fromCharCode(97 + (index % 26));

  if (max / 26 > 1) {
    /**
     * If maximum is greater than char count in English alphabet we add numbers to labels
     */
    label = `${label}${Math.floor(index / 26)}`;
  }

  return label;
};

export const getFullFormula = (
  inputCount: number,
  outputs: number[],
  showDots = true
) => {
  const delimeter = showDots ? " \\cdot " : " ";
  const template = new Array(inputCount).fill(0);
  const labels = new Array(inputCount)
    .fill(0)
    .map((_, index) => getInputNameByIndex(index, inputCount));
  const head = `$Y(${labels.join(",")}) = `;

  const contents = outputs
    .map((val, index) => {
      const segment = template
        .map((_, input) => {
          const positive = (index >> (inputCount - input - 1)) & 1;
          return positive ? labels[input] : `\\overline{${labels[input]}}`;
        })
        .join(delimeter);

      return `(${val}${delimeter}${segment})`;
    })
    .join(" \\lor ");

  return `${head}${contents || "0"}$`;
};

export const getOptimizedFormula = (
  inputCount: number,
  outputs: number[],
  showDots = true
) => {
  const delimeter = showDots ? " \\cdot " : " ";
  const template = new Array(inputCount).fill(0);
  const labels = new Array(inputCount)
    .fill(0)
    .map((_, index) => getInputNameByIndex(index, inputCount));
  const head = `$Y(${labels.join(",")}) = `;

  const contents = outputs
    .map((val, index) => {
      if (!val) {
        return "";
      }

      const segment = template
        .map((_, input) => {
          const positive = (index >> (inputCount - input - 1)) & 1;
          return positive ? labels[input] : `\\overline{${labels[input]}}`;
        })
        .join(delimeter);

      return `(${segment})`;
    })
    .filter((str) => !!str)
    .join(" \\lor ");

  return `${head}${contents || "0"}$`;
};

export const getGreyCode = (num: number) => num ^ (num >> 1);

export const numToBinString = (value: number, inputCount: number) =>
  value.toString(2).padStart(inputCount, "0");

export const getGreyCodeStr = (value: number, inputCount: number) =>
  numToBinString(getGreyCode(value), inputCount);
