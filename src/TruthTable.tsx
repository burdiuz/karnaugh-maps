import { FormControl, FormLabel, Input, Sheet, Switch, Table } from "@mui/joy";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { getInputNameByIndex } from "./utils";

export const TruthTable = ({
  inputCount,
  outputs,
  setInputCount,
  setOutputs,
}: {
  inputCount: number;
  outputs: number[];
  setInputCount: Dispatch<SetStateAction<number>>;
  setOutputs: Dispatch<SetStateAction<number[]>>;
}) => {
  const rowsCount = 2 ** inputCount;

  useEffect(() => {
    setOutputs((value) => {
      const newLength = 2 ** inputCount;

      if (newLength <= value.length) {
        const newValue = [...value];
        newValue.length = newLength;

        return newValue;
      }

      return [...value, ...new Array(newLength - value.length).fill(0)];
    });
  }, [inputCount]);

  return (
    <>
      <FormControl>
        <FormLabel>Input count:</FormLabel>
        <Input
          value={inputCount}
          type="number"
          onChange={({ target: { value } }) => {
            const num = parseInt(value);

            if (!Number.isNaN(num)) {
              setInputCount(num);
            }
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Output values({outputs.length}):</FormLabel>
        <Input value={outputs.join(", ")} />
      </FormControl>
      <FormLabel>Truth Table:</FormLabel>
      <Sheet variant="outlined">
        <Table size="sm" stickyHeader stripe="odd" borderAxis="y" hoverRow>
          <thead>
            <tr>
              <th>#</th>
              {new Array(inputCount).fill(0).map((_, index) => (
                <th key={index}>{getInputNameByIndex(index, inputCount)}</th>
              ))}
              <th>Y</th>
            </tr>
          </thead>
          <tbody>
            {new Array(rowsCount).fill(0).map((_, row) => (
              <tr
                key={row}
                onClick={() =>
                  setOutputs((value) => {
                    const newValue = [...value];

                    newValue[row] = Number(!outputs[row]);
                    return newValue;
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <td>{row}</td>
                {new Array(inputCount).fill(0).map((_, col) => (
                  <td key={col}>{(row >> (inputCount - col - 1)) & 1}</td>
                ))}
                <td>
                  {outputs[row]}
                  <Switch
                    checked={!!outputs[row]}
                    sx={{ verticalAlign: "middle", marginLeft: 1 }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
};
