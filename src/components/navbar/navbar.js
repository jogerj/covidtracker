import {
  Flex,
  Spacer,
  Button,
  Stack,
  Text,
  Link,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import Virus from "../../virus.png";

export default function Navbar() {
  const ACTIVE_LINK = {
    fontWeight: "700",
    color: "#FFFFFF",
    backgroundColor: "#EB5569",
    padding: "0px 10px",
    borderRadius: "5px",
  };

  const NAV_LINKS = useMemo(
    () => [
      {
        path: "/home",
        text: "Beranda",
      },
      {
        path: "/data-provinsi",
        text: "Data Provinsi",
      },
      {
        path: "/info",
        text: "Info Bantuan",
      },
    ],
    []
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      boxShadow="md"
      borderBottomRadius={10}
      bg="white"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
    >
      <Flex wrap="wrap" align="center">
        <Image src={Virus} boxSize="50px" />
        <Stack spacing={0} ml={3}>
          <Text fontWeight="bold" fontSize={["lg", "xl", "2xl", "3xl"]}>
            CovidTracker
          </Text>
        </Stack>
      </Flex>
      <Spacer />
      <Button
        display={["block", "block", "block", "none"]}
        color="grey.500"
        onClick={handleToggle}
      >
        <RiMenu3Fill />
      </Button>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{
          base: isOpen ? "flex" : "none",
          md: isOpen ? "flex" : "none",
          lg: "flex",
        }}
        width={["full", "full", "full", "auto"]}
        textAlign={"right"}
        alignItems={["flex-end", "flex-end", "flex-end", "center"]}
        justifyContent="flex-end"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
        spacing={3}
      >
        {NAV_LINKS.map((data, index) => {
          return (
            <Link
              key={index}
              as={NavLink}
              activeStyle={ACTIVE_LINK}
              to={data.path}
            >
              {data.text}
            </Link>
          );
        })}
        <Link
          href="https://covid19.go.id/pelaporan-mandiri"
          target="_blank"
          rel="noreferrer"
        >
          Lapor Mandiri
        </Link>
        <Button
          as={Link}
          size="sm"
          colorScheme="red"
          variant="outline"
          href="https://vincenth19.com"
          target="_blank"
          rel="noreferrer"
        >
          About Me
        </Button>
      </Stack>
    </Flex>
  );
}
