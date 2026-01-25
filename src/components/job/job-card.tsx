import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Link,
} from "@chakra-ui/react";
import { Users, Briefcase, ExternalLink } from "lucide-react";
import { Job } from "@/lib/api/types";
const JobCard: React.FC<{
  job: Job;
}> = ({ job }) => {
  return (
    <Box
      borderBottom="1px solid #5d93fe"
      borderRadius="lg"
      p={6}
      bg="white"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "inset 0 -2px 0 0 #5d93fe",
      }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width="100%"
      h={"full"}
    >
      <Box>
        <Flex justify="space-between" mb={4} wrap="wrap">
          <Flex gap={4}>
            <Image
              src={job.logo}
              alt={`${job.title} logo`}
              boxSize="48px"
              objectFit="cover"
              borderRadius="md"
            />
            <Box>
              <Heading
                fontSize={{ base: "md", lg: "lg" }}
                lineHeight="normal"
                mb={1}
              >
                {job.title}
              </Heading>
              <Flex gap={4} mt={1} fontSize="sm" color="gray.500">
                <Flex align="center" gap={1}>
                  <Users size={16} /> {job.posts}
                </Flex>
                <Flex align="center" gap={1}>
                  <Briefcase size={16} /> {job.level}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Stack mb={4}>
          {job.registrationStartDate && (
            <Text fontSize="sm">
              <b>Registration Start Date:</b> {job.registrationStartDate}
            </Text>
          )}
          {job.registrationEndDate && (
            <Text fontSize="sm">
              <b>Registration Close Date:</b> {job.registrationEndDate}
            </Text>
          )}
          {job.examDate && (
            <Text fontSize="sm">
              <b>Exam Date:</b> {job.examDate}
            </Text>
          )}
          {job.posts && (
            <Text fontSize="sm">
              <b>Posts:</b> {job.posts}
            </Text>
          )}
        </Stack>
      </Box>

      <Box mt="auto">
        <Flex
          gap={2}
          justifyContent={{ base: "space-between", md: "flex-start" }}
          flexWrap="wrap"
        >
          {job.slug && (
            <Link
              href={`https://rajasthanrecruitment.in/blog/${job.slug}`}
              target="_blank"
            >
              <Button
                p={2}
                size="sm"
                colorScheme="blue"
                transition="all 0.5s"
                _hover={{ bg: "#5d93fe" }}
              >
                View Details
              </Button>
            </Link>
          )}
          {job.officialSiteUrl && (
            <Link href={job.officialSiteUrl} target="_blank">
              <Button
                p={2}
                size="sm"
                variant="outline"
                _hover={{ color: "#5d93fe" }}
              >
                Official Site{" "}
                <ExternalLink size={14} style={{ marginLeft: "8px" }} />
              </Button>
            </Link>
          )}
        </Flex>
      </Box>
    </Box>
  );
};
export default JobCard;
