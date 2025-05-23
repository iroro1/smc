import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { colors } from "../utils/colors";

export const AppTextInput = (
  props: TextInputProps & { inputTitle?: string }
) => {
  return (
    <View style={styles.container}>
      {props.inputTitle && (
        <Text style={styles.inputTitle}>{props.inputTitle}</Text>
      )}
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    height: 44,
    borderRadius: 4,
    padding: 10,
  },
  inputText: {
    fontSize: 16,
    fontWeight: "400",
  },
});
