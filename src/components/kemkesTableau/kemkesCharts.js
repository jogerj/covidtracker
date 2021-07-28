import { useState } from "react";
import { HStack, Box, useRadioGroup, useRadio } from "@chakra-ui/react";
import ProvinceChart from "./provinceChart";
import CityChart from "./cityChart";
import Loading from "../loading";
import Radios from "../shared_comp/customRadio/customRadio";

export default function KemkesCharts() {
  const [area, setArea] = useState("nasional");

  function renderChart() {
    if (area === "nasional") {
      return <ProvinceChart />;
    } else if (area === "kota") {
      return <CityChart />;
    } else {
      return <Loading minH="10vh" mt={5} />;
    }
  }

  return (
    <>
      <Radios
        radioOptions={["nasional", "kota"]}
        radioName="area"
        radioDefaultValue="nasional"
        setter={setArea}
      />
      {/* <RadioArea setArea={setArea} /> */}
      {renderChart()}
    </>
  );
}
