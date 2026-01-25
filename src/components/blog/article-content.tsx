import React from "react";
import {
  Box,
  Heading,
  Text,
  Table,
  List,
  Accordion,
  Span,
  Alert,
  VStack,
  HStack,
  Circle,
} from "@chakra-ui/react";

export interface ContentItem {
  id: string | number;
  type:
    | "paragraph"
    | "heading"
    | "table"
    | "list"
    | "faq"
    | "note"
    | "tips"
    | "process";
  text?: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  headers?: string[];
  rows?: string[][];
  listType?: "ordered" | "unordered";
  items?: string[] | { question: string; answer: string }[];
  noteType?: "info" | "warning" | "success" | "error";
  steps?: { number: number; title: string; description: string }[];
}

export interface Section {
  id?: number;
  type?: string;
  title: string;
  content: ContentItem[];
}

export interface ArticleContentProps {
  sections: Section[];
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ sections }) => {
  const bgColor = "white";
  const textColor = "gray.700";
  const headingColor = "gray.800";
  const borderColor = "gray.200";

  const renderContent = (contentItem: ContentItem) => {
    const itemId = String(contentItem.id);

    switch (contentItem.type) {
      case "paragraph":
        return (
          <Text
            key={itemId}
            // mb={4}
            lineHeight="tall"
            color={textColor}
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            whiteSpace="pre-wrap"
          >
            {contentItem.text}
          </Text>
        );

      case "heading":
        const headingLevel = contentItem.level || "h2";

        return (
          <Heading
            key={itemId}
            as={headingLevel}
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            color={headingColor}
            // mb={0}
            // mt={headingLevel === 'h2' ? 8 : 6}
            fontWeight="semibold"
            id={contentItem.text
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "")}
          >
            {contentItem.text}
          </Heading>
        );

      case "table":
        if (!contentItem.headers && !contentItem.rows) {
          return null;
        }

        return (
          <Box overflowX="auto" w="full">
            <Box minW="250px">
              <Table.Root
                variant={"outline"}
                bg={bgColor}
                shadow="sm"
                borderRadius="md"
                border="1px"
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                borderColor={borderColor}
                size="sm"
              >
                {contentItem.headers && contentItem.headers.length > 0 && (
                  <Table.Header bg={"blue.50"}>
                    <Table.Row>
                      {contentItem.headers.map((header, idx) => (
                        <Table.Cell
                          key={idx}
                          color={"blue.700"}
                          fontWeight="semibold"
                          py={4}
                          fontSize="inherit"
                          whiteSpace="pre-wrap"
                        >
                          {header}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  </Table.Header>
                )}
                <Table.Body>
                  {contentItem.rows?.map((row, rowIdx) => (
                    <Table.Row
                      key={rowIdx}
                      bg={rowIdx % 2 === 0 ? "gray.50" : bgColor}
                    >
                      {row.map((cell, cellIdx) => (
                        <Table.Cell key={cellIdx} py={3} fontSize="inherit">
                          {cell}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          </Box>
        );

      case "list":
        if (!contentItem.items || !Array.isArray(contentItem.items)) {
          return null;
        }

        const ListComponent = contentItem.listType === "ordered" ? "ol" : "ul";
        return (
          <Box
            key={itemId}
            // mb={6}
            // pt={4}
            // pb={4}
            pl={4}
            // bg={'teal.50'}
            borderRadius="md"
            // borderLeft="4px solid"
            // borderColor="teal.400"
          >
            <List.Root as={ListComponent} gap={2} pl={4}>
              {(contentItem.items as string[]).map((item, idx) => (
                <List.Item
                  key={idx}
                  as={"p"}
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  whiteSpace="pre-wrap"
                  color={textColor}
                >
                  {item}
                </List.Item>
              ))}
            </List.Root>
          </Box>
        );

      case "faq":
        if (!contentItem.items || !Array.isArray(contentItem.items)) {
          return null;
        }

        return (
          <Box key={itemId} as="section" aria-labelledby="faq-heading">
            <Accordion.Root>
              {(
                contentItem.items as { question: string; answer: string }[]
              ).map((faq, idx) => (
                <Accordion.Item
                  key={idx}
                  value={`faq-${idx}`}
                  border="1px"
                  borderColor={borderColor}
                  borderRadius="md"
                  mb={3}
                  as="article"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <Heading
                    as="h3"
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  >
                    <Accordion.ItemTrigger
                      bg={"blue.50"}
                      px={4}
                      py={3}
                      _hover={{ bg: "blue.200" }}
                      _expanded={{ bg: "blue.100" }}
                      borderRadius="md"
                      itemProp="name"
                    >
                      <Span flex="1" fontWeight="semibold" color={"blue.700"}>
                        {faq.question}
                      </Span>
                      <Accordion.ItemIndicator color={"blue.600"} />
                    </Accordion.ItemTrigger>
                  </Heading>

                  <Accordion.ItemContent
                    bg={bgColor}
                    color={textColor}
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                  >
                    <Accordion.ItemBody px={4} py={3}>
                      <Text whiteSpace="pre-wrap" itemProp="text">
                        {faq.answer}
                      </Text>
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Box>
        );

      case "note":
        const noteProps = {
          info: { status: "info" as const },
          warning: { status: "warning" as const },
          success: { status: "success" as const },
          error: { status: "error" as const },
        };
        const noteConfig = noteProps[contentItem.noteType || "info"];

        return (
          <Alert.Root
            key={itemId}
            status={noteConfig.status}
            // mb={6}
            borderRadius="md"
          >
            <Alert.Indicator />
            <Box>
              <Alert.Title
                as={"h3"}
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
              >
                {(contentItem.noteType || "info").charAt(0).toUpperCase() +
                  (contentItem.noteType || "info").slice(1)}{" "}
                Note:
              </Alert.Title>
              <Alert.Description
                as={"p"}
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
              >
                {contentItem.text}
              </Alert.Description>
            </Box>
          </Alert.Root>
        );

      case "tips":
        if (!contentItem.items || !Array.isArray(contentItem.items)) {
          return null;
        }

        return (
          <Alert.Root
            key={itemId}
            status="warning"
            // mb={6}
            borderRadius="md"
            flexDirection="column"
            alignItems="flex-start"
            p={4}
          >
            <HStack mb={3}>
              <Alert.Indicator />
              <Alert.Title>Important Tips:</Alert.Title>
            </HStack>
            <VStack align="stretch" gap={2} w="full">
              {(contentItem.items as string[]).map((item, idx) => (
                <HStack key={idx} align="flex-start">
                  <Circle size="6px" bg="orange.400" mt={2} flexShrink={0} />
                  <Text
                    as="p"
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    color={textColor}
                  >
                    {item}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Alert.Root>
        );

      case "process":
        if (!contentItem.steps || !Array.isArray(contentItem.steps)) {
          return null;
        }

        return (
          <VStack key={itemId} gap={4} align="stretch">
            {contentItem.steps.map((step, idx) => (
              <HStack
                key={idx}
                align="flex-start"
                p={2}
                // bg={'gray.50'}
                borderRadius="md"
                gap={4}
              >
                <Circle
                  size="40px"
                  bg="#5d93fe"
                  border={"5px solid"}
                  borderColor={"#DEE9FF"}
                  color="white"
                  fontWeight="bold"
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  flexShrink={0}
                >
                  {step.number}
                </Circle>
                <Box flex={1}>
                  <Heading
                    as="h4"
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    mb={2}
                    color={headingColor}
                  >
                    {step.title}
                  </Heading>
                  <Text
                    as={"p"}
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    color={textColor}
                    whiteSpace="pre-wrap"
                  >
                    {step.description}
                  </Text>
                </Box>
              </HStack>
            ))}
          </VStack>
        );

      default:
        return null;
    }
  };

  if (!sections || sections.length === 0) {
    return (
      <Box
        as="main"
        maxW="full"
        mx="auto"
        py={4}
        role="main"
        itemScope
        itemType="https://schema.org/Article"
      >
        <Text color={textColor}>No content available.</Text>
      </Box>
    );
  }

  return (
    <Box
      as="main"
      maxW="full"
      mx="auto"
      py={4}
      p={{ sm: 2, md: 0 }}
      role="main"
      itemScope
      itemType="https://schema.org/Article"
    >
      <Box display="flex" flexDirection="column" gap={6}>
        {sections.map((section, sectionIdx) => {
          const sectionId = section.id || sectionIdx;

          return (
            <Box
              key={sectionId}
              mb={6}
              as="section"
              itemScope
              itemType="https://schema.org/Article"
            >
              <Heading
                as="h2"
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                fontWeight="bold"
                color={headingColor}
                mb={6}
                pb={{ base: 1, md: 2 }}
                borderBottom="2px solid"
                borderColor="#5d93fe"
                id={section.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^\w-]/g, "")}
                scrollMargin={"100px"}
                scrollBehavior={"auto"}
              >
                {section.title}
              </Heading>
              <VStack align="stretch" gap={4}>
                {section.content?.map((contentItem) =>
                  renderContent(contentItem)
                )}
              </VStack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ArticleContent;
