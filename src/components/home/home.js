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

import { NavLink } from "react-router-dom";
import { RiCloseCircleLine, RiInformationFill } from "react-icons/ri";

import ApiError from "../shared_comp/apiError/apiError";
import KopitCase from "./kopitCase";
import Vaccination from "./vaccination";
import DailyCase from "../charts/dailyCase";
import KemkesCharts from "../kemkesTableau/kemkesCharts";
import RiskProfile from "./riskProfile";
import DailyVacc from "../charts/dailyVacc";
import DailyTesting from "../charts/dailyTesting";
import Testing from "./testing";

export default function Home() {
  const [showInfo, setShowInfo] = useState(true);
  const [caseData, setCaseData] = useState([]);

  function changesCounter(currentData, todayData) {
    let res = (todayData / currentData) * 100;
    return parseFloat(res.toFixed(2));
  }

  return (
    <>
      <Box>
        <Box my={6}>
          {showInfo && <InfoAlert setShowInfo={setShowInfo} />}
          <Stack mt={7} spacing={2}>
            <KopitCase changesCounter={changesCounter} />
            <Vaccination changesCounter={changesCounter} />
            <RiskProfile />
            <Testing changesCounter={changesCounter} />
            <Box>
              <Text
                fontWeight="bold"
                fontSize="2xl"
                borderBottom="1px"
                borderBottomColor="gray.200"
              >
                Statistik
              </Text>
              <Stack spacing={5}>
                <DailyCase />
                <DailyVacc />
                <DailyTesting />

                <KemkesCharts />
              </Stack>
            </Box>
          </Stack>
        </Box>
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
