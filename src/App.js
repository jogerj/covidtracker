import { useEffect, useState } from "react";
import {
  Box,
  Container,
  ChakraProvider,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Footer from "./components/footer";
import DataProvinsi from "./components/dataProvinsi/dataProvinsi";
import Info from "./components/info/info";
import axios from "axios";

function App() {
  const [caseData, setCaseData] = useState();
  const [vaccination, setVaccination] = useState();
  const [error, setError] = useState("");
  const [tanggal, setTanggal] = useState();

  function setData1(data) {
    let temp;
    data.forEach((element) => {
      temp = new Date(element.tanggal);
      element.tanggal = temp.toLocaleDateString("id-ID");
    });
    setTanggal(data[data.length - 1].tanggal);
    setCaseData(data);
  }

  function changesCounter(currentData, prevData) {
    if (currentData && prevData) {
      let res = ((currentData - prevData) / currentData) * 100;
      return res.toFixed(2);
    }
  }

  async function apiGet(apiURL, setter, queryParam = "") {
    axios
      .get(apiURL + queryParam)
      .then((response) => {
        //"res", response.data);
        setter(response.data);
      })
      .catch((error) => {
        setError(error.toString());
        console.error("There was an error!", error);
      });
  }
  useEffect(() => {
    apiGet(
      "https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian",
      setData1
    );
    apiGet("https://vaksincovid19-api.vercel.app/api/vaksin", setVaccination);
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Box bg="#FBFCFF" minHeight="100vh">
          <Container maxW="container.lg">
            <Navbar tanggal={tanggal} />

            <Switch>
              <Route path="/data-provinsi">
                <DataProvinsi />
              </Route>
              <Route path="/info">
                <Info />
              </Route>
              <Route path="/home">
                <Home
                  caseData={caseData}
                  vaccData={vaccination}
                  changesCounter={changesCounter}
                  error={error}
                />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </Switch>
            <Footer />
          </Container>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
