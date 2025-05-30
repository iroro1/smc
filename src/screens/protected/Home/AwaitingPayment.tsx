import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import { AppBackButton } from "../../../components/AppBackButton";
import Constants from "expo-constants";
import { useRoute } from "@react-navigation/native";
import { CashIcon, OnlineIcon, PosIcon } from "./SeatedPath";
import { AppButton } from "../../../components/AppButton";
const AwaitingPayment = () => {
  const route = useRoute();
  const [screenPart, setScreenPart] = React.useState("offline");
  const paymentType = route.params.paymentType;
  console.log("paymentType", paymentType);

  useEffect(() => {
    if (paymentType === "online") {
      setScreenPart("online");
    }
  }, [paymentType]);

  return (
    <View style={tw`flex-1`}>
      <View
        style={tw`flex-row items-center justify-start mb-4 pt-[${
          Constants.statusBarHeight + 16
        }] bg-white px-[16px]`}
      >
        <AppBackButton variant={2} />
        {screenPart === "offline" && <Text>Awaiting payment</Text>}
        {screenPart === "online" && <Text>Online payment</Text>}
      </View>
      {screenPart === "offline" && (
        <View style={tw`flex-1 justify-center items-center`}>
          <View
            style={tw`w-[295px] h-[268px] bg-white rounded-sm p-[16px] justify-start items-center`}
          >
            {paymentType === "cash" && (
              <View style={tw`flex-row items-center justify-center mb-[16px]`}>
                <View
                  style={tw`justify-center items-center h-[72px] w-[72px] bg-[#F2F4F7] rounded-full`}
                >
                  <CashIcon w={40} h={40} />
                </View>
              </View>
            )}
            {paymentType === "pos" && (
              <View style={tw`flex-row items-center justify-center mb-[16px]`}>
                <View
                  style={tw`justify-center items-center h-[72px] w-[72px] bg-[#F2F4F7] rounded-full`}
                >
                  <PosIcon w={40} h={40} />
                </View>
              </View>
            )}

            <Text style={tw`text-[16px] mb-[8px] text-[#1D2939] font-bold`}>
              {paymentType !== "online" && "Awaiting offline payment"}
            </Text>
            {paymentType !== "online" && (
              <Text style={tw`text-[14px] text-[#475467] text-center`}>
                A waiter would attend to you shortly to collect your payment.
                Please prepare either cash or your debit card.
              </Text>
            )}

            {paymentType !== "online" && (
              <View>
                <TouchableOpacity
                  onPress={() => setScreenPart("online")}
                  style={tw`flex-row items-center gap-[8px] justify-center mt-[16px] px-[4px] min-w-[147px] h-[40px] bg-[#F2F4F7] rounded-sm`}
                >
                  <OnlineIcon w={16} h={16} />
                  <Text style={tw`text-[14px] text-[#1D2939]`}>
                    Pay online instead
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}

      {paymentType === "online" ||
        (screenPart === "online" && (
          <View>
            <Text>
              To pay online, please enter your email address below and tap the
              proceed button.
            </Text>
          </View>
        ))}
    </View>
  );
};

export default AwaitingPayment;

const styles = StyleSheet.create({});
