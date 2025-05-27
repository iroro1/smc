import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import {
  ArrowRight2,
  Call,
  CardPos,
  DocumentText,
  Location,
  Logout,
  Message,
  Star,
  Trash,
  User,
} from "iconsax-react-native";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../utils/colors";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  Address: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AccountScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const sections = {
    "My Account": [
      {
        title: "Profile information",
        onPress: () => navigation.navigate("Profile" as never),
        icon: <User size={24} color={colors.seaGreen} />,
        iconColor: colors.seaGreen,
      },
      {
        title: "Addresses",
        onPress: () => navigation.navigate("Address" as never),
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
        onPress: () => setContactModal(true),
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
              uri:
                user?.profileImage ||
                "https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{user?.name || "Samuel George"}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile" as never)}
            style={styles.editProfile}
          >
            <Text style={styles.email}>Edit profile</Text>
          </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.item}
            onPress={() => setShowLogoutModal(true)}
          >
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

          <TouchableOpacity
            style={styles.item}
            onPress={() => setDeleteAccount(true)}
          >
            <View style={styles.itemContent}>
              <View style={styles.itemIcon}>
                <Trash size={24} color={colors.red} />
              </View>
              <Text style={styles.itemTitle}>Delete this account</Text>
            </View>
            <ArrowRight2 size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>

        {/* Contact modal */}
        <Modal
          visible={contactModal}
          onRequestClose={() => setContactModal(false)}
          transparent={true}
          animationType="slide"
        >
          <TouchableWithoutFeedback onPress={() => setContactModal(false)}>
            <View style={styles.modalContent}>
              <TouchableWithoutFeedback>
                <View
                  style={[
                    styles.modalContainer,
                    { height: 262, width: "100%" },
                  ]}
                >
                  <Text
                    style={[
                      styles.modalTitle,
                      {
                        fontSize: 18,
                        fontWeight: "600",
                        color: "#344054",
                      },
                    ]}
                  >
                    Contact us
                  </Text>

                  <View
                    style={{ flexDirection: "column", gap: 10, marginTop: 16 }}
                  >
                    <TouchableOpacity
                      style={{
                        height: 64,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        borderRadius: 8,
                        padding: 16,
                      }}
                    >
                      <View
                        style={{
                          width: 32,
                          height: 32,
                          marginRight: 16,
                          backgroundColor: "#F2F4F7",
                          borderRadius: 16,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Call size={16} color={colors.gray} />
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "400",
                          color: "#344054",
                        }}
                      >
                        Call us
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 64,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        borderRadius: 8,
                        padding: 16,
                      }}
                    >
                      <View
                        style={{
                          width: 32,
                          height: 32,
                          marginRight: 16,
                          backgroundColor: "#F2F4F7",
                          borderRadius: 16,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Message size={16} color={colors.gray} />
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "400",
                          color: "#344054",
                        }}
                      >
                        Email us
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Logout modal */}
        <Modal
          visible={showLogoutModal}
          onRequestClose={() => setShowLogoutModal(false)}
          transparent={true}
          animationType="slide"
        >
          <TouchableWithoutFeedback
            style={styles.modalContent}
            onPress={() => setShowLogoutModal(false)}
          >
            <View style={styles.modalContent}>
              <TouchableWithoutFeedback>
                <View style={[styles.modalContainer, { height: 218 }]}>
                  <Text
                    style={[
                      styles.modalDescription,
                      {
                        textAlign: "center",
                        marginHorizontal: 0,
                      },
                    ]}
                  >
                    Are you sure you want to logout?
                  </Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      onPress={() => setShowLogoutModal(false)}
                      style={styles.modalButtonCancel}
                    >
                      <Text style={styles.modalButtonCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(logout());
                        setShowLogoutModal(false);
                        navigation.reset({
                          index: 0,
                          routes: [{ name: "Login" }],
                        });
                      }}
                      style={styles.modalButtonDelete}
                    >
                      <Text style={styles.modalButtonDeleteText}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Delete account modal */}
        <Modal
          visible={deleteAccount}
          onRequestClose={() => setDeleteAccount(false)}
          transparent={true}
          animationType="slide"
        >
          <TouchableWithoutFeedback
            style={styles.modalContent}
            onPress={() => setDeleteAccount(false)}
          >
            <View style={styles.modalContent}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <Trash
                    size={72}
                    color={colors.red}
                    style={styles.modalIcon}
                  />
                  <Text style={styles.modalDescription}>
                    Are you sure you want to delete your account? Please note
                    that this action cannot be undone.
                  </Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      onPress={() => setDeleteAccount(false)}
                      style={styles.modalButtonCancel}
                    >
                      <Text style={styles.modalButtonCancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setDeleteAccount(false)}
                      style={[
                        styles.modalButtonDelete,
                        {
                          backgroundColor: colors.red,
                        },
                      ]}
                    >
                      <Text style={styles.modalButtonDeleteText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
  editProfile: {
    marginTop: 8,
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
    height: 40,
    borderRadius: 8,
    borderColor: "#E4E7EC",
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
  modalContent: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    flex: 1,
    height: 380,
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    height: 380,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  modalIcon: {
    marginBottom: 10,
    alignSelf: "center",
    marginVertical: 32,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#475467",
    marginVertical: 48,
    marginHorizontal: 24,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.red,
  },
  modalButtonText: {
    color: colors.white,
  },
  modalButtonCancel: {
    height: 36,
    width: "48%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonDelete: {
    backgroundColor: colors.red,
    height: 36,
    width: "48%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonCancelText: {
    color: colors.black,
  },
  modalButtonDeleteText: {
    color: colors.white,
  },
});
