import {
  Flex,
  Spacer,
  Button,
  Stack,
  Text,
  Link,
  Image,
  Container,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import Virus from "../../virus.png";

export default function NavbarDesktop({ ...props }) {
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

  return (
    <Container maxW="container.lg">
      <Flex
        {...props}
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
            <Text fontWeight="bold" fontSize={["2xl", "3xl"]}>
              CovidTracker
            </Text>
          </Stack>
        </Flex>
        <Spacer />

        <Stack
          display={["none", "none", "none", "flex"]}
          direction="row"
          width="auto"
          textAlign={"right"}
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
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
    </Container>
  );
}
