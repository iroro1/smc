import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateAccountScreen } from "../screens/auth/CreateAccountScreen";
import { ForgotPasswordScreen } from "../screens/auth/ForgotPasswordScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { OnboardingScreen } from "../screens/auth/OnboardingScreen";
import { ResetCodeScreen } from "../screens/auth/ResetCodeScreen";
import { SetNewPasswordScreen } from "../screens/auth/SetNewPasswordScreen";
import { VerifyCodeScreen } from "../screens/auth/VerifyCodeScreen";
import { TabNavigator } from "./TabNavigator";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ProfileScreen from "../screens/protected/Accounts/ProfileScreen";
import AditProfileScreen from "../screens/protected/Accounts/EditProfileScreen";
import EditPasswordScreen from "../screens/protected/Accounts/EditPasswordScreen";
import Address from "../screens/protected/Accounts/Address";
import EditAddressScreen from "../screens/protected/Accounts/EditAddressScreen";
import { OrderSummaryScreen } from "../screens/protected/Orders/OrderSummaryScreen";
import { Order } from "../screens/protected/Orders/OrderCard";
import { DineOrDeliverScreen } from "../screens/protected/Home/DineOrDeliverScreen";

type HomeStackParamList = {
  HomeScreen: undefined; // your main home screen
  RestaurantMenu: {
    // the nested screen with params
    externalDelivery?: boolean;
    mealId?: number;
  };
  // other home stack screens...
};
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  VerifyCode: undefined;
  ResetCode: undefined;
  SetNewPassword: undefined;
  Main: {
    screen: "Home";
    params?: HomeStackParamList;
  };
  Profile: undefined;
  EditProfile: undefined;
  EditPassword: undefined;
  Address: undefined;
  EditAddress: undefined;
  OrderSummary: { order: Order };
  DineOrDeliver: undefined;
  Restaurantmenu: { externalDelivery?: boolean; mealId?: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
          <Stack.Screen name="ResetCode" component={ResetCodeScreen} />
          <Stack.Screen
            name="SetNewPassword"
            component={SetNewPasswordScreen}
          />
        </>
      ) : (
        // Protected Stack
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={AditProfileScreen} />
          <Stack.Screen name="EditPassword" component={EditPasswordScreen} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="EditAddress" component={EditAddressScreen} />
          <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
          <Stack.Screen name="DineOrDeliver" component={DineOrDeliverScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
