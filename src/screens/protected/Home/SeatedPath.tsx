import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ArrowDown,
  ArrowDown2,
  Call,
  Check,
  CloseCircle,
  Location,
  TickCircle,
} from "iconsax-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";
import { AppBackButton } from "../../../components/AppBackButton";
import { colors } from "../../../utils/colors";
import tw from "twrnc";
import { AppButton } from "../../../components/AppButton";
//  import { RootStackParamList } from "../../../navigation/RootNavigation";
type IconProps = { w: number; h: number; color?: string };

// Inline SVGs for icons
const DeliveryIcon = ({ w, h }: IconProps) => (
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

const DiningIcon = ({ w, h }: IconProps) => (
  <Svg width={w} height={h} viewBox="0 0 40 40" fill="none">
    <Path
      d="M27.066 3.33398H12.9327C8.33268 3.33398 6.66602 5.00065 6.66602 9.68398V30.3173C6.66602 35.0007 8.33268 36.6673 12.9327 36.6673H27.0493C31.666 36.6673 33.3327 35.0007 33.3327 30.3173V9.68398C33.3327 5.00065 31.666 3.33398 27.066 3.33398ZM19.9993 32.1673C18.3993 32.1673 17.0827 30.8507 17.0827 29.2507C17.0827 27.6507 18.3993 26.334 19.9993 26.334C21.5993 26.334 22.916 27.6507 22.916 29.2507C22.916 30.8507 21.5993 32.1673 19.9993 32.1673ZM23.3327 10.4173H16.666C15.9827 10.4173 15.416 9.85065 15.416 9.16732C15.416 8.48398 15.9827 7.91732 16.666 7.91732H23.3327C24.016 7.91732 24.5827 8.48398 24.5827 9.16732C24.5827 9.85065 24.016 10.4173 23.3327 10.4173Z"
      fill="white"
    />
  </Svg>
);

const Transiticon = ({ w = 24, h = 24 }: IconProps) => (
  <Svg width={w} height={h} viewBox="0 0 40 40" fill="none">
    <Path
      d="M36.6673 35.4167H35.0007V25C35.0007 16.7167 28.284 10 20.0007 10C11.7173 10 5.00065 16.7167 5.00065 25V35.4167H3.33398C2.65065 35.4167 2.08398 35.9833 2.08398 36.6667C2.08398 37.35 2.65065 37.9167 3.33398 37.9167H36.6673C37.3507 37.9167 37.9173 37.35 37.9173 36.6667C37.9173 35.9833 37.3507 35.4167 36.6673 35.4167Z"
      fill="white"
    />
    <Path
      d="M20 6.25065C19.3167 6.25065 18.75 5.68398 18.75 5.00065V3.33398C18.75 2.65065 19.3167 2.08398 20 2.08398C20.6833 2.08398 21.25 2.65065 21.25 3.33398V5.00065C21.25 5.68398 20.6833 6.25065 20 6.25065Z"
      fill="white"
    />
    <Path
      d="M8.33242 9.58242C8.01576 9.58242 7.69909 9.46575 7.44909 9.21575L5.78242 7.54909C5.29909 7.06576 5.29909 6.26576 5.78242 5.78242C6.26576 5.29909 7.06576 5.29909 7.54909 5.78242L9.21576 7.44909C9.69909 7.93242 9.69909 8.73242 9.21576 9.21575C8.96576 9.46575 8.64909 9.58242 8.33242 9.58242Z"
      fill="white"
    />
    <Path
      d="M31.6658 9.58242C31.3491 9.58242 31.0324 9.46575 30.7824 9.21575C30.2991 8.73242 30.2991 7.93242 30.7824 7.44909L32.4491 5.78242C32.9324 5.29909 33.7324 5.29909 34.2158 5.78242C34.6991 6.26576 34.6991 7.06576 34.2158 7.54909L32.5491 9.21575C32.2991 9.46575 31.9824 9.58242 31.6658 9.58242Z"
      fill="white"
    />
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

const enum PathModalType {
  CALL = "call",
  SELF = "self",
}

export const CashIcon = ({ w = 16, h = 16 }: IconProps) => (
  <Svg width={w} height={h} viewBox="0 0 16 16" fill="none">
    <Path
      d="M7.96013 1.47387L6.35346 5.21387H4.7468C4.48013 5.21387 4.22013 5.23387 3.9668 5.2872L4.63346 3.68721L4.66013 3.62721L4.70013 3.52054C4.72013 3.47387 4.73346 3.43387 4.75346 3.40054C5.5268 1.6072 6.39346 1.0472 7.96013 1.47387Z"
      fill="#344054"
    />
    <Path
      d="M12.4867 5.39302L12.4734 5.38635C12.0734 5.27302 11.6667 5.21302 11.2534 5.21302H7.08008L8.58008 1.72635L8.60008 1.67969C8.69341 1.71302 8.79341 1.75969 8.89341 1.79302L10.3667 2.41302C11.1867 2.75302 11.7601 3.10635 12.1134 3.53302C12.1734 3.61302 12.2267 3.68635 12.2801 3.77302C12.3401 3.86635 12.3867 3.95969 12.4134 4.05969C12.4401 4.11969 12.4601 4.17302 12.4734 4.23302C12.5734 4.57302 12.5801 4.95969 12.4867 5.39302Z"
      fill="#344054"
    />
    <Path
      d="M8.3457 11.7734H8.51237C8.71237 11.7734 8.87904 11.5934 8.87904 11.3734C8.87904 11.0934 8.79904 11.0534 8.6257 10.9867L8.3457 10.8867V11.7734Z"
      fill="#344054"
    />
    <Path
      d="M12.1941 6.34622C11.8941 6.25956 11.5808 6.21289 11.2541 6.21289H4.74747C4.29414 6.21289 3.86747 6.29956 3.46747 6.47289C2.30747 6.97289 1.49414 8.12622 1.49414 9.46622V10.7662C1.49414 10.9262 1.50747 11.0796 1.52747 11.2396C1.67414 13.3596 2.80747 14.4929 4.92747 14.6329C5.08081 14.6529 5.23414 14.6662 5.40081 14.6662H10.6008C13.0675 14.6662 14.3675 13.4929 14.4941 11.1596C14.5008 11.0329 14.5075 10.8996 14.5075 10.7662V9.46622C14.5075 7.99289 13.5275 6.75289 12.1941 6.34622ZM8.85414 10.3329C9.16081 10.4396 9.57414 10.6662 9.57414 11.3729C9.57414 11.9796 9.10081 12.4662 8.51414 12.4662H8.34747V12.6129C8.34747 12.8062 8.19414 12.9596 8.00081 12.9596C7.80747 12.9596 7.65414 12.8062 7.65414 12.6129V12.4662H7.59414C6.95414 12.4662 6.42747 11.9262 6.42747 11.2596C6.42747 11.0662 6.58081 10.9129 6.77414 10.9129C6.96747 10.9129 7.12081 11.0662 7.12081 11.2596C7.12081 11.5396 7.33414 11.7729 7.59414 11.7729H7.65414V10.6462L7.14747 10.4662C6.84081 10.3596 6.42747 10.1329 6.42747 9.42622C6.42747 8.81956 6.90081 8.33289 7.48747 8.33289H7.65414V8.18622C7.65414 7.99289 7.80747 7.83956 8.00081 7.83956C8.19414 7.83956 8.34747 7.99289 8.34747 8.18622V8.33289H8.40747C9.04747 8.33289 9.57414 8.87289 9.57414 9.53956C9.57414 9.73289 9.42081 9.88622 9.22747 9.88622C9.03414 9.88622 8.88081 9.73289 8.88081 9.53956C8.88081 9.25956 8.66747 9.02622 8.40747 9.02622H8.34747V10.1529L8.85414 10.3329Z"
      fill="#344054"
    />
    <Path
      d="M7.11914 9.42734C7.11914 9.70734 7.19914 9.74734 7.37247 9.81401L7.65247 9.91401V9.02734H7.48581C7.27914 9.02734 7.11914 9.20734 7.11914 9.42734Z"
      fill="#344054"
    />
  </Svg>
);
export const PosIcon = ({ w = 16, h = 16 }: IconProps) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 16 16" fill="none">
      <Path
        d="M14.6673 14.166C14.6673 14.4393 14.4407 14.666 14.1673 14.666H1.83398C1.56065 14.666 1.33398 14.4393 1.33398 14.166C1.33398 13.8927 1.56065 13.666 1.83398 13.666H14.1673C14.4407 13.666 14.6673 13.8927 14.6673 14.166Z"
        fill="#344054"
      />
      <Path
        d="M10.2596 3.01318L3.09964 10.1732C2.8263 10.4465 2.3863 10.4465 2.11964 10.1732H2.11297C1.1863 9.23984 1.1863 7.73318 2.11297 6.80651L6.87963 2.03984C7.81297 1.10651 9.31964 1.10651 10.253 2.03984C10.5263 2.29984 10.5263 2.74651 10.2596 3.01318Z"
        fill="#344054"
      />
      <Path
        d="M13.8803 5.66021L11.847 3.62687C11.5736 3.35354 11.1336 3.35354 10.867 3.62687L3.70695 10.7869C3.43362 11.0535 3.43362 11.4935 3.70695 11.7669L5.74029 13.8069C6.67362 14.7335 8.18029 14.7335 9.11362 13.8069L13.8736 9.04021C14.8203 8.10688 14.8203 6.59354 13.8803 5.66021ZM8.50695 11.6802L7.70029 12.4935C7.53362 12.6602 7.26029 12.6602 7.08695 12.4935C6.92029 12.3269 6.92029 12.0535 7.08695 11.8802L7.90029 11.0669C8.06029 10.9069 8.34029 10.9069 8.50695 11.0669C8.67362 11.2335 8.67362 11.5202 8.50695 11.6802ZM11.1536 9.03354L9.52695 10.6669C9.36029 10.8269 9.08695 10.8269 8.91362 10.6669C8.74695 10.5002 8.74695 10.2269 8.91362 10.0535L10.547 8.42021C10.707 8.26021 10.987 8.26021 11.1536 8.42021C11.3203 8.59354 11.3203 8.86688 11.1536 9.03354Z"
        fill="#344054"
      />
    </Svg>
  );
};
export const OnlineIcon = ({ w = 16, h = 16 }: IconProps) => (
  <Svg width={w} height={h} viewBox="0 0 16 16" fill="none">
    <Path
      d="M5.09906 13.9392C5.07906 13.9392 5.0524 13.9526 5.0324 13.9526C3.73906 13.3126 2.68573 12.2526 2.03906 10.9592C2.03906 10.9392 2.0524 10.9126 2.0524 10.8926C2.86573 11.1326 3.70573 11.3126 4.53906 11.4526C4.68573 12.2926 4.85906 13.1259 5.09906 13.9392Z"
      fill="#344054"
    />
    <Path
      d="M13.9594 10.9659C13.2994 12.2926 12.1994 13.3659 10.8594 14.0126C11.1127 13.1659 11.326 12.3126 11.466 11.4526C12.306 11.3126 13.1327 11.1326 13.946 10.8926C13.9394 10.9192 13.9594 10.9459 13.9594 10.9659Z"
      fill="#344054"
    />
    <Path
      d="M14.0127 5.13966C13.1727 4.88633 12.326 4.67966 11.466 4.53299C11.326 3.67299 11.1194 2.81966 10.8594 1.98633C12.2394 2.64633 13.3527 3.75966 14.0127 5.13966Z"
      fill="#344054"
    />
    <Path
      d="M5.09966 2.05906C4.85966 2.8724 4.68633 3.69906 4.54633 4.53906C3.68633 4.6724 2.83299 4.88573 1.98633 5.13906C2.63299 3.79906 3.70633 2.69906 5.03299 2.03906C5.05299 2.03906 5.07966 2.05906 5.09966 2.05906Z"
      fill="#344054"
    />
    <Path
      d="M10.3272 4.39398C8.78049 4.22065 7.22049 4.22065 5.67383 4.39398C5.84049 3.48065 6.05383 2.56732 6.35383 1.68732C6.36716 1.63398 6.36049 1.59398 6.36716 1.54065C6.89383 1.41398 7.43383 1.33398 8.00049 1.33398C8.56049 1.33398 9.10716 1.41398 9.62716 1.54065C9.63383 1.59398 9.63383 1.63398 9.64716 1.68732C9.94716 2.57398 10.1605 3.48065 10.3272 4.39398Z"
      fill="#292D32"
    />
    <Path
      d="M4.39398 10.3272C3.47398 10.1605 2.56732 9.94716 1.68732 9.64716C1.63398 9.63383 1.59398 9.64049 1.54065 9.63383C1.41398 9.10716 1.33398 8.56716 1.33398 8.00049C1.33398 7.44049 1.41398 6.89383 1.54065 6.37383C1.59398 6.36716 1.63398 6.36716 1.68732 6.35383C2.57398 6.06049 3.47398 5.84049 4.39398 5.67383C4.22732 7.22049 4.22732 8.78049 4.39398 10.3272Z"
      fill="#292D32"
    />
    <Path
      d="M14.6674 8.00049C14.6674 8.56716 14.5874 9.10716 14.4608 9.63383C14.4074 9.64049 14.3674 9.63383 14.3141 9.64716C13.4274 9.9405 12.5208 10.1605 11.6074 10.3272C11.7808 8.78049 11.7808 7.22049 11.6074 5.67383C12.5208 5.84049 13.4341 6.05383 14.3141 6.35383C14.3674 6.36716 14.4074 6.37383 14.4608 6.37383C14.5874 6.90049 14.6674 7.44049 14.6674 8.00049Z"
      fill="#292D32"
    />
    <Path
      d="M10.3272 11.6074C10.1605 12.5274 9.94716 13.4341 9.64716 14.3141C9.63383 14.3674 9.63383 14.4074 9.62716 14.4608C9.10716 14.5874 8.56049 14.6674 8.00049 14.6674C7.43383 14.6674 6.89383 14.5874 6.36716 14.4608C6.36049 14.4074 6.36716 14.3674 6.35383 14.3141C6.06049 13.4274 5.84049 12.5274 5.67383 11.6074C6.44716 11.6941 7.22049 11.7541 8.00049 11.7541C8.78049 11.7541 9.56049 11.6941 10.3272 11.6074Z"
      fill="#292D32"
    />
    <Path
      d="M10.5095 10.5095C8.84214 10.7199 7.15916 10.7199 5.49176 10.5095C5.28139 8.84214 5.28139 7.15916 5.49176 5.49176C7.15916 5.28139 8.84214 5.28139 10.5095 5.49176C10.7199 7.15916 10.7199 8.84214 10.5095 10.5095Z"
      fill="#292D32"
    />
  </Svg>
);
export const SeatedPath = () => {
  const navigation = useNavigation<DineOrDeliverNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, "DineOrDeliver">>();
  const [pathModal, setPathModal] = useState<PathModalType | null>(null);

  const [tableNumber, setTableNumber] = useState<string>("");
  const [tableModal, setTableModal] = useState<boolean>(false);

  // Payment
  const [paymentTypeModal, setPaymentTypeModal] = useState<boolean>(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>("");

  const tables = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];
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

        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => {
              setPathModal(PathModalType.CALL);
            }}
          >
            <Transiticon w={48} h={48} color="#FF5A5F" />
            <Text style={styles.optionTitle}>Call a waiter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => {
              setPathModal(PathModalType.SELF);
            }}
          >
            <DiningIcon w={48} h={48} color="#FF5A5F" />
            <Text style={styles.optionTitle}>Self-order</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>Powered by Smart Menu Limited.</Text>

        {pathModal === PathModalType.CALL && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => {
              setPathModal(null);
            }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={tw`bg-black/50 flex-1 justify-center items-center`}>
                <View
                  style={tw`bg-[#fff] h-[90%] w-[90%] rounded-[6px] p-[16px] relative`}
                >
                  <Image
                    source={require("../../../../assets/images/home/waiter.png")}
                    style={tw`w-full h-[40%]`}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    style={tw`absolute top-[16px] right-[16px]`}
                    onPress={() => {
                      setPathModal(null);
                    }}
                  >
                    <CloseCircle size={24} variant="Bold" color="#292F3699" />
                  </TouchableOpacity>

                  <Text
                    style={tw`text-[#1D2939] text-[20px] font-bold text-left mt-[16px]`}
                  >
                    Call a waiter
                  </Text>
                  <Text
                    style={tw`text-[#292F36] text-[16px] font-[400] text-left mt-[8px] leading-[24px]`}
                  >
                    We have assigned a waiter to your table. Please enter your
                    table number to notify them that you need service. Thank
                    you!
                  </Text>

                  <View style={tw`mt-[24px]`}>
                    <Text style={tw`text-[#344054] text-[16px] font-[600]`}>
                      Table Number
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setTableModal(true);
                      }}
                      style={tw`flex-row items-center justify-between mt-[8px] border border-[#EAECF0] rounded-[6px] p-[16px]`}
                    >
                      <Text style={tw`text-[#667085] text-[16px] font-[400]`}>
                        {`Table ${tableNumber}` || "Select table number"}
                      </Text>

                      <ArrowDown2 size={16} color="#292F3699" />
                    </TouchableOpacity>
                  </View>

                  {tableModal && (
                    <View
                      style={tw`mt-[16px]  absolute bg-[#fff] top-[40%] left-[16px] translate-x-[-50%] translate-y-[-50%] p-[16px] rounded-[6px] z-10 w-full border border-[#F1F5F9] h-[60%] shadow-sm`}
                    >
                      <FlatList
                        data={tables}
                        keyExtractor={(item) => item}
                        contentContainerStyle={tw`w-full flex-row flex-wrap justify-between gap-y-[16px] `}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setTableNumber(item);

                              setTableModal(false);
                            }}
                            style={tw`flex-col py-[8px] relative items-center justify-between border border-[${
                              +tableNumber === +item ? "#84CAFF" : "#F1F5F9"
                            }] bg-[${
                              +tableNumber === +item ? "#F5FAFF" : "#fff"
                            }] rounded-[6px] w-[60px] h-[60px]`}
                          >
                            <Text
                              style={tw`text-[#667085] text-[14px] font-[400]`}
                            >
                              Table{tableNumber}
                            </Text>
                            <Text
                              style={tw`text-[#667085] text-[16px] font-bold`}
                            >
                              {item}
                            </Text>

                            {tableNumber === item && (
                              <View
                                style={tw`bg-[#2E90FA] w-[24px] min-h-[12px] absolute -top-1 -right-1 rounded-full py-1 flex-row items-center justify-center `}
                              >
                                <TickCircle
                                  size={8}
                                  variant="Bold"
                                  color="#fff"
                                />
                              </View>
                            )}
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  )}

                  <View>
                    <AppButton
                      onPress={() => {
                        setTableModal(false);
                        setPathModal(null);
                        setPaymentTypeModal(true);
                      }}
                      title="Call Waiter"
                      style={tw`mt-[24px]`}
                      disabled={!tableNumber}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
        {pathModal === PathModalType.SELF && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={() => {
              setPathModal(null);
            }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={tw`bg-black/50 flex-1 justify-center items-center`}>
                <View
                  style={tw`bg-[#fff] h-[90%] w-[90%] rounded-[6px] p-[16px] relative`}
                >
                  <Image
                    source={require("../../../../assets/images/home/amico.png")}
                    style={tw`w-full h-[30%] mt-[40px]`}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    style={tw`absolute top-[16px] right-[16px]`}
                    onPress={() => {
                      setPathModal(null);
                    }}
                  >
                    <CloseCircle size={24} variant="Bold" color="#292F3699" />
                  </TouchableOpacity>

                  <Text
                    style={tw`text-[#1D2939] text-[20px] font-bold text-left mt-[16px]`}
                  >
                    Self-order
                  </Text>
                  <Text
                    style={tw`text-[#292F36] text-[16px] font-[400] text-left mt-[8px] leading-[24px]`}
                  >
                    Start your order by selecting your table number. We’ll bring
                    your food right to you.
                  </Text>

                  <View style={tw`mt-[24px]`}>
                    <Text style={tw`text-[#344054] text-[16px] font-[600]`}>
                      Table Number
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setTableModal(true);
                      }}
                      style={tw`flex-row items-center justify-between mt-[8px] border border-[#EAECF0] rounded-[6px] p-[16px]`}
                    >
                      <Text style={tw`text-[#667085] text-[16px] font-[400]`}>
                        {`Table ${tableNumber}` || "Select table number"}
                      </Text>

                      <ArrowDown2 size={16} color="#292F3699" />
                    </TouchableOpacity>
                  </View>

                  {tableModal && (
                    <View
                      style={tw`mt-[16px]  absolute bg-[#fff] top-[40%] left-[16px] translate-x-[-50%] translate-y-[-50%] p-[16px] rounded-[6px] z-10 w-full border border-[#F1F5F9] h-[60%] shadow-sm`}
                    >
                      <FlatList
                        data={tables}
                        keyExtractor={(item) => item}
                        contentContainerStyle={tw`w-full flex-row flex-wrap justify-between gap-y-[16px] `}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setTableNumber(item);

                              setTableModal(false);
                            }}
                            style={tw`flex-col py-[8px] relative items-center justify-between border border-[${
                              +tableNumber === +item ? "#84CAFF" : "#F1F5F9"
                            }] bg-[${
                              +tableNumber === +item ? "#F5FAFF" : "#fff"
                            }] rounded-[6px] w-[60px] h-[60px]`}
                          >
                            <Text
                              style={tw`text-[#667085] text-[14px] font-[400]`}
                            >
                              Table{tableNumber}
                            </Text>
                            <Text
                              style={tw`text-[#667085] text-[16px] font-bold`}
                            >
                              {item}
                            </Text>

                            {tableNumber === item && (
                              <View
                                style={tw`bg-[#2E90FA] w-[24px] min-h-[12px] absolute -top-1 -right-1 rounded-full py-1 flex-row items-center justify-center `}
                              >
                                <TickCircle
                                  size={8}
                                  variant="Bold"
                                  color="#fff"
                                />
                              </View>
                            )}
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  )}

                  <View>
                    <AppButton
                      onPress={() => {
                        setTableModal(false);
                        setPathModal(null);
                        // setPaymentTypeModal(true);

                        navigation.navigate("MyDishesTwo");
                      }}
                      title="Confirm table"
                      style={tw`mt-[24px]`}
                      disabled={!tableNumber}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
        {paymentTypeModal && (
          <Modal
            onRequestClose={() => {
              setPaymentTypeModal(false);
            }}
            visible={paymentTypeModal}
            transparent
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={tw`flex-1 items-center justify-end bg-[#00000066]`}>
                <View
                  style={tw`bg-[#fff] p-[16px] rounded-[6px] w-[100%] h-[75%] relative`}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setPaymentTypeModal(false);
                      setPathModal(PathModalType.CALL);
                    }}
                    style={tw`absolute top-[16px] right-[16px]`}
                  >
                    <CloseCircle size={24} color="#667085" variant="Bold" />
                  </TouchableOpacity>

                  <Text
                    style={tw`text-[14px] font-bold text-[#344054] mt-[56px] mb-[16px]`}
                  >
                    Select payment method
                  </Text>

                  <View style={tw`gap-[16px]`}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedPaymentType("cash");
                      }}
                      style={tw`flex-row items-center justify-start border border-[${
                        selectedPaymentType === "cash" ? "#475467" : "#EAECF0"
                      }] rounded-[6px] p-[16px] gap-[16px] relative overflow-hidden`}
                    >
                      {selectedPaymentType === "cash" && (
                        <View
                          style={tw`absolute bg-[#475467] w-[32px] h-[16px] top-[-4px] right-[-10px] rotate-[-140deg]`}
                        />
                      )}
                      <View
                        style={tw`flex-row items-center justify-center bg-[#F2F4F7] rounded-full p-[16px] h-[32px] w-[32px]`}
                      >
                        <CashIcon w={16} h={16} />
                      </View>
                      <View>
                        <Text style={tw`text-[16px] font-bold text-[#344054]`}>
                          Pay with cash
                        </Text>
                        <Text style={tw`text-[#667085] text-[12px] font-[400]`}>
                          A waiter will come to collect your payment.
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedPaymentType("pos");
                      }}
                      style={tw`flex-row items-center justify-start border border-[${
                        selectedPaymentType === "pos" ? "#475467" : "#EAECF0"
                      }]  rounded-[6px] p-[16px] gap-[16px] relative overflow-hidden`}
                    >
                      {selectedPaymentType === "pos" && (
                        <View
                          style={tw`absolute bg-[#475467] w-[32px] h-[16px] top-[-4px] right-[-10px] rotate-[-140deg]`}
                        />
                      )}
                      <View
                        style={tw`flex-row items-center justify-center bg-[#F2F4F7] rounded-full p-[16px] h-[32px] w-[32px]`}
                      >
                        <PosIcon w={16} h={16} />
                      </View>
                      <View>
                        <Text style={tw`text-[16px] font-bold text-[#344054]`}>
                          Pay with POS
                        </Text>
                        <Text style={tw`text-[#667085] text-[12px] font-[400]`}>
                          Pay offline with your card via POS.
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedPaymentType("online");
                      }}
                      style={tw`flex-row items-center justify-start border border-[${
                        selectedPaymentType === "online" ? "#475467" : "#EAECF0"
                      }]  rounded-[6px] p-[16px] gap-[16px] relative overflow-hidden`}
                    >
                      {selectedPaymentType === "online" && (
                        <View
                          style={tw`absolute bg-[#475467] w-[32px] h-[16px] top-[-4px] right-[-10px] rotate-[-140deg]`}
                        />
                      )}
                      <View
                        style={tw`flex-row items-center justify-center bg-[#F2F4F7] rounded-full p-[16px] h-[32px] w-[32px]`}
                      >
                        <OnlineIcon w={16} h={16} />
                      </View>
                      <View>
                        <Text style={tw`text-[16px] font-bold text-[#344054]`}>
                          Pay online
                        </Text>
                        <Text style={tw`text-[#667085] text-[12px] font-[400]`}>
                          Pay online with your card.
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={tw`mt-[24px]`}>
                    <AppButton
                      onPress={() => {
                        navigation.navigate("AwaitingPayment", {
                          paymentType: selectedPaymentType,
                        });
                      }}
                      title={
                        selectedPaymentType === "online"
                          ? "Proceed to payment"
                          : "Notify waiter"
                      }
                      style={{
                        backgroundColor: "#1D2939",
                      }}
                      disabled={!selectedPaymentType}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
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
    borderRadius: 71,
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
    fontWeight: "400",
    textAlign: "center",
    marginTop: 8,
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
    marginTop: 60,
  },
});
