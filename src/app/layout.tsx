import type { Metadata } from "next";
import { ChakraUIProvider } from "@/lib/providers/chakra-provider";
import { Navbar } from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Box } from "@chakra-ui/react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Rajasthan Recruitment",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Rajasthan Recruitment",
    description: "Your portal for Rajasthan government jobs.",
    url: "https://rajasthanrecruitment.in",
    siteName: "Rajasthan Recruitment",
    images: [
      {
        url: "https://rajasthanrecruitment.in/logo.png",
        width: 1200,
        height: 630,
        alt: "Rajasthan Recruitment Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajasthan Recruitment",
    description: "Latest government jobs in Rajasthan.",
    images: ["https://rajasthanrecruitment.in/logo.png"],
  },
  description:
    "Stay updated with the latest Rajasthan government job vacancies, exam results, admit cards, and answer keys. Your one-stop portal for accurate and timely recruitment updates across Rajasthan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <Script id="fast-load-trick" strategy="afterInteractive">
          {`
            // Connection prewarming for likely next routes
            const prewarm = (url) => {
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.href = url;
              document.head.appendChild(link);
            };
            
            // Prefetch key pages on idle
            if (window.requestIdleCallback) {
              requestIdleCallback(() => {
                ['/admit-card', '/result', '/ans-key'].forEach(prewarm);
              });
            }
          `}
        </Script>
        <Script id="organization-logo" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Rajasthan Recruitment",
            url: "https://rajasthanrecruitment.in",
            logo: "https://rajasthanrecruitment.in/logo.png",
          })}
        </Script>
        <meta
          name="google-adsense-account"
          content="ca-pub-3383607348636418"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3383607348636418"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <ChakraUIProvider>
          <Box w="full" display="flex" justifyContent="center">
            <Box
              maxW="1600px"
              w="full"
              minH="100vh"
              display="flex"
              flexDirection="column"
              boxShadow="0px 8px 1000px #DEE9FF"
            >
              <Box
                flex="1"
                bg="white"
                borderX={{ lg: "1px solid #e0e0e0" }}
              >
                <Navbar />
                {children}
              </Box>
              <Footer />
            </Box>
          </Box>
        </ChakraUIProvider>
      </body>
    </html>
  );
}
