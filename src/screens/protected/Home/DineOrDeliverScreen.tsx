import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../../../utils/colors";
import { AppBackButton } from "../../../components/AppBackButton";
import Svg, {
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
} from "react-native-svg";
import { Call, Location, Message2 } from "iconsax-react-native";
//  import { RootStackParamList } from "../../../navigation/RootNavigation";
type IconProps = { w: number; h: number; color: string };

// Inline SVGs for icons
const DeliveryIcon = ({ w, h, color }: IconProps) => (
  <Svg width={w} height={h} viewBox="0 0 57 56" fill="none">
    <G clipPath="url(#clip0_6572_140056)">
      <Path
        d="M44.273 14.0007L48.9397 23.334H8.05967L12.7263 14.0007H44.273ZM47.1663 9.33398H9.83301L2.83301 23.334V28.0007H7.49967V44.334H12.1663V37.334H44.833V44.334H49.4997V28.0007H54.1663V23.334L47.1663 9.33398ZM12.1663 32.6673V28.0007H44.833V32.6673H12.1663Z"
        fill="url(#paint0_linear_6572_140056)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_6572_140056"
        x1="22.9995"
        y1="18.5005"
        x2="34.9995"
        y2="36.5005"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.480877" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <ClipPath id="clip0_6572_140056">
        <Rect width={56} height={56} fill="white" x={0.5} />
      </ClipPath>
    </Defs>
  </Svg>
);

const DiningIcon = ({ w, h, color }: IconProps) => (
  <Svg width={w} height={h} viewBox="0 0 61 60" fill="none">
    <Path
      d="M38.3969 8.53686C44.8016 5.76684 48.6039 17.0041 41.248 18.5279C35.233 19.7744 33.0271 11.7019 37.5719 8.70778"
      stroke="url(#paint0_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M50.0726 39.8574C51.7869 41.6102 52.3953 44.3352 50.0504 46.6868C46.3968 50.3513 41.2754 46.898 41.2637 42.7562"
      stroke="url(#paint1_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M29.3436 42.7793C29.5021 44.0496 29.0899 45.4205 27.8187 46.6838C24.436 50.0456 19.8078 47.4239 19.0479 43.7712"
      stroke="url(#paint2_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M35.1498 19.9492C31.4916 24.1684 29.6741 26.9401 28.5498 31.3492"
      stroke="url(#paint3_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M35.1906 20.8496C35.0121 26.2399 35.1267 30.0569 42.2004 27.2555"
      stroke="url(#paint4_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M41.0684 27.1914C42.1475 30.563 44.4428 35.1278 44.9657 38.6886"
      stroke="url(#paint5_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M30.3051 31.4785C27.4704 31.6687 22.5561 32.9149 20.5878 35.1174C19.4191 36.4246 15.6049 40.608 16.7163 42.8178C17.3109 44.0017 25.0257 43.4502 26.0418 43.3059C30.6081 42.657 36.604 43.4502 41.0509 42.8178C42.015 42.6807 40.6134 41.5806 41.8801 41.5806C43.7707 41.5806 53.01 39.4353 51.4053 37.5193C47.6842 33.0793 39.1093 36.6685 40.4149 41.2128"
      stroke="url(#paint6_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M30.5459 31.8672C31.6854 34.4827 32.609 41.1862 32.6894 41.8053"
      stroke="url(#paint7_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M30.5459 31.2835C38.7572 31.2469 39.1003 35.0896 33.9946 41.2214"
      stroke="url(#paint8_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M25.8685 32.0625C21.8035 34.6155 15.4409 33.2192 10.6689 34.7907"
      stroke="url(#paint9_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.5 19.2012C10.7651 21.5365 9.5 33.6502 10.0344 34.2058"
      stroke="url(#paint10_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.085 19.2357C16.354 18.492 20.429 18.3338 20.9026 19.2357C21.376 20.1378 21.376 25.7495 20.0855 32.8425"
      stroke="url(#paint11_linear_6581_144853)"
      strokeOpacity={0.9}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_6581_144853"
        x1="40.2105"
        y1="8.09961"
        x2="40.2105"
        y2="18.6576"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_6581_144853"
        x1="46.4276"
        y1="39.8574"
        x2="46.4276"
        y2="48.2367"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_6581_144853"
        x1="24.2119"
        y1="42.7793"
        x2="24.2119"
        y2="48.2355"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_6581_144853"
        x1="31.8498"
        y1="19.9492"
        x2="31.8498"
        y2="31.3492"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_6581_144853"
        x1="38.6754"
        y1="20.8496"
        x2="38.6754"
        y2="28.1996"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <LinearGradient
        id="paint5_linear_6581_144853"
        x1="43.017"
        y1="27.1914"
        x2="43.017"
        y2="38.6886"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <LinearGradient
        id="paint6_linear_6581_144853"
        x1="34.0536"
        y1="31.4785"
        x2="34.0536"
        y2="43.5602"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <LinearGradient
        id="paint7_linear_6581_144853"
        x1="31.6176"
        y1="31.8672"
        x2="31.6176"
        y2="41.8053"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <LinearGradient
        id="paint8_linear_6581_144853"
        x1="33.9561"
        y1="31.2832"
        x2="33.9561"
        y2="41.2214"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <LinearGradient
        id="paint9_linear_6581_144853"
        x1="18.2687"
        y1="32.0625"
        x2="18.2687"
        y2="34.7907"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <LinearGradient
        id="paint10_linear_6581_144853"
        x1="9.7923"
        y1="19.2012"
        x2="9.7923"
        y2="34.2058"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
      <LinearGradient
        id="paint11_linear_6581_144853"
        x1="15.6387"
        y1="18.6172"
        x2="15.6387"
        y2="32.8425"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.581731" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
    </Defs>
  </Svg>
);

