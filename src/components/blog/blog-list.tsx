import { Box, SimpleGrid, Text, Image, Heading } from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import LinkWithLoader from "../LinkWithLoader";
import { getAllBlogList } from "@/lib/api/blog";
import BlogCard from "./blog-card";

const BlogList: React.FC = async () => {
  const blogData = await getAllBlogList();
  return (
    <>
      <Heading
        mt={6}
        as={"h1"}
        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
        color={"#5d93fe"}
        pl={2}
        borderLeft={"4px solid #5d93fe"}
        borderRadius={"md"}
      >
        Career & Education Updates
      </Heading>
      <Box
        w={"full"}
        display={"flex"}
        flexDirection={{ base: "column", lg: "row" }}
        gap={6}
        position={"relative"}
        py={8}
        px={0}
        mb={16}
        gapX={2}
      >
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          templateRows="auto"
          gap={4}
        >
          {blogData.map((blog, index) => (
            <Box
              key={`${blog.id}_${index}`}
              gridColumn={{
                base: "span 1",
                md: blog.isLarge ? "span 2" : "span 1",
                lg: blog.isLarge ? "span 2" : "span 1",
              }}
            >
              <LinkWithLoader href={`/blog/${blog.slug}`}>
                <BlogCard {...blog} />
              </LinkWithLoader>
            </Box>
          ))}
        </SimpleGrid>
        <Box
          maxW={"250px"}
          minW={"100px"}
          display={{ base: "none", md: "block" }}
          position={"relative"}
        >
          <Image
            alt="Advertisement"
            borderRadius={"md"}
            zIndex={2}
            position={{ base: "relative", md: "sticky", lg: "sticky" }}
            top={{ base: "auto", md: "102px" }}
            src="/rr_adv.png"
          ></Image>
        </Box>
        <Box
          position={"absolute"}
          w={"full"}
          display={"flex"}
          justifyContent={"center"}
          bottom={-12}
        >
          <Box
            border={"5px solid #DEE9FF"}
            borderRadius={"25px"}
            bg={"#5d93fe"}
            _hover={{
              cursor: "pointer",
            }}
          >
            <LinkWithLoader href="/blog">
              <Box
                p={1}
                pl={3}
                pr={3}
                display={"flex"}
                fontWeight={"bold"}
                alignItems={"center"}
                gap={2}
              >
                <Text color={"white"}>Explore More Blogs</Text>
                <ChevronDownIcon strokeWidth={"3px"} size={20} color="#ffff" />
              </Box>
            </LinkWithLoader>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BlogList;
