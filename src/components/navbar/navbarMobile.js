import { useMemo } from "react";
import { Flex, Stack, Text, Link } from "@chakra-ui/react";
import {
  RiInformationFill,
  RiUserFill,
  RiMapPin2Fill,
  RiAlarmWarningFill,
  RiHome2Fill,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
export default function NavbarMobile({ ...props }) {
  const NAV_LINKS = useMemo(
    () => [
      {
        path: "/home",
        icon: <RiHome2Fill />,
        text: "Beranda",
      },
      {
        path: "/data-provinsi",
        icon: <RiMapPin2Fill />,
        text: "Provinsi",
      },
      {
        path: "/info",
        icon: <RiInformationFill />,
        text: "Bantuan",
      },
    ],
    []
  );
  const ACTIVE_LINK = {
    color: "#EB5569",
  };
  return (
    <Flex
      {...props}
      position="fixed"
      boxShadow="md"
      bottom={0}
      width="full"
      overflow="hidden"
      py={3}
      zIndex={2}
      bg="white"
      borderTop="1px"
      borderTopColor="gray.300"
      as="nav"
      wrap="wrap"
      justify="space-around"
      alignItems="center"
    >
      {NAV_LINKS.map((data) => {
        return (
          <>
            <Link as={NavLink} to={data.path} activeStyle={ACTIVE_LINK}>
              <Stack align="center">
                {data.icon}
                <Text>{data.text}</Text>
              </Stack>
            </Link>
          </>
        );
      })}
      <Stack align="center">
        <RiAlarmWarningFill />
        <Link
          href="https://covid19.go.id/pelaporan-mandiri"
          target="_blank"
          rel="noreferrer"
        >
          <Text>Lapor</Text>
        </Link>
      </Stack>
    </Flex>
  );
}
