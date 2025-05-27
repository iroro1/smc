import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../utils/colors";

export default function AppAvatar({
  size = 40,
  source,
  borderWidth = 0,
  borderColor = colors.gray,
  borderRadius = 0,
  borderStyle = "solid" as any,
  initials,
  onPress,
}: {
  size?: number;
  source?: {
    uri: string;
  };
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  borderStyle?: any;
  initials?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#E5F3ED",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {source && (
        <Image
          source={source}
          style={[
            styles.avatar,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
          resizeMode="cover"
        />
      )}
      {!source && initials && (
        <Text style={[{ fontSize: size / 2.5, color: colors.seaGreen }]}>
          {initials.charAt(0).toUpperCase() + initials.charAt(1).toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: colors.gray,
    borderRadius: 0,
  },
  initials: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
  initialsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: "center",
    backgroundColor: colors.seaGreen,
    borderRadius: 40,
  },
});
