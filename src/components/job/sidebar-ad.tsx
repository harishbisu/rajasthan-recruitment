import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { GoogleAd } from "../ui/google-ad";

const SidebarAd: React.FC = () => (
  <Box
    minW="120px"
    maxW="254px"
    display={{ base: "none", md: "block" }}
    position="relative"
  >
    <Box
      height={"fit-content"}
      position={"sticky"}
      width={"full"}
      zIndex={2}
      top={"150px"}
    >
      <GoogleAd type="sidebar" slot="7891680227" />
      <Image
        mt={4}
        borderRadius="md"
        zIndex={2}
        alt="Advertisement"
        src="/rr_adv.png"
      />
    </Box>
  </Box>
);

export default SidebarAd;
