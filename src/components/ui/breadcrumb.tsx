import { Box, Flex, Text } from "@chakra-ui/react";
import LinkWithLoader from "@/components/LinkWithLoader";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  maxW?: string;
  className?: string;
}

export function Breadcrumb({
  items,
  maxW = "6xl",
  className,
}: BreadcrumbProps) {
  const textSecondary = "gray.600";
  const textMain = "gray.900";

  return (
    <Box as="nav" aria-label="Breadcrumb" className={className}>
      <Box maxW={maxW} mx="auto" py={1}>
        <Flex
          as="ol"
          align="center"
          gap={2}
          fontSize="sm"
          color={textSecondary}
          wrap="wrap"
        >
          {items.map((item, index) => (
            <Flex key={index} align="center" gap={2}>
              <Box as="li">
                {item.href ? (
                  <LinkWithLoader href={item.href}>
                    <Text _hover={{ color: "blue.600" }}>{item.label}</Text>
                  </LinkWithLoader>
                ) : (
                  <Text
                    color={
                      index === items.length - 1 ? textMain : textSecondary
                    }
                    fontWeight={
                      index === items.length - 1 ? "medium" : "normal"
                    }
                    maxW={{ base: "100px", md: "150px", lg: "auto" }}
                    truncate={index === items.length - 1}
                  >
                    {item.label}
                  </Text>
                )}
              </Box>
              {index < items.length - 1 && <Text color={textSecondary}>/</Text>}
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
