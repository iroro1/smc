import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";

export const OrderedFrom = ({
  logo,
  name,
  address,
}: {
  logo: string;
  name: string;
  address: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.orderedFromText}>Ordered From</Text>
      <View style={styles.infoContainer}>
        <Image source={{ uri: logo }} style={styles.logo} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    minHeight: 104,
    gap: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EAECF0",
  },
  orderedFromText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#475467",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 48,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D2939",
  },
  address: {
    fontSize: 14,
    color: "#667085",
    marginTop: 4,
  },
});
