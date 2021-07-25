import { useEffect, useState } from "react";
import axios from "axios";
import {
  HStack,
  Flex,
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  SkeletonText,
  SimpleGrid,
  StatHelpText,
} from "@chakra-ui/react";
import { RiSyringeFill } from "react-icons/ri";
import { BiTargetLock } from "react-icons/bi";
import CountUp from "react-countup";
import ApiError from "../apiError/apiError";

export default function Vaccination({ ...props }) {
  const [vaccData, setVaccData] = useState([]);
  const [apiError, setApiError] = useState();

  useEffect(() => {
    async function getVaccData() {
      await axios
        .get("https://cekdiri.id/vaksinasi/")
        .then((response) => {
          const DATA_TODAY =
            response.data.monitoring[response.data.monitoring.length - 1];
          setVaccData([
            {
              iconBg: "blue.100",
              iconColor: "blue.500",
              fontSize: "2rem",
              icon: <BiTargetLock />,
              marginx: "0",
              cardTitle: "TARGET VAKSINASI NASIONAL",
              data: DATA_TODAY.total_sasaran_vaksinasi,
              helperText: "-",
            },
            {
              iconBg: "purple.100",
              iconColor: "purple.500",
              fontSize: "1.4rem",
              icon: <strong>1</strong>,
              marginx: "10px",
              cardTitle: "TOTAL VAKSINASI DOSIS 1",
              data: DATA_TODAY.vaksinasi1,
              helperText: parseFloat(DATA_TODAY.cakupan.vaksinasi1),
            },
            {
              iconBg: "purple.100",
              iconColor: "purple.500",
              fontSize: "1.4rem",
              icon: <strong>2</strong>,
              marginx: "10px",
              cardTitle: "TOTAL VAKSINASI DOSIS 2",
              data: DATA_TODAY.vaksinasi2,
              helperText: parseFloat(DATA_TODAY.cakupan.vaksinasi2),
            },
          ]);
        })
        .catch((error) => {
          setApiError(error.toString());
          console.error("There was an error!", error);
        });
    }

    getVaccData();
  }, []);

  if (apiError) {
    return <ApiError errorTitle="" errorMessage={apiError} />;
  } else {
    return (
      <Box {...props}>
        <HStack pb={2}>
          <Text fontSize="4xl" color="blue.400">
            <RiSyringeFill />
          </Text>
          <Text fontSize="lg">
            <strong>Vaksinasi</strong>
          </Text>
        </HStack>
        <SimpleGrid
          minChildWidth={{ lg: "32%", md: "100%", sm: "100%", base: "100%" }}
          spacing="2%"
        >
          {vaccData ? (
            vaccData.map((key, index) => {
              return (
                <Box
                  px={5}
                  py={{ lg: "5", md: "5", sm: "2.5", base: "2" }}
                  borderRadius={5}
                  boxShadow="md"
                  bg="white"
                  key={index}
                >
                  <Flex alignContent="center" align="center">
                    <Box p={2} bg={key.iconBg} borderRadius={10} mr={4}>
                      <Text
                        fontSize={key.fontSize}
                        color={key.iconColor}
                        mx={key.marginx}
                      >
                        {key.icon}
                      </Text>
                    </Box>
                    <Stat>
                      <StatLabel fontSize="0.65em" color="gray.500">
                        {key.cardTitle}
                      </StatLabel>
                      <StatNumber>
                        <CountUp separator="." end={key.data} />
                      </StatNumber>
                      <StatHelpText>
                        <CountUp
                          separator="."
                          decimal=","
                          decimals={2}
                          end={key.helperText}
                        />
                        {index !== 0 ? "%" : null}
                      </StatHelpText>
                    </Stat>
                  </Flex>
                </Box>
              );
            })
          ) : (
            <>
              <Box p={5} borderRadius={5} boxShadow="md" bg="white">
                <SkeletonText noOfLines={3} spacing="4" />
              </Box>
              <Box p={5} borderRadius={5} boxShadow="md" bg="white">
                <SkeletonText noOfLines={3} spacing="4" />
              </Box>
              <Box p={5} borderRadius={5} boxShadow="md" bg="white">
                <SkeletonText noOfLines={3} spacing="4" />
              </Box>
            </>
          )}
        </SimpleGrid>
      </Box>
    );
  }
}
