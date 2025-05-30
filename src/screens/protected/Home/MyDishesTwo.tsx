import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppBackButton } from "../../../components/AppBackButton";

// import { RestaurantHeader } from "../../../components/RestaurantHeader";
// import { styles } from "../../../styles/styles";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { AppButton } from "../../../components/AppButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import tw from "twrnc";
import {
  AddCircle,
  Location,
  MessageAdd,
  More,
  Trash,
} from "iconsax-react-native";
import { colors } from "../../../utils/colors";
import { DininingIcon } from "../../../utils/Icons";

type RootStackParamList = {
  Home: undefined;
  Restaurantmenu: undefined;
  Main: undefined;
};

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export const MyDishesTwo = () => {
  const navigation = useNavigation();
  const dishes = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [makePayment, setMakePayment] = useState(false);

  console.log(dishes);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: Constants.statusBarHeight + 16,
          paddingBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#fff",
        }}
      >
        <AppBackButton variant={2} size={20} />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>My dishes</Text>
      </View>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {dishes.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#667085", fontWeight: "bold" }}>
            Your cart is empty
          </Text>
          <Text style={{ fontSize: 14, color: "#667085" }}>
            You have not added anything yet.
          </Text>
          <AppButton
            title="Explore Restaurants"
            style={{ width: "80%", marginTop: 44 }}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "Main" as never,
                    state: {
                      routes: [{ name: "Home" as never }],
                    },
                  },
                ],
              });
            }}
          />
        </View>
      )}
      {dishes.length > 0 && (
        <FlatList
          style={{ flex: 1, padding: 16 }}
          data={dishes}
          renderItem={({ item }) => {
            const idx = dishes.indexOf(item);

            return (
              <View
                style={tw`bg-[#fff]  [${
                  idx === 0 ? "rounded-[16px]" : ""
                }] mt-1 border-[1px] border-[#D1D5DB] `}
              >
                <Text
                  style={tw`text-[14px] p-[16px] pb-0 text-[#1D2939] font-bold mb-[8px]`}
                >
                  {item.restaurantName}
                </Text>
                <View
                  style={tw`flex-row p-[16px] items-center mb-[8px] gap-[16px] h-[112px] relative`}
                >
                  <Image source={item.image} style={tw`w-[80px] h-[80px]`} />
                  <View style={tw`flex-1 `}>
                    <Text style={tw`text-[16px] text-[#1D2939] font-semibold`}>
                      {item.name}
                    </Text>
                    <View style={tw`flex-row items-center gap-[4px]`}>
                      <Text style={tw`text-[14px] text-[#475467] font-normal`}>
                        {item.price}{" "}
                      </Text>
                      <View style={tw`h-1 w-1 bg-[#1D2939] rounded-full`} />
                      <Text style={tw`text-[14px] text-[#475467] font-normal`}>
                        x{item.quantity}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <More size={20} color="#667085" />
                  </TouchableOpacity>
                </View>
                <View style={tw`bg-[#F9FAFB] p-[16px]`}>
                  <Text style={tw`text-[13px] text-[#667085] mb-[8px]`}>
                    ADD-ONS
                  </Text>
                  <View
                    style={tw`flex-row items-center justify-between gap-[8px] mb-[8px]`}
                  >
                    <Text style={tw`text-[14px] text-[#344054]`}>
                      + {item.side?.name}
                    </Text>
                    <Text style={tw`text-[14px] text-[#667085]`}>
                      {item.side?.price}
                    </Text>
                  </View>
                  {item.proteins?.map((protein, index) => (
                    <View
                      style={tw`flex-row items-center justify-between gap-[8px] mb-[8px]`}
                    >
                      <Text style={tw`text-[14px] text-[#344054]`}>
                        + {protein?.name}
                      </Text>
                      <Text style={tw`text-[14px] text-[#667085]`}>
                        {protein?.price}
                      </Text>
                    </View>
                  ))}
                  <View
                    style={tw`flex-row items-center justify-between gap-[8px] mb-[8px]`}
                  >
                    <Text style={tw`text-[14px] text-[#344054]`}>
                      + {item.drink?.name}
                    </Text>
                    <Text style={tw`text-[14px] text-[#667085]`}>
                      {item.drink?.price}
                    </Text>
                  </View>
                </View>
                <View
                  style={tw`flex-row items-center p-[16px] gap-[8px] max-w-full`}
                >
                  <TouchableOpacity
                    style={tw`flex-row items-center gap-[8px] border-[1px] border-[#FDA29B] h-[40px] w-[40px] justify-center rounded-[8px] `}
                  >
                    <Trash size={20} color={"#D92D20"} variant="Bold" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`flex-row items-center gap-[8px] border-[1px] border-[#D0D5DD] h-[40px] flex-1 justify-center rounded-[8px]`}
                  >
                    <AddCircle size={20} color="#344054" variant="Bold" />
                    <Text>Add items to this dish</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString() as string}
          ListFooterComponent={() => (
            <View style={tw`pb-[24px]`}>
              <View
                style={tw`flex-row bg-[#fff]  items-center gap-[8px] mb-[24px] p-[16px] rounded-sm`}
              >
                <Text style={tw`text-[16px] text-[#475467]`}>More people?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [
                        {
                          name: "Main",
                          state: {
                            index: 0,
                            routes: [
                              {
                                name: "Home",
                                // state: {
                                //   index: 0,
                                //   routes: [
                                //     {
                                //       name: "RestaurantMenu",
                                //       params: {
                                //         externalDelivery: true,
                                //         mealId: route.params?.mealId,
                                //       },
                                //     },
                                //   ],
                                // },
                              },
                            ],
                          },
                        },
                      ],
                    });
                  }}
                >
                  <Text style={tw`text-[16px] text-[#01894D] font-bold`}>
                    Add another dish
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Preview dishes */}

              {!makePayment && (
                <View style={tw`justify-center items-center w-full`}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setMakePayment(true)}
                    style={tw`w-[229px] h-[60px] bg-[${colors.seaGreen}] rounded-[120px]  justify-center flex-row items-center gap-[8px] gap-[16px]`}
                  >
                    <View style={tw`relative`}>
                      <View
                        style={tw`absolute top-[4px] right-[0px] bg-[#fff] min-w-[15px] min-h-[15px] rounded-full justify-center items-center`}
                      >
                        <Text style={tw`text-[12px] text-[#000]`}>
                          {dishes.length}
                        </Text>
                      </View>
                      <DininingIcon w={40} h={40} color={colors.white} />
                    </View>
                    <View>
                      <Text style={tw`text-[16px] text-[#fff]`}>
                        Preview your dishes
                      </Text>
                      <Text style={tw`text-[14px] text-[#CCE7DB]`}>
                        ₦8,950.00
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              {makePayment && (
                <View>
                  <View
                    style={tw`flex-row items-start p-[16px] bg-[#fff] gap-[8px] mb-[8px] h-[108px] gap-[12px]`}
                  >
                    <Location size={20} color={colors.gray} variant="Bold" />
                    <View>
                      <Text style={tw`text-[#475467] text-[14px]`}>
                        Delivery address
                      </Text>
                      <Text style={tw`text-[#344054] text-[16px] font-bold`}>
                        10, Cottage Crescent, Lekki 1, Lagos.
                      </Text>
                      <TouchableOpacity
                        style={tw`mt-[8px]`}
                        onPress={() =>
                          navigation.navigate("HomeAddress" as never)
                        }
                      >
                        <Text style={tw`text-[#01894D] text-[16px] font-bold`}>
                          Change
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={tw`min-h-[260px] bg-[#fff] mt-[20px]`}>
                    <View
                      style={tw`flex-row items-center justify-between p-[16px] border-b-[1px] border-[#D1D5DB]`}
                    >
                      <Text style={tw`text-[14px] text-[#475467]`}>
                        Subtotal
                      </Text>
                      <Text style={tw`text-[14px] text-[#1D2939]`}>
                        ₦8,950.00
                      </Text>
                    </View>
                    <View>
                      <View
                        style={tw`flex-row items-center justify-between p-[16px] `}
                      >
                        <Text style={tw`text-[14px] text-[#475467]`}>
                          Discounts
                        </Text>
                        <Text style={tw`text-[14px] text-[#1D2939]`}>₦0</Text>
                      </View>
                      <View
                        style={tw`flex-row items-center justify-between p-[16px] border-b-[1px] border-[#D1D5DB]`}
                      >
                        <Text style={tw`text-[14px] text-[#475467]`}>Tax</Text>
                        <Text style={tw`text-[14px] text-[#1D2939]`}>₦0</Text>
                      </View>

                      <View
                        style={tw`flex-row items-center justify-between p-[16px] border-b-[1px] border-[#D1D5DB]`}
                      >
                        <Text style={tw`text-[14px] text-[#475467]`}>
                          Total pack charge{" "}
                          <Text style={tw`text-[14px] text-[#98A2B3]`}>
                            / 2 items
                          </Text>
                        </Text>
                        <Text style={tw`text-[14px] text-[#1D2939]`}>
                          ₦2,000
                        </Text>
                      </View>
                      <View>
                        <View
                          style={tw`flex-row items-center justify-between p-[16px]`}
                        >
                          <Text style={tw`text-[14px] text-[#475467]`}>
                            Total
                          </Text>
                          <Text style={tw`text-[14px] text-[#1D2939]`}>
                            ₦10,950.00
                          </Text>
                        </View>

                        <AppButton
                          style={tw`mx-[16px] mt-[16px]`}
                          title="Place order"
                          onPress={() => setMakePayment(false)}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};
