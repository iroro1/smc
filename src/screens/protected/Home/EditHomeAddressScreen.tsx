import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { LocationDiscover, SearchNormal } from "iconsax-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AppBackButton } from "../../../components/AppBackButton";
import { AppButton } from "../../../components/AppButton";
import { useLocation } from "../../../hooks/useLocation";
import { colors } from "../../../utils/colors";

export default function EditHomeAddressScreen({ route }: { route: any }) {
  const navigation = useNavigation();
  const { id, isAdd } = route.params;
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 6.5244,
    longitude: 3.3792,
  });
  const [locationPermission, setLocationPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable location permissions to use the map feature.",
          [{ text: "OK" }]
        );
        return;
      }
      setLocationPermission(true);

      let location = await Location.getCurrentPositionAsync({});
      setMarkerPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const initialRegion = {
    latitude: markerPosition.latitude,
    longitude: markerPosition.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const onMarkerDragEnd = (e: any) => {
    setMarkerPosition(e.nativeEvent.coordinate);
  };

  const { location, error } = useLocation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
          }}
        >
          <View style={styles.header}>
            <AppBackButton variant={2} />
            <Text style={styles.title}>
              {isAdd ? "Add an Address" : "Edit Address"}
            </Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={locationPermission}
                showsMyLocationButton={locationPermission}
              >
                <Marker
                  coordinate={markerPosition}
                  draggable
                  onDragEnd={onMarkerDragEnd}
                />
              </MapView>
            </View>
            <View style={styles.addressContainer}>
              <View style={styles.addressHeader} />
              <View style={styles.selectedAddressContainer}>
                <SearchNormal size={24} color={colors.lightGray} />
                <TextInput
                  style={styles.addressInput}
                  placeholder="Search for an address"
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.selectedAddressContainer,
                  {
                    backgroundColor: "#E5F3ED",
                    borderWidth: 1,
                    borderColor: "#AAD8C4",
                    marginTop: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    gap: 16,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
                onPress={() => {
                  setMarkerPosition({
                    latitude: location?.coords.latitude || 6.5244,
                    longitude: location?.coords.longitude || 3.3792,
                  });
                }}
              >
                <LocationDiscover size={20} color={colors.seaGreen} />
                <Text style={styles.currentLocationText}>
                  {" "}
                  Use current location
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#EAECF0",
                  marginVertical: 16,
                }}
              />
            </View>
          </KeyboardAvoidingView>
          <AppButton
            title={isAdd ? "Confirm address" : "Confirm address"}
            onPress={() => {}}
            style={{ marginHorizontal: 16, marginBottom: 16 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 24,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.black,
    marginLeft: 16,
  },
  mapContainer: {
    height: "70%",
    width: "100%",
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  addressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    height: "25%",
  },
  addressHeader: {
    alignSelf: "center",
    backgroundColor: "#D0D5DD",
    borderRadius: 16,
    height: 4,
    width: 64,
    marginTop: 16,
    marginBottom: 32,
  },
  selectedAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderRadius: 120,
    gap: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    height: 44,
  },
  addressInput: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.black,
  },
  currentLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 120,
    height: 44,
    width: 44,
  },
  currentLocationText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.seaGreen,
  },
});
