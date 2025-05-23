import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { colors } from "../../utils/colors";
import {
  ArrowRight,
  ArrowRight2,
  Call,
  CardPos,
  DocumentText,
  Location,
  Logout,
  Star,
  Trash,
  User,
} from "iconsax-react-native";

export const AccountScreen = () => {
  const navigation = useNavigation();

  const sections = {
    "My Account": [
      {
        title: "Profile information",
        onPress: () => {},
        icon: <User size={24} color={colors.seaGreen} />,
        iconColor: colors.seaGreen,
      },
      {
        title: "Addresses",
        onPress: () => {},
        icon: <Location size={24} color={colors.seaGreen} />,
        iconColor: colors.seaGreen,
      },
      {
        title: "Payments",
        onPress: () => {},
        icon: <CardPos size={24} color={colors.seaGreen} />,
        iconColor: colors.seaGreen,
      },
    ],
    "Support & Legal": [
      {
        title: "Contact us",
        onPress: () => {},
        icon: <Call size={24} color={colors.seaGreen} />,
        iconColor: colors.seaGreen,
      },
      {
        title: "Privacy policy",
        onPress: () => {},
        icon: <DocumentText size={24} color={colors.seaGreen} />,
        iconColor: colors.seaGreen,
      },
      {
        title: "Terms & conditions",
        onPress: () => {},
        icon: <DocumentText size={24} color={colors.seaGreen} />,
        iconColor: colors.seaGreen,
      },
      {
        title: "Rate our app",
        onPress: () => {},
        icon: <Star size={24} color={colors.seaGreen} />,
        iconColor: colors.seaGreen,
      },
    ],
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            }}
            style={styles.image}
          />
          <Text style={styles.title}>Samuel George</Text>
          <Text style={styles.email}>Edit profile</Text>
        </View>
      </View>
      <ScrollView style={styles.sections}>
        {Object.entries(sections).map(([section, items]) => (
          <View key={section}>
            <Text style={styles.sectionTitle}>{section}</Text>
            {items.map((item) => (
              <TouchableOpacity
                onPress={item.onPress}
                style={styles.item}
                key={item.title}
              >
                <View style={styles.itemContent}>
                  <View style={styles.itemIcon}>{item.icon}</View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
                <TouchableOpacity style={styles.itemButton}>
                  <ArrowRight2 size={20} color={colors.gray} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.logout}>
          <TouchableOpacity style={styles.item}>
            <View style={styles.itemContent}>
              <View style={styles.itemIcon}>
                <Logout size={24} color={colors.red} />
              </View>
              <Text style={styles.itemTitle}>Log out</Text>
            </View>
            <TouchableOpacity style={styles.itemButton}>
              <ArrowRight2 size={20} color={colors.gray} />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <View style={styles.itemContent}>
              <View style={styles.itemIcon}>
                <Trash size={24} color={colors.red} />
              </View>
              <Text style={styles.itemTitle}>Delete this account</Text>
            </View>
            <ArrowRight2 size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    height: 232 + Constants.statusBarHeight,
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#667085",
    marginTop: 28,
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#344054",
  },
  itemDescription: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.black,
    marginTop: 4,
  },
  itemButton: {
    // flexDirection: "row",
    // alignItems: "center",
    // gap: 10,
  },
  itemButtonText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.seaGreen,
  },
  sections: {
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    height: 48,
    borderRadius: 8,
    // borderWidth: 1,
    borderColor: "#E4E7EC",
    // padding: 16,
    // marginBottom: 12,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
  logout: {
    marginTop: 20,
    marginBottom: 80,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoutIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.red,
  },
});
