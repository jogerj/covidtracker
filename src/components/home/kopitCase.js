import {
  HStack,
  Flex,
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  SimpleGrid,
  SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  RiSurgicalMaskFill,
  RiVirusFill,
  RiThermometerFill,
  RiHeartFill,
} from "react-icons/ri";
import { GiTombstone } from "react-icons/gi";
import CountUp from "react-countup";
import axios from "axios";
import UpdateTime from "../updateTime/updateTime";
import ApiError from "../shared_comp/apiError/apiError";

export default function Vaccination({ changesCounter, ...props }) {
  const [caseData, setCaseData] = useState([]);
  const [date, setDate] = useState(0);
  const [apiError, setApiError] = useState();

  useEffect(() => {
    async function getCaseData() {
      await axios
        .get("https://covidtracker-vincenth19-be.herokuapp.com/api/national")
        .then((response) => {
          setDate(response.data.updateDate);
          setCaseData([
            {
              iconBg: "red.100",
              iconColor: "red.500",
              icon: <RiVirusFill />,
              cardTitle: "TOTAL KASUS POSITIF",
              data: response.data.total.positive,
              increaseArrowColor: "red.500",
              decreaseArrowColor: "teal.500",
              changes: {
                totalYtd: response.data.update.positive,
                percentage: changesCounter(
                  response.data.total.positive,
                  response.data.update.positive
                ),
              },
            },
            {
              iconBg: "gray.100",
              iconColor: "gray.500",
              icon: <GiTombstone />,
              cardTitle: "TOTAL KEMATIAN",
              data: response.data.total.death,
              increaseArrowColor: "red.500",
              decreaseArrowColor: "teal.500",
              changes: {
                totalYtd: response.data.update.death,
                percentage: changesCounter(
                  response.data.total.death,
                  response.data.update.death
                ),
              },
            },
            {
              iconBg: "orange.100",
              iconColor: "orange.500",
              icon: <RiThermometerFill />,
              cardTitle: "TOTAL KASUS AKTIF",
              data: response.data.total.hospitalized,
              increaseArrowColor: "red.500",
              decreaseArrowColor: "teal.500",
              changes: {
                totalYtd: response.data.update.hospitalized,
                percentage: changesCounter(
                  response.data.total.hospitalized,
                  response.data.update.hospitalized
                ),
              },
            },
            {
              iconBg: "teal.100",
              iconColor: "teal.500",
              icon: <RiHeartFill />,
              cardTitle: "TOTAL KESEMBUHAN",
              data: response.data.total.recovered,
              increaseArrowColor: "teal.500",
              decreaseArrowColor: "red.500",
              changes: {
                totalYtd: response.data.update.recovered,
                percentage: changesCounter(
                  response.data.total.recovered,
                  response.data.update.recovered
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
  }, [changesCounter]);

  if (apiError) {
    return <ApiError errorTitle="" errorMessage={apiError} />;
  } else {
    return (
      <Box {...props}>
        <HStack>
          <Text fontSize="4xl" color="teal.400">
            <RiSurgicalMaskFill />
          </Text>
          <Text fontSize="lg">
            <strong>Kasus COVID-19</strong>
          </Text>
        </HStack>
        {/* {{lg: "23.5%", md: "47%", sm: "47%", base: "94%"}} */}
        <SimpleGrid
          mt={2}
          minChildWidth={["94%", "47%", "47%", "23.5%"]}
          spacing="2%"
        >
          {caseData.length > 0 ? (
            caseData.map((key, index) => {
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
                      <Text fontSize="2rem" color={key.iconColor}>
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
                      <Flex alignItems="center" fontSize="0.8rem">
                        {key.changes.percentage > 0 ? (
                          <StatArrow
                            type="increase"
                            color={key.increaseArrowColor}
                          />
                        ) : (
                          <StatArrow
                            type="decrease"
                            color={key.decreaseArrowColor}
                          />
                        )}
                        <Flex color="gray.600">
                          <Text>
                            <CountUp separator="." end={key.changes.totalYtd} />
                          </Text>
                          <Text ml={1}>
                            {"("}
                            <CountUp
                              separator="."
                              decimal=","
                              decimals={2}
                              suffix="%"
                              end={key.changes.percentage}
                            />
                            {")"}
                          </Text>
                        </Flex>
                      </Flex>
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
              <Box p={5} borderRadius={5} boxShadow="md" bg="white">
                <SkeletonText noOfLines={3} spacing="4" />
              </Box>
            </>
          )}
        </SimpleGrid>
        <Flex
          mt={[3, 0]}
          justifyContent="flex-end"
          borderBottom="1px"
          borderBottomColor="gray.200"
          pb={[0, 2]}
        >
          <UpdateTime date={date} />
        </Flex>
      </Box>
    );
  }
}
