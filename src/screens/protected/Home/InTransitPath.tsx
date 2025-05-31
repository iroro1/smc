import { useNavigation } from "@react-navigation/native";
import {
  ArrowDown2,
  Call,
  CloseCircle,
  Location,
  TickCircle,
} from "iconsax-react-native";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import tw from "twrnc";
import { AppBackButton } from "../../../components/AppBackButton";
import { AppButton } from "../../../components/AppButton";
import { colors } from "../../../utils/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";

//  import { RootStackParamList } from "../../../navigation/RootNavigation";
type IconProps = { w: number; h: number; color: string };

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

const Transiticon = ({ w = 24, h = 24 }: IconProps) => (
  <Svg width={w} height={h} viewBox="0 0 19 30" fill="none">
    <Path
      d="M9.5011 0.28125C5.5911 0.28125 1.7211 0.92125 1.7211 0.92125C1.4061 0.97125 1.1761 1.24375 1.1811 1.56125V4.76125C1.1786 4.94875 1.2586 5.12875 1.4036 5.25375C1.5461 5.37625 1.7336 5.43125 1.9211 5.40125C1.9211 5.40125 2.1611 5.36875 2.4811 5.32125L3.0611 15.0012H1.1811C1.1611 15.0012 1.1411 15.0012 1.1211 15.0012C1.1011 15.0012 1.0811 15.0012 1.0611 15.0012C0.756099 15.0588 0.536099 15.3287 0.541099 15.6412V18.2013C0.541099 18.5537 0.828599 18.8412 1.1811 18.8412H1.8211V29.0812C1.8211 29.4337 2.1086 29.7212 2.4611 29.7212H4.3811C4.7336 29.7212 5.0211 29.4337 5.0211 29.0812V22.0413H13.9811V29.0812C13.9811 29.4337 14.2686 29.7212 14.6211 29.7212H16.5411C16.8936 29.7212 17.1811 29.4337 17.1811 29.0812V18.8412H17.8211C18.1736 18.8412 18.4611 18.5537 18.4611 18.2013V15.6412C18.4611 15.2887 18.1736 15.0012 17.8211 15.0012H15.9411L16.5211 5.32125C16.8411 5.36875 17.0811 5.40125 17.0811 5.40125C17.2686 5.43125 17.4561 5.37625 17.5986 5.25375C17.7436 5.12875 17.8236 4.94875 17.8211 4.76125V1.56125C17.8261 1.24375 17.5961 0.97125 17.2811 0.92125C17.2811 0.92125 13.4111 0.28125 9.5011 0.28125ZM9.5011 1.56125C12.8411 1.56125 15.8186 2.00875 16.5411 2.12125V4.02125C15.6261 3.88125 12.9111 3.49125 9.6411 3.48125C9.5761 3.46375 9.5086 3.45625 9.4411 3.46125C9.4136 3.46625 9.3861 3.47375 9.3611 3.48125C6.0911 3.49125 3.3761 3.88125 2.4611 4.02125V2.12125C3.1836 2.00875 6.1611 1.56125 9.5011 1.56125ZM8.8611 4.76125V15.0012H7.2411L6.9611 4.84125C7.5786 4.80375 8.2111 4.77375 8.8611 4.76125ZM10.1411 4.76125C10.7911 4.77375 11.4236 4.80375 12.0411 4.84125L11.7611 15.0012H10.1411V4.76125ZM5.6811 4.96125L5.9611 15.0012H4.3411L3.7611 5.14125C4.3161 5.07375 4.9561 5.02625 5.6811 4.96125ZM13.3211 4.96125C14.0461 5.02625 14.6861 5.07375 15.2411 5.14125L14.6611 15.0012H13.0411L13.3211 4.96125ZM1.8211 16.2812H17.1811V17.5612H1.8211V16.2812ZM3.1011 18.8412H3.7411V21.1012C3.6561 21.2787 3.6561 21.4837 3.7411 21.6612V28.4412H3.1011V18.8412ZM5.0211 18.8412H13.9811V20.7612H5.0211V18.8412ZM15.2611 18.8412H15.9011V28.4412H15.2611V21.5212C15.2786 21.4363 15.2786 21.3463 15.2611 21.2612V18.8412Z"
      fill="url(#paint0_linear_6694_25149)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_6694_25149"
        x1="5.50098"
        y1="-2.87864e-07"
        x2="19.501"
        y2="23.5"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#DD2E44" />
        <Stop offset="0.481431" stopColor="#66757F" />
        <Stop offset="1" stopColor="#E1E8ED" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export const InTransitPath = () => {
  const navigation = useNavigation();
  const [tableNumber, setTableNumber] = useState<string>("");
  const [tableModal, setTableModal] = useState<boolean>(false);
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

  const [path, setPath] = useState<string>("1");

  const [timeModal, setTimeModal] = useState<boolean>(false);

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time: Date) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  const [isTimePickerVisible2, setTimePickerVisibility2] = useState(false);
  const [selectedTime2, setSelectedTime2] = useState(new Date());

  const showTimePicker2 = () => {
    setTimePickerVisibility2(true);
  };

  const hideTimePicker2 = () => {
    setTimePickerVisibility2(false);
  };

  const handleConfirm2 = (time: Date) => {
    setSelectedTime2(time);
    hideTimePicker2();
  };
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
          <Text style={styles.promptText}>Dine-in order</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionCard} onPress={() => {}}>
            <DeliveryIcon w={48} h={48} color="#FF5A5F" />
            <Text style={styles.optionTitle}>Seated</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => {}}>
            <Transiticon w={48} h={48} color="#FF5A5F" />
            <Text style={styles.optionTitle}>In transit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => {}}>
            <DiningIcon w={48} h={48} color="#FF5A5F" />
            <Text style={styles.optionTitle}>Takeout</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>Powered by Smart Menu Limited.</Text>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={path === "1" ? true : false}
        onRequestClose={() => Alert.alert("Modal has been closed.")}
      >
        <View style={tw`flex-1 justify-end items-center bg-[#00000025]`}>
          <View
            style={tw`bg-[#fff] p-[16px] rounded-t-[24px] w-[100%] h-[${
              tableModal ? "80%" : "60%"
            }] relative`}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={tw`absolute top-[16px] right-[16px]`}
            >
              <CloseCircle size={24} color="#667085" variant="Bold" />
            </TouchableOpacity>
            <Text
              style={tw`text-[#1D2939] text-[20px] font-bold text-left mt-[16px]`}
            >
              Reserve your table
            </Text>
            <Text
              style={tw`text-[#292F36] text-[16px] font-[400] text-left mt-[8px] leading-[24px]`}
            >
              Select your table number to continue with your order.
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
                  {(tableNumber && `Table ${tableNumber}`) ||
                    "Select table number"}
                </Text>

                <ArrowDown2 size={16} color="#292F3699" />
              </TouchableOpacity>
            </View>
            {/*  */}
            {tableModal && (
              <View
                style={tw`mt-[16px]  absolute bg-[#fff] top-[25%] left-[16px] translate-x-[-50%] translate-y-[-50%] p-[16px] rounded-[6px] z-10 w-full border border-[#F1F5F9] h-[75%] shadow-sm`}
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
                      <Text style={tw`text-[#667085] text-[14px] font-[400]`}>
                        Table{tableNumber}
                      </Text>
                      <Text style={tw`text-[#667085] text-[16px] font-bold`}>
                        {item}
                      </Text>

                      {tableNumber === item && (
                        <View
                          style={tw`bg-[#2E90FA] w-[24px] min-h-[12px] absolute -top-1 -right-1 rounded-full py-1 flex-row items-center justify-center `}
                        >
                          <TickCircle size={8} variant="Bold" color="#fff" />
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
                  // navigation.navigate("MyDishesTwo");
                  setPath("2");
                }}
                title="Reserve table"
                style={tw`mt-[24px]`}
                disabled={!tableNumber}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={path === "2" ? true : false}
        onRequestClose={() => Alert.alert("Modal has been closed.")}
      >
        <View style={tw`flex-1 justify-end items-center bg-[#00000025]`}>
          <View
            style={tw`bg-[#fff] p-[16px] rounded-t-[24px] w-[100%] h-[${
              timeModal ? "80%" : "60%"
            }] relative`}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={tw`absolute top-[16px] right-[16px]`}
            >
              <CloseCircle size={24} color="#667085" variant="Bold" />
            </TouchableOpacity>
            <View>
              <Text
                style={tw`text-[#1D2939] text-[20px] font-bold text-left mt-[16px]`}
              >
                Select time
              </Text>
              <Text
                style={tw`text-[#292F36] text-[16px] font-[400] text-left mt-[8px] leading-[24px]`}
              >
                Select your preferred reservation time to continue with your
                order.
              </Text>

              <TouchableOpacity
                onPress={showTimePicker}
                style={tw`mt-[16px] flex-row gap-[30px]`}
              >
                <Text
                  style={tw`text-[#98A2B3] w-[59px] text-[18px] font-[600]`}
                >
                  From{" "}
                </Text>
                <View
                  style={tw`bg-[#EDEDED] flex-1 h-[32px] rounded-[6px] flex-row items-center justify-center`}
                >
                  <Text style={tw`text-[#717370] text-[16px] font-bold`}>
                    {selectedTime.toLocaleTimeString() || "00:00 pm"}
                  </Text>

                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideTimePicker}
                    textColor="#000"
                    date={selectedTime}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={showTimePicker2}
                style={tw` mt-[16px] flex-row gap-[30px]`}
              >
                <Text
                  style={tw`text-[#98A2B3] w-[59px] text-[18px] font-[600]`}
                >
                  To{" "}
                </Text>
                <View
                  style={tw`bg-[#EDEDED] flex-1 h-[32px] rounded-[6px] flex-row items-center justify-center`}
                >
                  <Text style={tw`text-[#717370] text-[16px] font-bold`}>
                    {selectedTime2.toLocaleTimeString() || "00:00 pm"}
                  </Text>
                  <DateTimePickerModal
                    isVisible={isTimePickerVisible2}
                    mode="time"
                    onConfirm={handleConfirm2}
                    onCancel={hideTimePicker2}
                    textColor="#000"
                    date={selectedTime2}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={tw`mt-auto mb-[24px]`}>
              <AppButton
                onPress={() => {
                  navigation.navigate("MyDishesTwo" as never);
                }}
                title="Confirm reservation"
                style={tw`mt-[24px]`}
                // disabled={from === "" || to === ""}
              />
            </View>
          </View>
        </View>
      </Modal>
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
