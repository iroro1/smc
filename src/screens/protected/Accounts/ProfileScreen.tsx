import {
  ArrowLeft,
  Call,
  Key,
  Message,
  Message2,
  User,
} from "iconsax-react-native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);

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
          Profile information
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={{
              uri:
                user?.profileImage ||
                "https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{user?.name || "Samuel George"}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile" as never)}
            style={styles.editProfile}
          >
            <Text style={styles.email}>Edit profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.sections}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Full Name</Text>
          <View style={styles.item}>
            <User size={24} color={colors.seaGreen} />
            <Text style={styles.itemTitle}>
              {user?.name || "Samuel George"}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email</Text>
          <View style={styles.item}>
            <Message2 size={24} color={colors.seaGreen} />
            <Text style={styles.itemTitle}>
              {user?.email || "samuel@gmail.com"}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone</Text>
          <View style={styles.item}>
            <Call size={24} color={colors.seaGreen} />
            <Text style={styles.itemTitle}>+234 812 345 6789</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.item}>
            <Key size={24} color={colors.seaGreen} />
            <Text style={styles.itemTitle}>Password</Text>
          </View>
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => navigation.navigate("EditPassword" as never)}
          >
            <Text style={styles.itemButtonText}>Change password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    minHeight: 200,
    backgroundColor: "#E5F3ED",
    borderBottomWidth: 1,
    borderBottomColor: "#CCE7DB",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
    marginBottom: 8,
    marginTop: 20,
  },
  email: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.seaGreen,
  },
  editProfile: {
    marginTop: 8,
  },
  sections: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#CCE7DB",
    paddingBottom: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.black,
  },
  itemButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
  },
  itemButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.seaGreen,
    paddingBottom: 16,
  },
});
