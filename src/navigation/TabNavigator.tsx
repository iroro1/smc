import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "../screens/protected/HomeScreen";
import { MenuScannerScreen } from "../screens/protected/MenuScannerScreen";
import { OrderScreen } from "../screens/protected/OrderScreen";
import { AccountScreen } from "../screens/protected/AccountScreen";
import { colors } from "../utils/colors";
import { Home2, Cake } from "iconsax-react-native";
import { DininingIcon, OrdersIcon } from "../utils/Icons";
import { HomeNavigator } from "../screens/protected/Home/HomeNavigator";

type TabParamList = {
  Home: undefined;
  "Menu Scanner": undefined;
  "Dinining Options": undefined;
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
          // paddingTop: 8,
          height: 80,
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
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Home2 variant="Bold" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Dinining Options"
        component={MenuScannerScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <DininingIcon w={size} h={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <OrdersIcon w={size} h={size} color={color} active={true} />
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
