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
    Accordion,
    VStack,
} from "@chakra-ui/react";
import { ExternalLink, Calendar, Download } from "lucide-react";
import { AnswerKey } from "../../types/exam-updates";

const AnswerKeyCard: React.FC<{
    data: AnswerKey;
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
                    <Badge colorScheme="blue" alignSelf="flex-start">
                        {data.shifts.length} Shifts
                    </Badge>
                </Flex>

                <Flex gap={4} mb={4} fontSize="sm" color="gray.600" wrap="wrap">
                    <Flex align="center" gap={1}>
                        <Calendar size={14} /> Exam: {data.examDate}
                    </Flex>
                    <Flex align="center" gap={1}>
                        <Calendar size={14} /> Released: {data.releaseDate}
                    </Flex>
                </Flex>

                <Accordion.Root collapsible mb={4} variant="plain">
                    <Accordion.Item value="shifts" border="none">
                        <Accordion.ItemTrigger px={0} _hover={{ bg: "none" }} cursor="pointer">
                            <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="sm">
                                View Paper/Shift Wise Keys
                            </Box>
                            {/* <Accordion.ItemIndicator /> */}
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent pb={4} px={0}>
                            <VStack align="stretch" gap={2}>
                                {data.shifts.map((shift) => (
                                    <Flex
                                        key={shift.id}
                                        justify="space-between"
                                        align="center"
                                        p={2}
                                        bg="gray.50"
                                        borderRadius="md"
                                        fontSize="sm"
                                    >
                                        <Box>
                                            <Text fontWeight="medium">{shift.label}</Text>
                                            {shift.date && <Text fontSize="xs" color="gray.500">{shift.date}</Text>}
                                        </Box>
                                        <Link href={shift.downloadUrl} target="_blank">
                                            <Button size="xs" colorScheme="blue">
                                                <Download size={12} /> Download
                                            </Button>
                                        </Link>
                                    </Flex>
                                ))}
                            </VStack>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                </Accordion.Root>

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
                                variant="outline"
                                _hover={{ color: "#5d93fe" }}
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

export default AnswerKeyCard;
