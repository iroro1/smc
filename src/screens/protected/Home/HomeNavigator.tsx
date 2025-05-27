import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../HomeScreen";
import { RestaurantMenu } from "./Restaurantmenu";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AddCircle } from "iconsax-react-native";
import { colors } from "../../../utils/colors";

const HomeStack = createNativeStackNavigator();

export const HomeNavigator = () => {
  return (
    <View style={styles.container}>
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="RestaurantMenu" component={RestaurantMenu} />
      </HomeStack.Navigator>

      {/* Floating plus button */}
      <TouchableOpacity style={styles.fab}>
        <AddCircle size={24} color={colors.white} variant="Bold" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: "40%",
    right: 16,
    backgroundColor: colors.black,
    width: 56,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderTopLeftRadius: 120,
    borderBottomLeftRadius: 120,
    zIndex: 1000,
  },
});
