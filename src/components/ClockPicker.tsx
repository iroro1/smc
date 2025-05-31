import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  LayoutChangeEvent,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface ClockPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: string) => void;
}

const ClockPicker: React.FC<ClockPickerProps> = ({
  isOpen,
  onClose,
  onTimeSelect,
}) => {
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [center, setCenter] = useState({ x: 0, y: 0 });

  const handleLayout = (e: LayoutChangeEvent) => {
    const { x, y, width, height } = e.nativeEvent.layout;
    setCenter({ x: width / 2, y: height / 2 });
  };

  const handleClockPress = (x: number, y: number) => {
    const dx = x - center.x;
    const dy = y - center.y;
    const angle = Math.atan2(dy, dx);
    const degrees = (angle * 180) / Math.PI + 90;
    const normalized = degrees < 0 ? degrees + 360 : degrees;
    const newHour = Math.round(normalized / 30) % 12;
    setHour(newHour === 0 ? 12 : newHour);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        handleClockPress(locationX, locationY);
      },
    })
  ).current;

  const formatTime = () => {
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const handleOk = () => {
    onTimeSelect(formatTime());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select time</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close" size={20} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Time Display */}
          <View style={styles.timeDisplay}>
            <Text style={styles.timeBox}>{hour}</Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.timeBox}>
              {minute.toString().padStart(2, "0")}
            </Text>
            <View style={styles.amPmContainer}>
              {["AM", "PM"].map((p) => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPeriod(p as "AM" | "PM")}
                  style={[
                    styles.periodBtn,
                    period === p && styles.activePeriod,
                  ]}
                >
                  <Text
                    style={[
                      styles.periodText,
                      period === p && styles.activePeriodText,
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Clock */}
          <View style={styles.clockWrapper}>
            <View
              style={styles.clock}
              onLayout={handleLayout}
              {...panResponder.panHandlers}
            >
              {[...Array(12)].map((_, i) => {
                const angle = ((i * 30 - 90) * Math.PI) / 180;
                const x = Math.cos(angle) * 90 + 100;
                const y = Math.sin(angle) * 90 + 100;
                return (
                  <Text
                    key={i}
                    style={[
                      styles.clockNumber,
                      {
                        left: x,
                        top: y,
                      },
                    ]}
                  >
                    {i === 0 ? 12 : i}
                  </Text>
                );
              })}
              <View
                style={[
                  styles.clockHand,
                  {
                    transform: [
                      {
                        rotate: `${hour * 30 - 90}deg`,
                      },
                    ],
                  },
                ]}
              />
              <View style={styles.centerDot} />
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.okButton} onPress={handleOk}>
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ClockPicker;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    color: "#555",
  },
  timeDisplay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  timeBox: {
    fontSize: 32,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#1b873f",
    color: "white",
    borderRadius: 8,
    minWidth: 64,
    textAlign: "center",
  },
  colon: {
    fontSize: 32,
    marginHorizontal: 4,
    color: "#222",
  },
  amPmContainer: {
    marginLeft: 12,
    justifyContent: "center",
  },
  periodBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 6,
  },
  periodText: {
    fontSize: 14,
    color: "#555",
  },
  activePeriod: {
    backgroundColor: "#d1fae5",
    borderWidth: 1,
    borderColor: "#34d399",
  },
  activePeriodText: {
    color: "#047857",
    fontWeight: "bold",
  },
  clockWrapper: {
    alignItems: "center",
    marginBottom: 24,
  },
  clock: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#f0f0f0",
    position: "relative",
  },
  clockNumber: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    transform: [{ translateX: -8 }, { translateY: -8 }],
  },
  clockHand: {
    width: 80,
    height: 4,
    backgroundColor: "#1b873f",
    position: "absolute",
    top: 100,
    left: 100,
    transformOrigin: "left center",
  },
  centerDot: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "#1b873f",
    borderRadius: 5,
    top: 95,
    left: 95,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancel: {
    color: "#555",
    fontSize: 16,
  },
  okButton: {
    backgroundColor: "#1b873f",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  okText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
