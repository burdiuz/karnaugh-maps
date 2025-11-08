import "katex/dist/katex.min.css";
import { useState } from "react";
import "./App.css";
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { TruthTable } from "./TruthTable";
import { Formulae } from "./Formulae";
import { GreyCode } from "./GreyCode";

/*

        <Latex>
          Formula: {'$Y(a,b,c,d) = (\\overline{a}bcd) \\lor (abcd)$'}
        </Latex>
*/

const TabValues = {
  TRUTH_TABLE: "truthTable",
  FORMULAS: "formulae",
  GREY_CODE: "greyCode",
  KARNAUGH_MAP: "karnaughMap",
};

function App() {
  const [inputCount, setInputCount] = useState(4);
  const rowsCount = 2 ** inputCount;
  const [outputs, setOutputs] = useState<number[]>(
    new Array(rowsCount).fill(0)
  );

  return (
    <Tabs defaultValue={TabValues.TRUTH_TABLE} sx={{ minHeight: "100vh" }}>
      <TabList>
        <Tab value={TabValues.TRUTH_TABLE}>Truth Table</Tab>
        <Tab value={TabValues.FORMULAS}>Formula</Tab>
        <Tab value={TabValues.GREY_CODE}>Grey Code</Tab>
        <Tab value={TabValues.KARNAUGH_MAP}>Karnaugh Map</Tab>
      </TabList>
      <TabPanel value={TabValues.TRUTH_TABLE}>
        <TruthTable
          inputCount={inputCount}
          outputs={outputs}
          setInputCount={setInputCount}
          setOutputs={setOutputs}
        />
      </TabPanel>
      <TabPanel value={TabValues.FORMULAS}>
        <Formulae inputCount={inputCount} outputs={outputs} />
      </TabPanel>
      <TabPanel value={TabValues.GREY_CODE}>
        <GreyCode inputCount={inputCount} outputs={outputs} />
      </TabPanel>
      <TabPanel value={TabValues.KARNAUGH_MAP}>Karnaugh Map</TabPanel>
    </Tabs>
  );
}

export default App;