type RootStackParamList = {
  Checkout: undefined;
  Home: undefined;
  Cart: undefined;
  Restaurantmenu: { externalDelivery?: boolean; mealId?: number };
  DineOrDeliver: { externalDelivery?: boolean; mealId?: number };
};

type DineOrDeliverNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Checkout" | "Home" | "Cart" | "Restaurantmenu" | "DineOrDeliver"
>;

export const DineOrDeliverScreen = () => {
  const navigation = useNavigation<DineOrDeliverNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, "DineOrDeliver">>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <AppBackButton variant={2} size={20} />
        <Text style={styles.goBackText}>Go back</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant Info */}
        <View style={styles.restaurantInfo}>
          <Text style={styles.welcomeText}>WELCOME TO</Text>
          <Text style={styles.restaurantName}>Genesis Foods</Text>
          <View style={styles.restaurantAddressContainer}>
            <Location size={16} color="#292F3699" />
            <Text style={styles.restaurantAddress}>
              24b Admiralty Way, Lekki
            </Text>
          </View>

          <Text style={styles.restaurantPhone}>
            <Call size={16} color="#292F3699" /> +234 8163 344 486
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Prompt */}
        <View style={styles.promptSection}>
          <Text style={styles.promptText}>Let's get your order started</Text>
          <Text style={styles.promptSubText}>
            How would you like to place your order?
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() =>
              navigation.navigate("Main", {
                screen: "Home", // first, go into Home stack inside Main
                params: {
                  screen: "DineOptions", // then navigate inside Home stack to RestaurantMenu
                },
              } as never)
            }
          >
            <DeliveryIcon w={48} h={48} color="#FF5A5F" />
            <Text style={styles.optionTitle}>Dine-in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() =>
              navigation.navigate("Main", {
                screen: "Home", // first, go into Home stack inside Main
                params: {
                  screen: "RestaurantMenu", // then navigate inside Home stack to RestaurantMenu
                  params: {
                    // pass params to RestaurantMenu screen
                    externalDelivery: true,
                    mealId: route.params?.mealId,
                  },
                },
              } as never)
            }
          >
            <DiningIcon w={48} h={48} color="#FF5A5F" />
            <Text style={styles.optionTitle}>External delivery</Text>
          </TouchableOpacity>
        </View>

        {/* Report an issue */}
        <TouchableOpacity style={styles.reportRow}>
          <Message2 variant="Bold" size={24} color="#344054" />
          <Text style={styles.reportText}>Report an issue</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>Powered by Smart Menu Limited.</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollView: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 24,
    paddingBottom: 8,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#EAECF0",
  },
  backBtn: {
    padding: 8,
  },
  goBackText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#292F36",
  },
  restaurantInfo: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 12,
    color: "#292F3699",
    letterSpacing: 1,
    fontWeight: "400",
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#292F36",
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    color: "#292F36",
    marginLeft: 4,
    fontWeight: "400",
  },
  restaurantPhone: {
    fontSize: 16,
    color: "#292F36",
    fontWeight: "400",
    marginTop: 4,
  },
  restaurantAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: colors.lightGray,
    alignSelf: "center",
    marginVertical: 16,
  },
  promptSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  promptText: {
    fontSize: 14,
    color: "#535D69",
    fontWeight: "400",
    marginBottom: 4,
    textAlign: "center",
  },
  promptSubText: {
    fontSize: 16,
    color: "#292F3699",
    fontWeight: "400",
    textAlign: "center",
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
    gap: 44,
  },
  optionCard: {
    width: 142,
    height: 142,
    backgroundColor: "#1D2939",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  optionTitle: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "500",
    textAlign: "center",
  },
  reportRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  reportText: {
    fontSize: 16,
    color: "#1D2939",
    fontWeight: "400",
    marginLeft: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#667085",
    textAlign: "center",
    paddingHorizontal: 16,
  },
});
