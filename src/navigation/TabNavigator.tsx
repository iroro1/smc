import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "../screens/protected/HomeScreen";
import { MenuScannerScreen } from "../screens/protected/MenuScannerScreen";
import { OrderScreen } from "../screens/protected/OrderScreen";
import { AccountScreen } from "../screens/protected/AccountScreen";
import { colors } from "../utils/colors";
import { Home2, ScanBarcode } from "iconsax-react-native";

type TabParamList = {
  Home: undefined;
  "Menu Scanner": undefined;
  Orders: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.lightGray,
          paddingTop: 8,
          height: 100,
        },
        tabBarActiveTintColor: colors.seaGreen,
        tabBarInactiveTintColor: "#AAAAAA",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          paddingBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Home2 variant="Bold" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu Scanner"
        component={MenuScannerScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <ScanBarcode variant="Bold" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="document-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
