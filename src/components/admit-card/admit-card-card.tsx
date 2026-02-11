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
} from "@chakra-ui/react";
import { ExternalLink, Calendar, Download, Info } from "lucide-react";
import { AdmitCard } from "../../types/exam-updates";

const AdmitCardCard: React.FC<{
    data: AdmitCard;
}> = ({ data }) => {
    return (
        <Box
            id={data.slug}
            className={data.slug ? "highlight-target" : ""}
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
                    <Badge colorScheme="purple" alignSelf="flex-start">
                        Admit Card Out
                    </Badge>
                </Flex>

                <Flex gap={4} mb={4} fontSize="sm" color="gray.600" wrap="wrap">
                    <Flex align="center" gap={1}>
                        <Calendar size={14} /> Exam: {data.examDate}
                    </Flex>
                </Flex>

                <Stack direction="row" gap={3} mb={4}>
                    <Link href={data.downloadUrl} target="_blank" style={{ textDecoration: 'none', flex: 1 }}>
                        <Button width="full" colorScheme="blue">
                            <Download size={16} /> Download Admit Card
                        </Button>
                    </Link>
                    {data.noticeUrl && (
                        <Link href={data.noticeUrl} target="_blank" style={{ textDecoration: 'none' }}>
                            <Button variant="outline" colorScheme="gray">
                                <Info size={16} /> Notice
                            </Button>
                        </Link>
                    )}
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

export default AdmitCardCard;
