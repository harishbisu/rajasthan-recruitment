import BlogList from "@/components/blog/blog-list";
import { Box } from "@chakra-ui/react";

export default function Blogs() {
    return (
        <Box p={{ sm: 2, md: 4 }}>
            <BlogList />
        </Box>
    );
}