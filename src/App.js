import { useState } from "react";
import { Box, Container, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Footer from "./components/footer";
import DataProvinsi from "./components/dataProvinsi/dataProvinsi";
import Info from "./components/info/info";

function App() {
  const [tanggal, setTanggal] = useState();

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
                <Home setTanggal={setTanggal} />
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
