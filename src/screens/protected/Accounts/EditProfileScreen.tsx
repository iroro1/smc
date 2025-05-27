import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/colors";
import { ArrowLeft, User } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { AppTextInput } from "../../../components/AppTextInput";
import { useState } from "react";
import { AppButton } from "../../../components/AppButton";
import AppAvatar from "../../../components/AppAvatar";
import useFileUpload from "../../../hooks/useFileUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setUser } from "../../../redux/slices/authSlice";
import * as DocumentPicker from "expo-document-picker";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [fullName, setFullName] = useState(user?.name || "Samuel George");
  const [email, setEmail] = useState(user?.email || "samuel@gmail.com");
  const [phone, setPhone] = useState("+234 812 345 6789");
  const [avatar, setAvatar] = useState(
    user?.profileImage ||
      "https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  );

  const { file, uploading, error, success, pickDocument, uploadFile, reset } =
    useFileUpload({
      allowedTypes: ["image/*"],
      maxSize: 5 * 1024 * 1024, // 5MB
      onSuccess: async (file: any) => {
        // Here you would typically upload the file to your server
        // For now, we'll just use the local file URI
        const fileUri = file.uri;
        setAvatar(fileUri);

        // Update the user in Redux store
        if (user) {
          dispatch(
            setUser({
              ...user,
              profileImage: fileUri,
            })
          );
        }
      },
      onError: (error) => {
        console.error("Error uploading file:", error);
      },
    });

  const handleSaveChanges = () => {
    if (user) {
      dispatch(
        setUser({
          ...user,
          name: fullName,
          email: email,
          profileImage: avatar,
        })
      );
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 16,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.gray} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500", color: colors.black }}>
          Edit profile
        </Text>
      </View>
      <View style={{ padding: 16, alignItems: "center" }}>
        <AppAvatar
          size={80}
          source={{ uri: avatar }}
          initials={fullName
            .split(" ")
            .map((n) => n[0])
            .join("")}
          onPress={pickDocument}
        />
        <TouchableOpacity
          onPress={pickDocument}
          style={{ marginTop: 12, alignItems: "center" }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "400", color: colors.seaGreen }}
          >
            Change picture
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <AppTextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            inputTitle="Full Name"
          />
          <AppTextInput
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            inputTitle="Email address"
          />
          <AppTextInput
            placeholder="Phone number"
            value={phone}
            onChangeText={setPhone}
            inputTitle="Phone number"
          />
        </View>
      </ScrollView>
      <View style={{ padding: 16 }}>
        <AppButton title="Save changes" onPress={handleSaveChanges} />
      </View>
    </SafeAreaView>
  );
}
