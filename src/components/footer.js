import {
  Text,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Link,
  Divider,
  Flex,
} from "@chakra-ui/react";

import { useMemo } from "react";

export default function Footer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const SOURCE_LINKS = useMemo(
    () => [
      {
        title: "Kasus, kematian, rawatan, kesembuhan:",
        link: "https://github.com/Reynadi531/api-covid19-indonesia-v2",
        linkText: "API dari Reynadi, sumber dari pemerintah Indonesia",
      },
      {
        title: "Vaksinasi:",
        link: "https://vaksincovid19-api.vercel.app/api/",
        linkText: "Web Scraping API dari website Kemenkes oleh Reynadi",
      },
      {
        title: "Data provinsi:",
        link: "https://github.com/Reynadi531/api-covid19-indonesia-v2",
        linkText: "API dari Reynadi, sumber dari pemerintah Indonesia",
      },
    ],
    []
  );

  return (
    <>
      <Flex
        mt={8}
        py={5}
        width="full"
        borderTopColor="gray.200"
        borderTopWidth="1px"
        justify="space-between"
        fontSize={["sm", "md"]}
      >
        <Flex wrap="wrap" color="gray.500">
          <Text>Designed & created by </Text>
          <Link
            target="_blank"
            rel="noreferrer"
            ml={[0, 1]}
            href="https://vincenth19.com"
          >
            <strong>Vincent Haryadi</strong>
          </Link>
        </Flex>
        <Flex>
          <Button
            onClick={onOpen}
            colorScheme="red"
            variant="link"
            fontSize={["sm", "md"]}
          >
            Sumber Data
          </Button>
        </Flex>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sumber Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="left">
              {SOURCE_LINKS.map((data) => {
                return (
                  <>
                    <Text color="gray.500">{data.title}</Text>
                    <Link href={data.link} color="blue.500" isExternal>
                      {data.linkText}
                    </Link>
                    <Divider />
                  </>
                );
              })}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              variant="outline"
            >
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
