import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/colors";
import { ArrowLeft, Add } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import AddressCard from "../../../components/AddressCard";
import { useState } from "react";

type RootStackParamList = {
  EditAddress: { id?: number; isAdd: boolean };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const mockAddresses = [
  {
    id: 1,
    title: "Pacer Labs Headquarters",
    address: "10, Hughes Street, Off Alapere Road, Yaba, Lagos.",
    selected: true,
  },
  {
    id: 2,
    title: "LaVida Residential Court",
    address: "17b, Okotie Drive, Ikoyi, Lagos.",
    selected: false,
  },
  {
    id: 3,
    title: "4, Cottage Drive, Lekki Phase 1, Lagos.",
    address: "4, Cottage Drive, Lekki Phase 1, Lagos.",
    selected: false,
  },
];

export default function Address() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [addresses, setAddresses] =
    useState<typeof mockAddresses>(mockAddresses);

  const handleEdit = (id: number) => {
    navigation.navigate("EditAddress", { id, isAdd: false });
  };

  const handleAdd = () => {
    navigation.navigate("EditAddress", { isAdd: true });
  };

  const handleDelete = (id: number) => {
    console.log("delete", id);
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          padding: 16,
          backgroundColor: colors.white,
          paddingTop: Constants.statusBarHeight + 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={colors.gray} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Addresses</Text>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, marginTop: 8 }}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {addresses.map((item) => (
          <AddressCard
            key={item.id}
            title={item.title}
            address={item.address}
            selected={item.selected}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
            onPress={() => {
              setAddresses(
                addresses.map((address) => ({
                  ...address,
                  selected: address.id === item.id,
                }))
              );
            }}
          />
        ))}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            borderRadius: 10,
            padding: 10,
            height: 50,
            width: "100%",
            gap: 8,
          }}
          onPress={handleAdd}
        >
          <Add
            size={22}
            color={colors.white}
            style={{
              marginRight: 8,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: colors.seaGreen,
            }}
          />
          <Text
            style={{ color: colors.seaGreen, fontWeight: "600", fontSize: 16 }}
          >
            Add address
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
