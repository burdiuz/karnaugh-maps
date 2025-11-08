import { FormLabel, Sheet, Switch, Table } from "@mui/joy";
import { getGreyCodeStr, getInputNameByIndex, numToBinString } from "./utils";
import { useState } from "react";

export const GreyCode = ({
  inputCount,
  outputs,
}: {
  inputCount: number;
  outputs: number[];
}) => {
  const [showAll, setShowAll] = useState(false);
  const rowsCount = 2 ** inputCount;

  return (
    <>
      <FormLabel sx={{ display: "inline" }}>Show all?</FormLabel>
      <Switch
        sx={{ verticalAlign: "middle", marginLeft: 1 }}
        checked={showAll}
        onChange={({ target: { checked } }) => setShowAll(checked)}
      />
      <Sheet variant="outlined" sx={{ marginTop: 1 }}>
        <Table
          size="sm"
          stickyHeader
          stripe="odd"
          borderAxis="y"
          sx={{ width: "unset", minWidth: "30%" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Y</th>
              {(() => {
                const split = Math.floor(inputCount / 2);
                const name = new Array(inputCount)
                  .fill(0)
                  .map((_, index) => getInputNameByIndex(index, inputCount));

                return (
                  <>
                    <th>{name.join("")}</th>
                    <th>Grey Code</th>
                    <th>{name.slice(0, split).join("")}</th>
                    <th>{name.slice(split).join("")}</th>
                  </>
                );
              })()}
            </tr>
          </thead>
          <tbody>
            {new Array(rowsCount).fill(0).map((_, row) => {
              if (!showAll && !outputs[row]) {
                return null;
              }

              return (
                <tr key={row}>
                  <td>{row}</td>
                  <td>{outputs[row]}</td>
                  <td>{numToBinString(row, inputCount)}</td>
                  {(() => {
                    const split = Math.floor(inputCount / 2);
                    const code = getGreyCodeStr(row, inputCount);
                    return (
                      <>
                        <td>{code}</td>
                        <td>{code.substring(0, split)}</td>
                        <td>{code.substring(split)}</td>
                      </>
                    );
                  })()}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
};
