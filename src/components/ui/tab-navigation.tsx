"use client";
import { Tabs } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FullScreenLoader from "../FullScreenLoader";

type TabKey = "jobs" | "admit" | "result" | "ansKey";

const routeToTab: Record<string, TabKey> = {
  "/": "jobs",
  "/admit-card": "admit",
  "/result": "result",
  "/ans-key": "ansKey",
};

const tabToRoute: Record<TabKey, string> = {
  jobs: "/",
  admit: "/admit-card",
  result: "/result",
  ansKey: "/ans-key",
};

export const TabsNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>();

  useEffect(() => {
    const currentTab = routeToTab[pathname];
    setActiveTab(currentTab);
    setLoading(false);
  }, [pathname]);

  const handleTabChange = (details: { value: string }) => {
    setLoading(true);
    const tabKey = details.value as TabKey;
    const route = tabToRoute[tabKey];
    if (route) {
      router.push(route);
    }
  };

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={handleTabChange}
      variant="plain"
      position={"relative"}
    >
      {loading && <FullScreenLoader />}
      <Tabs.List
        bg="gray.100"
        rounded="lg"
        p="1"
        w={"full"}
        gap={2.5}
        justifyContent={{ base: "space-between", md: "flex-start" }}
      >
        <Tabs.Trigger
          value="jobs"
          px="4"
          py="2"
          rounded="md"
          fontWeight="medium"
          transition="all 0.2s"
          _hover={{
            bg: "blue.50",
            color: "blue.600",
          }}
          _selected={{
            color: "white",
            bg: "#5d93fe",
          }}
        >
          Jobs
        </Tabs.Trigger>
        <Tabs.Trigger
          value="admit"
          px="4"
          py="2"
          rounded="md"
          fontWeight="medium"
          transition="all 0.2s"
          boxSizing={"border-box"}
          _hover={{
            bg: "blue.50",
            color: "blue.600",
          }}
          _selected={{
            color: "white",
            bg: "#5d93fe",
          }}
        >
          Admit Card
        </Tabs.Trigger>
        <Tabs.Trigger
          value="result"
          px="4"
          py="2"
          rounded="md"
          fontWeight="medium"
          transition="all 0.2s"
          boxSizing={"border-box"}
          _hover={{
            bg: "blue.50",
            color: "blue.600",
          }}
          _selected={{
            color: "white",
            bg: "#5d93fe",
          }}
        >
          Result
        </Tabs.Trigger>
        <Tabs.Trigger
          value="ansKey"
          px="4"
          py="2"
          rounded="md"
          fontWeight="medium"
          transition="all 0.2s"
          boxSizing={"border-box"}
          _hover={{
            bg: "blue.50",
            color: "blue.600",
          }}
          _selected={{
            color: "white",
            bg: "#5d93fe",
          }}
        >
          Ans Key
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
};
