import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { RootNavigation } from "./src/navigation/RootNavigation";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import { PortalProvider } from "@gorhom/portal";
import Toast from "react-native-toast-message";

export default function App() {
  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.log("Error checking for updates:", error);
      }
    }

    checkForUpdates();
  }, []);

  return (
    <Provider store={store}>
      <PortalProvider>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <RootNavigation />
            <Toast />
            <StatusBar
              style="auto"
              animated={true}
              hideTransitionAnimation="fade"
            />
          </View>
        </NavigationContainer>
      </PortalProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
