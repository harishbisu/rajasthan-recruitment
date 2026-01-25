"use client";

import { Flex, Icon } from "@chakra-ui/react";
import { FiPlay } from "react-icons/fi";

export default function PlayOverlay() {
  return (
    <Flex
      opacity={0.9}
      justifyContent="center"
      alignContent="center"
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      bg="rgba(222, 233, 255, 0.95)"
      borderRadius="full"
      p={3}
      color="#5d93fe"
      border={"2px solid #5d93fe"}
    >
      <Icon as={FiPlay} boxSize={6} ml={0.5} />
    </Flex>
  );
}
