import { Portal } from "@gorhom/portal";
import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AddCircle, CloseCircle, DollarCircle } from "iconsax-react-native";
import React, { useState } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../../utils/colors";
import { HomeScreen } from "../HomeScreen";
import { MyDishes } from "./MyDishes";
import { RestaurantMenu } from "./Restaurantmenu";
import HomeAddress from "./HomeAddress";
import EditHomeAddressScreen from "./EditHomeAddressScreen";
import { DineOptions } from "./DineOptions";
import { SeatedPath } from "./SeatedPath";
import AwaitingPayment from "./AwaitingPayment";
import TakeoutPath from "./TakeoutPath";
import InTransitPath from "./InTransitPath";
import { MyDishesTwo } from "./MyDishesTwo";

const HomeStack = createNativeStackNavigator();

type RootStackParamList = {
  HomeScreen: undefined;
  RestaurantMenu: undefined;
  MyDishes: undefined;
  HomeAddress: undefined;
  EditHomeAddress: undefined;
  DineOrDeliver: undefined;
  SeatedPath: undefined;
  AwaitingPayment: undefined;
};

export const HomeNavigator = () => {
  const [fabOpen, setFabOpen] = useState(false);
  const fabAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleFabPress = () => {
    setFabOpen((open) => {
      Animated.timing(fabAnim, {
        toValue: open ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      return !open;
    });
  };
  const handleFabClose = () => {
    Animated.timing(fabAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setFabOpen(false));
  };
  const MessageIcon = () => {
    return (
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <Path
          d="M15 0.429688H5C2 0.429688 0 2.42969 0 5.42969V11.4297C0 14.4297 2 16.4297 5 16.4297V18.5597C5 19.3597 5.89 19.8397 6.55 19.3897L11 16.4297H15C18 16.4297 20 14.4297 20 11.4297V5.42969C20 2.42969 18 0.429688 15 0.429688ZM10 12.5997C9.58 12.5997 9.25 12.2597 9.25 11.8497C9.25 11.4397 9.58 11.0997 10 11.0997C10.42 11.0997 10.75 11.4397 10.75 11.8497C10.75 12.2597 10.42 12.5997 10 12.5997ZM11.26 8.44969C10.87 8.70969 10.75 8.87969 10.75 9.15969V9.36969C10.75 9.77969 10.41 10.1197 10 10.1197C9.59 10.1197 9.25 9.77969 9.25 9.36969V9.15969C9.25 7.99969 10.1 7.42969 10.42 7.20969C10.79 6.95969 10.91 6.78969 10.91 6.52969C10.91 6.02969 10.5 5.61969 10 5.61969C9.5 5.61969 9.09 6.02969 9.09 6.52969C9.09 6.93969 8.75 7.27969 8.34 7.27969C7.93 7.27969 7.59 6.93969 7.59 6.52969C7.59 5.19969 8.67 4.11969 10 4.11969C11.33 4.11969 12.41 5.19969 12.41 6.52969C12.41 7.66969 11.57 8.23969 11.26 8.44969Z"
          fill="white"
        />
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="RestaurantMenu" component={RestaurantMenu} />
        <HomeStack.Screen name="MyDishes" component={MyDishes} />
        <HomeStack.Screen name="MyDishesTwo" component={MyDishesTwo} />
        <HomeStack.Screen name="HomeAddress" component={HomeAddress} />
        <HomeStack.Screen
          name="EditHomeAddress"
          component={EditHomeAddressScreen}
        />
        <HomeStack.Screen name="DineOptions" component={DineOptions} />
        <HomeStack.Screen name="SeatedPath" component={SeatedPath} />
        <HomeStack.Screen name="AwaitingPayment" component={AwaitingPayment} />
        <HomeStack.Screen name="TakeoutPath" component={TakeoutPath} />
        <HomeStack.Screen name="InTransitPath" component={InTransitPath} />
      </HomeStack.Navigator>

      <Portal>
        <View style={styles.fabMenuContainer} pointerEvents="box-none">
          <Animated.View
            style={{
              opacity: fabAnim,
              transform: [
                {
                  translateY: fabAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [40, 0],
                  }),
                },
              ],
            }}
            pointerEvents={fabOpen ? "auto" : "none"}
          >
            <TouchableOpacity
              style={styles.fabAction}
              onPress={() => {
                handleFabClose();
                navigation.navigate("Main", {
                  screen: "Home",
                  params: { screen: "MyDishes" },
                });
              }}
            >
              <View style={styles.fabIconCircle}>
                <DollarCircle size={24} color={colors.white} variant="Bold" />
              </View>
              <Text style={styles.fabActionText}>Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabAction} onPress={() => {}}>
              <View style={styles.fabIconCircle}>
                <MessageIcon />
              </View>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
            {fabOpen ? (
              <CloseCircle size={24} color={colors.white} variant="Bold" />
            ) : (
              <AddCircle size={24} color={colors.white} variant="Bold" />
            )}
          </TouchableOpacity>
        </View>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabMenuContainer: {
    position: "absolute",
    right: 0,
    bottom: "40%",
    alignItems: "flex-end",
    zIndex: 9999,
    width: 200,
  },
  fab: {
    backgroundColor: colors.black,
    width: 56,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    borderTopLeftRadius: 120,
    borderBottomLeftRadius: 120,
    zIndex: 9999,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  fabAction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.black,
    borderTopLeftRadius: 120,
    borderBottomLeftRadius: 120,
    marginBottom: 12,
    paddingVertical: 10,
    paddingLeft: 18,
    paddingRight: 12,
    minWidth: 56,
    minHeight: 46,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  fabIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  fabActionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
