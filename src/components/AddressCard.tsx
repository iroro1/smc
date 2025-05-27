import { Edit2, Location, More, Trash } from "iconsax-react-native";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/colors";

interface AddressCardProps {
  title: string;
  address: string;
  selected?: boolean;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  title,
  address,
  selected = false,
  onPress,
  onEdit,
  onDelete,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleEdit = () => {
    setMenuVisible(false);
    onEdit && onEdit();
  };
  const handleDelete = () => {
    setMenuVisible(false);
    setDeleteModalVisible(true);
  };
  const confirmDelete = () => {
    setDeleteModalVisible(false);
    onDelete && onDelete();
  };

  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selectedCard]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.row}>
        <Location
          size={20}
          color={"#667085"}
          variant="Bold"
          style={{ marginRight: 8 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <More size={20} color={"#667085"} />
        </TouchableOpacity>
      </View>
      {selected && <View style={styles.corner} />}

      {/* Dropdown menu */}
      {menuVisible && (
        <View style={styles.dropdownOverlay}>
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
              <Edit2 size={20} color={"#667085"} style={{ marginRight: 8 }} />
              <Text style={styles.menuEditText}>Edit address</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItemDelete}
              onPress={handleDelete}
            >
              <Trash size={20} color={"#E53935"} style={{ marginRight: 8 }} />
              <Text style={styles.menuDeleteText}>Delete address</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuBackdrop}
              onPress={() => setMenuVisible(false)}
            />
          </View>
        </View>
      )}

      {/* Delete confirmation modal */}
      {deleteModalVisible && (
        <Modal
          visible={deleteModalVisible}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Trash
                size={72}
                color={"#E53935"}
                style={{ marginRight: 8, alignSelf: "center" }}
                variant="Bold"
              />
              <Text style={styles.modalTitle}>Delete address?</Text>
              <Text style={styles.modalDesc}>
                Are you sure you want to delete this address?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => setDeleteModalVisible(false)}
                  style={styles.modalCancelBtn}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmDelete}
                  style={styles.modalDeleteBtn}
                >
                  <Text style={styles.modalDeleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0,
    position: "relative",
    overflow: "hidden",
    minHeight: 100,
  },
  selectedCard: {
    borderColor: colors.seaGreen,
    borderWidth: 1,
    shadowOpacity: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
    color: "#1D2939",
    marginBottom: 2,
  },
  address: {
    color: "#475467",
    fontSize: 14,
    marginTop: 2,
  },
  corner: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 62,
    height: 62,
    backgroundColor: colors.seaGreen,
    borderColor: colors.seaGreen,
    borderWidth: 2,
    zIndex: 1,
    transform: [{ rotate: "45deg" }],
  },
  dropdownOverlay: {
    position: "absolute",
    top: 10,
    right: 40,
    zIndex: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 12,
  },
  dropdownMenu: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 0,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    width: 170,
    overflow: "hidden",
    zIndex: 100,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    zIndex: 100,
  },
  menuEditText: {
    color: "#1D2939",
    fontSize: 14,
    fontWeight: "400",
    zIndex: 100,
  },
  menuItemDelete: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#FFF1F1",
    zIndex: 100,
  },
  menuDeleteText: {
    color: "#E53935",
    fontSize: 14,
    fontWeight: "400",
  },
  menuBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#344054",
    marginBottom: 8,
    marginTop: 16,
  },
  modalDesc: {
    fontSize: 14,
    color: "#475467",
    textAlign: "center",
    marginBottom: 24,
  },
  modalCancelBtn: {
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCancelText: {
    color: "#667085",
    fontSize: 16,
    fontWeight: "500",
  },
  modalDeleteBtn: {
    backgroundColor: colors.red,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalDeleteText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "400",
  },
});

export default AddressCard;
