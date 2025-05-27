import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import {
  Card,
  Clock,
  Location,
  More,
  Receipt2,
  TickCircle,
} from "iconsax-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AppBackButton } from "../../../components/AppBackButton";
import { RootStackParamList } from "../../../navigation/RootNavigation";
import { colors } from "../../../utils/colors";
import { OrderedFrom } from "./OrderedFrom";
import { AppTextInput } from "../../../components/AppTextInput";
import { AppCheckBox } from "../Accounts/AppCheckBox";
import { AppButton } from "../../../components/AppButton";

type OrderSummaryScreenRouteProp = RouteProp<
  RootStackParamList,
  "OrderSummary"
>;

export const OrderSummaryScreen = () => {
  const route = useRoute<OrderSummaryScreenRouteProp>();
  const { order } = route.params;
  const [status, setStatus] = useState<
    "pending" | "confirmed" | "dispatched" | "completed"
  >(order.status);
  const [orderCompleted, setOrderCompleted] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(0);
  const orderDetails = [
    {
      label: "Dish 1",
      addOns: [
        {
          label: "Eguisi soup",
          price: 1200,
        },
        {
          label: "Assorted meats",
          price: 3200,
        },
        {
          label: "Trophy Lager",
          price: 1000,
        },
      ],
      meals: [
        {
          name: "White Eba",
          image:
            "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          quantity: 3,
          price: 1000,
          total: 3000,
        },
        {
          name: "Peppered roundabout fish",
          image:
            "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          quantity: 2,
          price: 1000,
          total: 2000,
        },
        {
          name: "Eva bottle water",
          image:
            "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          quantity: 1,
          price: 500,
          total: 500,
        },
      ],
    },
    {
      label: "Dish 2",
      addOns: [
        {
          label: "Coleslaw",
          price: 500,
        },
        {
          label: "Grilled Turkey",
          price: 3200,
        },
        {
          label: "5 Alive Pulpy",
          price: 1000,
        },
      ],
      meals: [
        {
          name: "Smokey Jollof Rice",
          image:
            "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          quantity: 1,
          price: 1200,
          total: 1200,
        },
        {
          name: "Fried Rice",
          image:
            "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          quantity: 1,
          price: 1500,
          total: 1500,
        },
        {
          name: "Plantains",
          image:
            "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          quantity: 3,
          price: 900,
          total: 2700,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppBackButton variant={2} />
        <Text style={styles.headerText}>Order Summary</Text>
      </View>
      {!order.isCompleted && (
        <View>
          {status === "pending" && (
            <View
              style={[
                styles.moreButtonContainer,
                {
                  backgroundColor: "#DC6803",
                  borderWidth: 1,
                  borderColor: "#EAECF0",
                },
              ]}
            >
              <View style={styles.moreButton}>
                <More size={24} color="#DC6803" />
              </View>
              <View>
                <Text style={styles.moreButtonText}>
                  Your payment is being confirmed.
                </Text>
                <Text style={styles.moreButtonText2}>
                  Please wait while we confirm your payment.
                </Text>
              </View>
            </View>
          )}
          {status === "confirmed" && (
            <View
              style={[
                styles.moreButtonContainer,
                {
                  backgroundColor: "#1570EF",
                  borderWidth: 1,
                  borderColor: "#EAECF0",
                },
              ]}
            >
              <View style={styles.moreButton}>
                <Clock size={24} variant="Bold" color="#1570EF" />
              </View>
              <View>
                <Text style={styles.moreButtonText}>
                  Your meal is being prepared.
                </Text>
                <Text style={[styles.moreButtonText2, { color: "#D1E9FF" }]}>
                  Your meal would be ready soon.
                </Text>
              </View>
            </View>
          )}
          {status === "dispatched" && (
            <View
              style={[
                styles.moreButtonContainer,
                {
                  backgroundColor: "#039855",
                  borderWidth: 1,
                  borderColor: "#EAECF0",
                },
              ]}
            >
              <View style={[styles.moreButton, { backgroundColor: "#fff" }]}>
                <TickCircle size={24} variant="Bold" color="#039855" />
              </View>
              <View>
                <Text style={styles.moreButtonText}>
                  Your meal is being dispatched.
                </Text>
                <Text style={[styles.moreButtonText2, { color: "#D1FADF" }]}>
                  Your meal would be delivered soon.
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
      <ScrollView>
        <View
          style={[
            styles.orderSummaryContainer,
            {
              marginVertical: 24,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.orderSummaryText}>Order ID: {order.id}</Text>
        </View>
        {/* Ordered From Card */}
        <View style={styles.orderedFromContainer}>
          <OrderedFrom
            logo={order?.restaurant.logo}
            name={order?.restaurant.name}
            address={order?.restaurant.address}
          />
        </View>

        {/* Order Details */}
        <View style={styles.orderDetailsContainer}>
          <View style={styles.orderDetailsItem}>
            {orderDetails.map((dish, dishIdx) => (
              <View
                key={dishIdx}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  marginBottom: 20,
                  padding: 16,
                  shadowColor: "#000",
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Text
                  style={{ fontWeight: "600", fontSize: 16, marginBottom: 12 }}
                >
                  {dish.label}
                </Text>
                {/* Meals */}
                {dish.meals.map((meal, mealIdx) => (
                  <View>
                    <View
                      key={mealIdx}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 12,
                        borderTopWidth: mealIdx === 0 ? 0 : 1,
                        borderTopColor: "#EAECF0",
                        paddingTop: 12,
                      }}
                    >
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 8,
                          overflow: "hidden",
                          marginRight: 12,
                          backgroundColor: "#F2F4F7",
                        }}
                      >
                        <Image
                          source={{ uri: meal.image }}
                          style={{ width: 60, height: 60, resizeMode: "cover" }}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "500", fontSize: 16 }}>
                          {meal.name}
                          <Text
                            style={{
                              fontWeight: "400",
                              fontSize: 14,
                              color: "#475467",
                            }}
                          >
                            {"  "}x{meal.quantity}
                          </Text>
                        </Text>
                      </View>
                      <Text style={{ fontWeight: "500", fontSize: 16 }}>
                        ₦{meal.total.toLocaleString()}
                      </Text>
                    </View>
                    {/* Add-ons */}
                    {mealIdx === 0 && (
                      <View style={{ marginTop: 8, marginBottom: 12 }}>
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 13,
                            color: "#667085",
                            marginBottom: 6,
                          }}
                        >
                          ADD-ONS
                        </Text>
                        {dish.addOns.map((addon, addonIdx) => (
                          <View
                            key={addonIdx}
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: 4,
                            }}
                          >
                            <Text style={{ color: "#667085", fontSize: 14 }}>
                              + {addon.label}
                            </Text>
                            <Text style={{ color: "#667085", fontSize: 14 }}>
                              ₦{addon.price.toLocaleString()}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.orderSummaryContainer}>
          <View style={styles.orderSummaryItemContainer}>
            <Location size={24} variant="Bold" color={colors.gray} />
            <View>
              <Text style={styles.orderSummaryItemText}>Delivery Address</Text>
              <Text style={styles.orderSummaryItemValue}>
                10, Cottage Crescent, Lekki 1, Lagos.
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.orderSummaryContainer2, { paddingBottom: 80 }]}>
          <View style={styles.orderSummaryItemContainer}>
            <View style={styles.orderSummaryItemContainer2}>
              <Text style={styles.orderSummaryItemText}>Subtotal</Text>
              <Text style={styles.orderSummaryItemValue}>₦15,300</Text>
            </View>
          </View>
          <View
            style={[
              styles.orderSummaryItemContainer2,
              { borderBottomWidth: 0, paddingHorizontal: 16 },
            ]}
          >
            <Text style={styles.orderSummaryItemText}>Discounts</Text>
            <Text style={styles.orderSummaryItemValue}>₦1,000</Text>
          </View>
          <View
            style={[
              styles.orderSummaryItemContainer2,
              { borderBottomWidth: 1, paddingHorizontal: 16 },
            ]}
          >
            <Text style={styles.orderSummaryItemText}>Tax</Text>
            <Text style={styles.orderSummaryItemValue}>₦1,000</Text>
          </View>
          <View
            style={[
              styles.orderSummaryItemContainer2,
              {
                borderBottomWidth: 0,
                paddingHorizontal: 16,
                paddingTop: 16,
              },
            ]}
          >
            <Text style={styles.orderSummaryItemText}>Total</Text>
            <Text style={styles.orderSummaryItemValue}>₦1,000</Text>
          </View>
          <View
            style={[
              styles.orderSummaryItemContainer2,
              {
                borderBottomWidth: 0,
                paddingHorizontal: 16,
                paddingTop: 16,
              },
            ]}
          >
            <View style={styles.orderSummaryItemContainer3}>
              <Card size={24} color={colors.seaGreen} />
              <Text style={styles.orderSummaryItemText}>Paid online</Text>
            </View>
            <Text style={styles.orderSummaryItemValue}>₦1,000</Text>
          </View>

          {status !== "pending" && (
            <View style={styles.orderSummaryItemContainer3}>
              <TouchableOpacity style={styles.orderSummaryItemContainer4}>
                <Receipt2 size={20} variant="Bold" color={colors.seaGreen} />
                <Text
                  style={[
                    styles.orderSummaryItemText,
                    { color: colors.seaGreen, fontWeight: "600" },
                  ]}
                >
                  Download Receipt
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      {order.isCompleted && (
        <Modal visible={orderCompleted} transparent={true} animationType="fade">
          <TouchableWithoutFeedback
            onPress={() => {
              setOrderCompleted(false);
            }}
          >
            <View style={styles.modalContainer}>
              <ScrollView style={styles.modalContent}>
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View>
                    <View style={styles.modalHeader}>
                      <TickCircle
                        size={72}
                        variant="Bold"
                        color={colors.seaGreen}
                      />
                      <Text style={styles.modalHeaderText}>
                        Your order has arrived
                      </Text>
                      <Text style={styles.modalHeaderText2}>
                        We hope your order arrived just as you expected. Your
                        feedback helps us improve and serve you better. Please
                        take a moment to rate your experience.
                      </Text>
                    </View>
                    <View style={styles.modalFooter}>
                      <Text style={styles.modalFooterText}>
                        Rate your experience at Genesis Foods
                      </Text>
                      {/* Stars */}
                      <View style={styles.modalFooterButtonContainer}>
                        <TouchableOpacity
                          style={styles.modalFooterButton}
                          onPress={() => setRating(1)}
                        >
                          <Ionicons
                            name="star"
                            size={40}
                            color={rating >= 1 ? colors.yellow : colors.gray}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.modalFooterButton}
                          onPress={() => setRating(2)}
                        >
                          <Ionicons
                            name="star"
                            size={40}
                            color={rating >= 2 ? colors.yellow : colors.gray}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.modalFooterButton}
                          onPress={() => setRating(3)}
                        >
                          <Ionicons
                            name="star"
                            size={40}
                            color={rating >= 3 ? colors.yellow : colors.gray}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.modalFooterButton}
                          onPress={() => setRating(4)}
                        >
                          <Ionicons
                            name="star"
                            size={40}
                            color={rating >= 4 ? colors.yellow : colors.gray}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.modalFooterButton}
                          onPress={() => setRating(5)}
                        >
                          <Ionicons
                            name="star"
                            size={40}
                            color={rating >= 5 ? colors.yellow : colors.gray}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.modalFooterButtonContainer2}>
                        <Text style={styles.modalFooterButtonText}>
                          Tell us more about your experience
                        </Text>
                        <AppTextInput placeholder="What was the experience like?" />

                        <View style={styles.modalFooterButtonContainer3}>
                          <AppCheckBox
                            label="I confirm i received my order"
                            checked={true}
                            onPress={() => {}}
                          />
                        </View>
                      </View>

                      <AppButton
                        title="Submit"
                        onPress={() => {
                          if (rating === 0) {
                            Alert.alert("Please rate your experience");
                          } else {
                            Alert.alert("Thank you for your feedback");
                          }
                        }}
                        style={{ width: "100%", marginTop: 16 }}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Constants.statusBarHeight + 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 4,
    // marginBottom: 18,
    backgroundColor: "white",
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292F36",
  },
  moreButton: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 40,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  moreButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  moreButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.white,
  },
  moreButtonText2: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FEF0C7",
  },
  moreButtonIcon: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 40,
    height: 40,
    width: 40,
  },
  orderSummaryContainer: {
    paddingHorizontal: 20,
  },
  orderSummaryText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#475467",
  },
  orderedFromContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  orderDetailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  orderDetailsText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#475467",
  },
  orderDetailsItem: {
    gap: 12,
  },
  orderDetailsItemText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#475467",
  },
  orderDetailsItemValue: {
    fontSize: 14,
    fontWeight: "400",
    color: "#1D2939",
  },

  orderSummaryItemText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#475467",
  },
  orderSummaryItemValue: {
    fontSize: 14,
    fontWeight: "400",
    color: "#1D2939",
  },
  orderSummaryItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    paddingVertical: 16,
  },
  orderSummaryContainer2: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  orderSummaryItemContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 12,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#EAECF0",
    paddingBottom: 16,
  },
  orderSummaryItemContainer3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  orderSummaryItemContainer4: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#EAF0EE",
    padding: 16,
    borderRadius: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    maxHeight: "80%",
  },
  modalHeader: {
    alignItems: "center",
    gap: 12,
    padding: 16,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292F36",
  },
  modalHeaderText2: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: "#475467",
  },
  modalFooter: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  modalFooterText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#475467",
  },
  modalFooterButtonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  modalFooterButton: {
    borderRadius: 12,
  },
  modalFooterButtonContainer2: {
    gap: 12,
  },
  modalFooterButtonContainer3: {
    flexDirection: "row",
    gap: 12,
  },
  modalFooterButtonText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#475467",
  },
});
