import { useState, useEffect } from "react";
import {
  Box,
  Text,
  SimpleGrid,
  Stack,
  Link,
  Button,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  RiCloseCircleLine,
  RiInformationFill,
  RiVirusFill,
  RiThermometerFill,
  RiHeartFill,
} from "react-icons/ri";
import { GiTombstone } from "react-icons/gi";
import ApiError from "../apiError/apiError";
import KopitCase from "./kopitCase";
import Hospitalization from "./hospitalization";
import Vaccination from "./vaccination";
import DailyCase from "../charts/dailyCase";
import KemkesCharts from "../kemkesTableau/kemkesCharts";

export default function Home({ setTanggal }) {
  const [showInfo, setShowInfo] = useState(true);
  const [caseData, setCaseData] = useState([]);
  const [hospiData, setHospiData] = useState([]);
  const [apiError, setApiError] = useState();

  function changesCounter(currentData, todayData) {
    let res = (todayData / currentData) * 100;
    return parseFloat(res.toFixed(2));
  }

  useEffect(() => {
    async function getCaseData() {
      await axios
        .get("http://covidtracker-backend.vercel.app/api/national")
        .then((response) => {
          setTanggal(response.data.modifiedData.update.updateDate);
          setCaseData([
            {
              iconBg: "red.100",
              iconColor: "red.500",
              icon: <RiVirusFill />,
              cardTitle: "TOTAL KASUS POSITIF",
              data: response.data.modifiedData.total.positive,
              increaseArrowColor: "red.500",
              decreaseArrowColor: "teal.500",
              changes: {
                totalYtd: response.data.modifiedData.update.positive,
                percentage: changesCounter(
                  response.data.modifiedData.total.positive,
                  response.data.modifiedData.update.positive
                ),
              },
            },
            {
              iconBg: "gray.100",
              iconColor: "gray.500",
              icon: <GiTombstone />,
              cardTitle: "TOTAL KEMATIAN",
              data: response.data.modifiedData.total.death,
              increaseArrowColor: "red.500",
              decreaseArrowColor: "teal.500",
              changes: {
                totalYtd: response.data.modifiedData.update.death,
                percentage: changesCounter(
                  response.data.modifiedData.total.death,
                  response.data.modifiedData.update.death
                ),
              },
            },
          ]);

          setHospiData([
            {
              iconBg: "orange.100",
              iconColor: "orange.500",
              icon: <RiThermometerFill />,
              cardTitle: "TOTAL RAWATAN",
              data: response.data.modifiedData.total.hospitalized,
              increaseArrowColor: "red.500",
              decreaseArrowColor: "teal.500",
              changes: {
                totalYtd: response.data.modifiedData.update.hospitalized,
                percentage: changesCounter(
                  response.data.modifiedData.total.hospitalized,
                  response.data.modifiedData.update.hospitalized
                ),
              },
            },
            {
              iconBg: "teal.100",
              iconColor: "teal.500",
              icon: <RiHeartFill />,
              cardTitle: "TOTAL KESEMBUHAN",
              data: response.data.modifiedData.total.recovered,
              increaseArrowColor: "teal.500",
              decreaseArrowColor: "red.500",
              changes: {
                totalYtd: response.data.modifiedData.update.recovered,
                percentage: changesCounter(
                  response.data.modifiedData.total.recovered,
                  response.data.modifiedData.update.recovered
                ),
              },
            },
          ]);
        })
        .catch((error) => {
          setApiError(error.toString());
          console.error("There was an error!", error);
        });
    }

    getCaseData();
  }, [setTanggal]);

  return (
    <>
      <Box>
        <Box my={6}>
          {showInfo && <InfoAlert setShowInfo={setShowInfo} />}
          {apiError ? (
            <ApiError
              errorTitle="Ada masalah di API untuk mengambil data kasus terbaru."
              errorMessage={apiError}
            />
          ) : (
            <SimpleGrid
              minChildWidth={["94%", "94%", "94%", "47%"]}
              spacing={6}
            >
              <KopitCase data={caseData} />
              <Hospitalization data={hospiData} />
            </SimpleGrid>
          )}
          <Vaccination mt={5} />
          <DailyCase />
        </Box>
        <Stack>
          <Text mt={5} fontSize="xl" fontWeight="bold">
            Statistik Kemenkes
          </Text>
          <KemkesCharts />
        </Stack>
      </Box>
    </>
  );
}

function InfoAlert({ setShowInfo, ...props }) {
  return (
    <Box mb={6} bg="blue.50" {...props} p={5} borderRadius={10}>
      <Stack>
        <Flex justifyContent="space-between" alignItems="start">
          <Flex>
            <Text color="blue.500" fontSize="1.3rem" mr={2}>
              <RiInformationFill />
            </Text>
            <Text fontWeight="bold">
              Butuh bantuan donor darah, oksigen, info rumah sakit, dll?
            </Text>
          </Flex>
          <Flex>
            <Button
              variant="link"
              color="gray.700"
              onClick={() => {
                setShowInfo(false);
              }}
            >
              <Text fontSize="1.5rem">
                <RiCloseCircleLine />
              </Text>
            </Button>
          </Flex>
        </Flex>
        <Link as={NavLink} to="/info">
          Klik tautan ini untuk cari informasi/buka halaman "Info Bantuan"
        </Link>
      </Stack>
    </Box>
  );
}
