import {
  HStack,
  Flex,
  Box,
  Text,
  SkeletonText,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  SimpleGrid,
} from "@chakra-ui/react";
import { MdLocalHospital } from "react-icons/md";
import CountUp from "react-countup";

export default function Mortality({ data, ...props }) {
  return (
    <Box {...props}>
      <HStack pb={2}>
        <Text fontSize="4xl" color="red.400">
          <MdLocalHospital />
        </Text>
        <Text fontSize="lg">
          <strong>Rawat Inap</strong>
        </Text>
      </HStack>

      <SimpleGrid minChildWidth={["94%", "47%", "47%", "23.5%"]} spacing="2%">
        {data.length > 0 ? (
          data.map((key, index) => {
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
          </>
        )}
      </SimpleGrid>
    </Box>
  );
}
