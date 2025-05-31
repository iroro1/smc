import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const MenuScannerScreen = () => {
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

  return (
    <View style={styles.container}>
      <Text
        style={tw`text-2xl font-bold text-center text-gray-800 bg-white p-4 rounded-lg`}
      >
        Dinning Options Coming Soon {selectedTime.toLocaleTimeString()}
      </Text>
      <Button title="Show Time Picker" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        textColor="#000"
        date={selectedTime}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
  },
});
