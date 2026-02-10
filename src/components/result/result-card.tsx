import React from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Badge,
    Image,
    Button,
    Link,
    Stack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import { ExternalLink, Calendar, FileText, Trophy, BarChart } from "lucide-react";
import { ExamResult } from "../../types/exam-updates";

const ResultCard: React.FC<{
    data: ExamResult;
}> = ({ data }) => {
    return (
        <Box
            borderBottom="1px solid #5d93fe"
            borderRadius="lg"
            p={6}
            bg="white"
            transition="all 0.2s ease"
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
                            src={data.logo || "/placeholder-logo.png"}
                            alt={`${data.organizationName} logo`}
                            boxSize="48px"
                            objectFit="contain"
                            borderRadius="md"
                        />
                        <Box>
                            <Heading
                                fontSize={{ base: "md", lg: "lg" }}
                                lineHeight="normal"
                                mb={1}
                            >
                                {data.title}
                            </Heading>
                            <Text fontSize="sm" color="gray.500">
                                {data.organizationName}
                            </Text>
                        </Box>
                    </Flex>
                    <Badge colorScheme="green" alignSelf="flex-start">
                        Result Out
                    </Badge>
                </Flex>

                <Flex gap={4} mb={4} fontSize="sm" color="gray.600" wrap="wrap">
                    <Flex align="center" gap={1}>
                        <Calendar size={14} /> Exam: {data.examDate}
                    </Flex>
                    <Flex align="center" gap={1}>
                        <Calendar size={14} /> Result: {data.resultDate}
                    </Flex>
                </Flex>

                <Stack gap={2} mb={4}>
                    <Wrap gap={2}>
                        {data.meritListUrl && (
                            <WrapItem>
                                <Link href={data.meritListUrl} target="_blank" style={{ textDecoration: 'none' }}>
                                    <Button size="sm" colorScheme="teal" variant="solid">
                                        <Trophy size={14} /> Merit List
                                    </Button>
                                </Link>
                            </WrapItem>
                        )}
                        {data.cutOffUrl && (
                            <WrapItem>
                                <Link href={data.cutOffUrl} target="_blank" style={{ textDecoration: 'none' }}>
                                    <Button size="sm" colorScheme="orange" variant="outline">
                                        <BarChart size={14} /> Cut-off Marks
                                    </Button>
                                </Link>
                            </WrapItem>
                        )}
                        {data.scoreCardUrl && (
                            <WrapItem>
                                <Link href={data.scoreCardUrl} target="_blank" style={{ textDecoration: 'none' }}>
                                    <Button size="sm" colorScheme="purple" variant="outline">
                                        <FileText size={14} /> Score Card
                                    </Button>
                                </Link>
                            </WrapItem>
                        )}
                    </Wrap>
                </Stack>
            </Box>

            <Box mt="auto">
                <Flex
                    gap={2}
                    justifyContent={{ base: "space-between", md: "flex-start" }}
                    flexWrap="wrap"
                >
                    {data.officialSiteUrl && (
                        <Link href={data.officialSiteUrl} target="_blank">
                            <Button
                                p={2}
                                size="sm"
                                variant="ghost"
                                _hover={{ color: "#5d93fe", bg: "blue.50" }}
                            >
                                <ExternalLink size={14} /> Official Site
                            </Button>
                        </Link>
                    )}
                </Flex>
            </Box>
        </Box>
    );
};

export default ResultCard;
