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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Divider,
  Code,
  Link,
} from "@chakra-ui/react";
import { HiShieldExclamation } from "react-icons/hi";
import CountUp from "react-countup";
import ApiError from "../shared_comp/apiError/apiError";
import Radios from "../shared_comp/customRadio/customRadio";

export default function RiskProfile({ ...props }) {
  const [riskData, setRiskData] = useState();
  const [period, setPeriod] = useState("mingguan");
  const [apiError, setApiError] = useState();

  useEffect(() => {
    async function getRiskData() {
      await axios
        .get(
          "https://covidtracker-vincenth19-be.herokuapp.com/api/risk_profile/"
        )
        .then((response) => {
          setRiskData([
            {
              iconBg: "orange.500",
              cardTitle: "KASUS PER 100 RIBU ORANG",
              weeklyData: response.data.thisWeek.casePer100k,
              overallData: response.data.overall.casePer100k,
            },
            {
              iconBg: null,
              cardTitle: "MENINGGAL PER 100 RIBU ORANG",
              weeklyData: response.data.thisWeek.deathPer100k,
              overallData: response.data.overall.deathPer100k,
            },
            {
              iconBg: "red.600",
              cardTitle: "TINGKAT TES POSITIF",
              weeklyData: response.data.thisWeek.positive,
              overallData: response.data.overall.positive,
            },
          ]);
        })
        .catch((error) => {
          setApiError(error.toString());
          console.error("There was an error!", error);
        });
    }

    getRiskData();
  }, []);

  if (apiError) {
    return <ApiError errorTitle="" errorMessage={apiError} />;
  } else {
    return (
      <Box mt={5} {...props}>
        <HStack pb={2}>
          <Text fontSize="4xl" color="orange.500">
            <HiShieldExclamation />
          </Text>
          <Text fontSize="lg">
            <strong>Profil Risiko</strong>
          </Text>
          <ExplanationModal />
        </HStack>
        <Radios
          mb={2}
          radioOptions={["mingguan", "keseluruhan"]}
          radioName="period"
          radioDefaultValue="mingguan"
          setter={setPeriod}
        />
        <SimpleGrid
          minChildWidth={{ lg: "32%", md: "100%", sm: "100%", base: "100%" }}
          spacing="2%"
        >
          {riskData ? (
            riskData.map((key, index) => {
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
                    {key.iconBg && (
                      <Box
                        p={2}
                        bg={key.iconBg}
                        borderRadius={100}
                        mr={4}
                        height="25px"
                        width="25px"
                      >
                        {/* <Text fontSize="2rem" color={key.iconColor}>
                        {key.icon}
                      </Text> */}
                      </Box>
                    )}
                    <Stat>
                      <StatLabel fontSize="0.65em" color="gray.500">
                        {key.cardTitle}
                      </StatLabel>
                      <StatNumber>
                        <CountUp
                          separator="."
                          decimal=","
                          decimals="2"
                          end={
                            period === "mingguan"
                              ? key.weeklyData
                              : key.overallData
                          }
                        />
                        {index === 2 && "%"}
                      </StatNumber>
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

function ExplanationModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" size="sm" variant="outline">
        ?
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Penjelasan Tingkat Risiko</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="semibold">Kasus Per 100 Ribu Orang:</Text>
            <Box>
              <Stack mt={3} spacing={3}>
                <Flex align="center">
                  <Box
                    bg="red.800"
                    width="20px"
                    height="20px"
                    mr={3}
                    borderRadius={10}
                  />
                  <Stack>
                    <Text fontWeight="semibold">
                      <Text>Di atas 75</Text>
                      <Text>(Penyebaran Parah)</Text>
                    </Text>
                  </Stack>
                </Flex>
                <Flex>
                  <Box
                    bg="red.500"
                    width="20px"
                    height="20px"
                    mr={3}
                    borderRadius={10}
                  />
                  <Stack>
                    <Text>25-75</Text>
                  </Stack>
                </Flex>
                <Flex>
                  <Box
                    bg="orange.500"
                    width="20px"
                    height="20px"
                    mr={3}
                    borderRadius={10}
                  />
                  <Stack>
                    <Text>10-25</Text>
                  </Stack>
                </Flex>
                <Flex>
                  <Box
                    bg="yellow.400"
                    width="20px"
                    height="20px"
                    mr={3}
                    borderRadius={10}
                  />
                  <Stack>
                    <Text>1-10</Text>
                  </Stack>
                </Flex>
                <Flex align="center">
                  <Box
                    bg="green.500"
                    width="20px"
                    height="20px"
                    mr={3}
                    borderRadius={10}
                  />
                  <Stack>
                    <Text fontWeight="semibold">
                      <Text>Di bawah 1</Text>
                      <Text>(Menuju ke arah aman)</Text>
                    </Text>
                  </Stack>
                </Flex>
              </Stack>
            </Box>
            <Box mt={3}>
              Untuk menghitung angka kasus per 100 ribu penduduk, saya memakai
              formula:{" "}
              <Code>
                Rata-rata kasus baru 7 hari / (populasi penduduk / 100 000)
              </Code>
              <Text>
                Ini akan menghasilkan angka kasus per 100 ribu setiap minggu.
                Untuk angka keseluruhan, cukup ganti
              </Text>{" "}
              <Code>Rata-rata kasus 7 hari</Code> menjadi{" "}
              <Code>Jumlah semua kasus positif</Code>.
            </Box>
            <Divider my={5} />
            <Box>
              <Text fontWeight="semibold">Tingkat Tes Positif:</Text>
              <Stack mt={3} spacing={3}>
                <Flex align="center">
                  <Box
                    bg="red.500"
                    width="20px"
                    height="20px"
                    mr={3}
                    borderRadius={10}
                  />
                  <Stack spacing={0}>
                    <Text fontWeight="semibold">
                      Di atas 20% (Tes tidak memadai)
                    </Text>
                  </Stack>
                </Flex>
                <Flex>
                  <Box
                    bg="orange.500"
                    width="20px"
                    height="20px"
                    mr={3}
                    borderRadius={10}
                  />
                  <Stack>
                    <Text>10%-20%</Text>
                  </Stack>
                </Flex>
                <Flex>
                  <Box
                    bg="yellow.400"
                    width="20px"
                    height="20px"
                    mr={3}
                    borderRadius={10}
                  />
                  <Stack>
                    <Text>3%-10%</Text>
                  </Stack>
                </Flex>
                <Flex>
                  <Box
                    bg="green.500"
                    width="20px"
                    height="20px"
                    mr={3}
                    borderRadius={10}
                  />
                  <Stack>
                    <Text fontWeight="semibold">Di bawah 3% (Tes memadai)</Text>
                  </Stack>
                </Flex>
              </Stack>
            </Box>
            <Box mt={3}>
              <Text>
                Data tes yang saya dapat adalah jumlah tes PCR, TCM, dan Antigen
                per hari dan keseluruhan. Hasil persentase untuk tingkat tes
                positif dihitung dengan formula:
              </Text>
              <Code>
                Rata-rata kasus baru 7 hari / Rata-rata semua tes 7 hari x 100
              </Code>
              <Text>
                Ini akan menghasilkan angka setiap minggu. Untuk angka
                keseluruhan, cukup ganti
              </Text>{" "}
              <Code>Rata-rata kasus baru 7 hari</Code> dan{" "}
              <Code>Rata-rata semua tes 7 hari</Code> menjadi{" "}
              <Code>Jumlah semua kasus positif</Code> dan{" "}
              <Code>Jumlah semua tes</Code>.
              <Text mt={3}>
                Menurut{" "}
                <Link
                  color="blue.500"
                  to="https://globalhealth.harvard.edu/evidence-roundup-why-positive-test-rates-need-to-fall-below-3/"
                >
                  WHO
                </Link>
                , tingkat rata-rata testing harus terjaga antara 3%-12% dan
                rekomendasinya 5% selama 14 hari (2 minggu) sebelum lockdown
                boleh diangkat. Sebab jika angka positif tinggi, berarti orang
                lebih mudah terjangkit COVID-19.
              </Text>
              <Text mt={5}>
                <Link
                  to="https://covidactnow.org/covid-risk-levels-metrics#icu-capacity-used"
                  color="blue.500"
                  mr={5}
                >
                  Referensi Tingkat Risiko
                </Link>
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
