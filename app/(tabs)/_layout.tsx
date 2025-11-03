import { Tabs } from "expo-router";
import {
  NativeTabs,
  Icon,
  Label,
  Badge,
} from "expo-router/unstable-native-tabs";
import React from "react";
import { Platform } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { SFSymbol } from "expo-symbols";

type TabConfig = {
  name: string;
  label: string;
  sfIcon: SFSymbol;
  featherIcon: string;
  badge?: string;
};

const TAB_CONFIG: TabConfig[] = [
  {
    name: "index",
    label: "Home",
    sfIcon: "house.fill",
    featherIcon: "home",
  },
  {
    name: "explore",
    label: "Explore",
    sfIcon: "location.fill",
    featherIcon: "navigation",
  },
  {
    name: "chats",
    label: "Messages",
    sfIcon: "message.fill",
    featherIcon: "message-circle",
    badge: "4+",
  },
  {
    name: "profile",
    label: "Profile",
    sfIcon: "person.crop.circle.fill",
    featherIcon: "user",
  },
];

const COLORS = {
  active: "#06BCEE",
  inactive: "#666",
} as const;

function IOSTabBar() {
  return (
    <NativeTabs>
      {TAB_CONFIG.map((tab) => (
        <NativeTabs.Trigger key={tab.name} name={tab.name}>
          <Label>{tab.label}</Label>
          <Icon sf={tab.sfIcon} />
          {tab.badge && <Badge>{tab.badge}</Badge>}
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}

function DefaultTabBar() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color }) => (
              <Feather name={tab.featherIcon as any} size={24} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

export default function TabLayout() {
  return Platform.OS === "ios" ? <IOSTabBar /> : <DefaultTabBar />;
}
