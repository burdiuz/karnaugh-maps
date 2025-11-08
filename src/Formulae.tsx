import { Button, Divider, FormLabel, Switch } from "@mui/joy";
import { getFullFormula, getOptimizedFormula } from "./utils";
import Latex from "react-latex-next";
import { useState } from "react";

export const Formulae = ({
  inputCount,
  outputs,
}: {
  inputCount: number;
  outputs: number[];
}) => {
  const [showDots, setShowDots] = useState(true);
  const fullFormula = getFullFormula(inputCount, outputs, showDots);
  const optimizedFormula = getOptimizedFormula(inputCount, outputs, showDots);
  return (
    <div>
      <FormLabel sx={{ display: "inline" }}>
        Show multiplication dots?
      </FormLabel>
      <Switch
        sx={{ verticalAlign: "middle", marginLeft: 1 }}
        checked={showDots}
        onChange={({ target: { checked } }) => setShowDots(checked)}
      />
      <FormLabel sx={{ marginTop: 3 }}>Min-Term Formula:</FormLabel>
      <Latex>{fullFormula}</Latex>
      <br />
      <Button
        onClick={() => navigator.clipboard.writeText(fullFormula)}
        sx={{ marginTop: 1 }}
      >
        Copy LaTeX to Cipboard
      </Button>
      <Divider sx={{ marginTop: 4, marginBottom: 4 }} />
      <FormLabel>Optimized Formula:</FormLabel>
      <Latex>{optimizedFormula}</Latex>
      <br />
      <Button
        onClick={() => navigator.clipboard.writeText(optimizedFormula)}
        sx={{ marginTop: 1 }}
      >
        Copy LaTeX to Cipboard
      </Button>
    </div>
  );
};
