import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Carousel } from "../../components/Carousel";
import { colors } from "../../utils/colors";

type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { height: screenHeight } = Dimensions.get("window");

const SlideText = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <View style={styles.slideTextContainer}>
    <Text style={styles.slideTitle}>{title}</Text>
    {subtitle && <Text style={styles.slideSubtitle}>{subtitle}</Text>}
  </View>
);

const onboardingImages = [
  {
    uri: require("../../../assets/images/onboarding/one.png"),
    text: (
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "light",
          textAlign: "left",
          marginBottom: 10,
          width: 280,
          position: "absolute",
          bottom: "35%",
          left: 20,
        }}
      >
        Enjoy a{" "}
        <Text
          style={{
            fontWeight: "light",
            fontStyle: "italic",
            color: colors.yellow,
          }}
        >
          seamless dining experience
        </Text>
        , in and out of restaurants!
      </Text>
    ),
  },
  {
    uri: require("../../../assets/images/onboarding/two.png"),
    text: (
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "light",
          textAlign: "left",
          marginBottom: 10,
          width: 280,
          position: "absolute",
          bottom: "35%",
          left: 20,
        }}
      >
        Enjoy a{" "}
        <Text
          style={{
            fontWeight: "light",
            fontStyle: "italic",
            color: colors.yellow,
          }}
        >
          seamless dining experience
        </Text>
        , in and out of restaurants!
      </Text>
    ),
  },
];

const carouselStyles = {
  containerStyle: {
    backgroundColor: "#f5f5f5",
    height: screenHeight * 0.7,
  },
  overlayStyle: {},
};

export const OnboardingScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <Carousel
        images={onboardingImages}
        autoPlayInterval={4000}
        containerStyle={carouselStyles.containerStyle}
        overlayStyle={carouselStyles.overlayStyle}
        height={screenHeight}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateAccount")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.buttonSpacer} />
        <TouchableOpacity
          style={styles.buttonTwo}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonTextTwo}>Log in to your account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    padding: 20,
    marginTop: 20,
  },
  buttonSpacer: {
    height: 10,
  },
  button: {
    backgroundColor: colors.seaGreen,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonTwo: {
    backgroundColor: colors.seaGreen + 20,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  buttonTextTwo: {
    color: colors.seaGreen,
    fontSize: 16,
    fontWeight: "500",
  },
  slideTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  slideTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  slideSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
  },
});
