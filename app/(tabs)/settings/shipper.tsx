import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  ScrollView, 
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import Loader from "@/components/Loader";
import { ensureArray } from "@/hooks/useFormater";
import { useShipperData } from "@/hooks/useShipper";
import { ShipperSchema } from "@/validators/shipperinfo-schema";
import shipperStyles from "@/styles/settings/shipper";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const fieldLabels: any = {
  storeName: "Store Name",
  locationName: "Location Name", 
  address: "Address",
  returnAddress: "Return Address",
  city: "City",
  phoneNumber: "Phone Number"
};

export default function ShipperSettings() {
  const { fetchShippers, isLoading, addShipper } = useShipperData();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingShipper, setEditingShipper] = useState<any>(null);
  const { shipper } = useSelector((state: RootState) => state.Shipper);
  console.log(shipper);

  useEffect(() => {
    fetchShippers();

  }, [])

  const renderShipperCard = (info: any, index: number) => (
    <View key={info?._id ?? index} style={shipperStyles.shipperCard}>
      <View style={shipperStyles.cardHeader}>
        <View style={shipperStyles.storeIconContainer}>
          <Text style={shipperStyles.storeIcon}>🏪</Text>
        </View>
        <View style={shipperStyles.cardHeaderText}>
          <Text style={shipperStyles.storeName}>{info?.storeName ?? "N/A"}</Text>
          <Text style={shipperStyles.locationSubtitle}>{info?.locationName ?? "N/A"}</Text>
        </View>
        <View style={shipperStyles.cardActions}>
          <TouchableOpacity style={shipperStyles.editButton} 
            onPress={() => {
              setEditingShipper(info);
              setModalVisible(true);
            }}
          >
            <Text style={shipperStyles.editButtonText}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={shipperStyles.cardDivider} />
      <View style={shipperStyles.cardBody}>
        <View style={shipperStyles.infoRow}>
          <View style={shipperStyles.infoItem}>
            <Text style={shipperStyles.infoLabel}>📍 City</Text>
            <Text style={shipperStyles.infoValue}>{info?.city ?? "N/A"}</Text>
          </View>
          <View style={shipperStyles.infoItem}>
            <Text style={shipperStyles.infoLabel}>📞 Phone</Text>
            <Text style={shipperStyles.infoValue}>{info?.phoneNumber ?? "N/A"}</Text>
          </View>
        </View>
        
        <View style={shipperStyles.addressSection}>
          <Text style={shipperStyles.infoLabel}>🏠 Address</Text>
          <Text style={shipperStyles.addressText}>{info?.address ?? "N/A"}</Text>
        </View>
        
        <View style={shipperStyles.addressSection}>
          <Text style={shipperStyles.infoLabel}>↩️ Return Address</Text>
          <Text style={shipperStyles.addressText}>{info?.returnAddress ?? "N/A"}</Text>
        </View>
      </View>
    </View>
  );

  const renderFormField = (field: any, formikProps: any) => {
    const { handleChange, handleBlur, values, errors, touched } = formikProps;
    const hasError = touched[field] && errors[field];
    
    return (
      <View key={field} style={shipperStyles.formGroup}>
        <Text style={shipperStyles.formLabel}>{fieldLabels[field]}</Text>
        <TextInput
          style={[
            shipperStyles.formInput,
            hasError && shipperStyles.formInputError
          ]}
          placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
          placeholderTextColor="#9CA3AF"
          onChangeText={handleChange(field)}
          onBlur={handleBlur(field)}
          value={values[field]}
          multiline={field === 'address' || field === 'returnAddress'}
          numberOfLines={field === 'address' || field === 'returnAddress' ? 3 : 1}
          keyboardType={field === 'phoneNumber' ? 'numeric' : 'default'}
        />
        {hasError && (
          <Text style={shipperStyles.errorText}>{errors[field]}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={shipperStyles.container}>
      {isLoading && <Loader />}
      
      <View style={shipperStyles.header}>
        <View>
          <Text style={shipperStyles.title}>Shipper Management</Text>
        </View>
        <TouchableOpacity style={shipperStyles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={shipperStyles.addButtonIcon}>+</Text>
          <Text style={shipperStyles.addButtonText}>Add Shipper</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={shipperStyles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={shipperStyles.scrollContent}
      >
        {ensureArray(shipper)?.length === 0 ? (
          <View style={shipperStyles.emptyState}>
            <Text style={shipperStyles.emptyIcon}>📦</Text>
            <Text style={shipperStyles.emptyTitle}>No Shippers Added</Text>
            <Text style={shipperStyles.emptySubtitle}>
              Add your first shipper to get started with managing your shipping locations
            </Text>
            <TouchableOpacity 
              style={shipperStyles.emptyStateButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={shipperStyles.emptyStateButtonText}>Add First Shipper</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={shipperStyles.shipperList}>
            {ensureArray(shipper)?.map((info, index) => 
              renderShipperCard(info, index)
            )}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setModalVisible(false);
          setEditingShipper(null);
        }}
      >
        <View style={shipperStyles.modalOverlay}>
          <View style={shipperStyles.modalContainer}>
            <View style={shipperStyles.modalHeader}>
              <Text style={shipperStyles.modalTitle}>
                {editingShipper ? "Edit Shipper" : "Add New Shipper"}
              </Text>
              <TouchableOpacity 
                style={shipperStyles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setEditingShipper(null);
                }}
              >
                <Text style={shipperStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <Formik
              initialValues={{
                storeName: editingShipper?.storeName || "",
                phoneNumber: editingShipper?.phoneNumber || "",
                locationName: editingShipper?.locationName || "",
                city: editingShipper?.city || "",
                returnAddress: editingShipper?.returnAddress || "",
                address: editingShipper?.address || "",
              }}
              validationSchema={ShipperSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  setLoading(true);
                  if (editingShipper) {
                    // await updateShipper(editingShipper?._id, values);
                  } else {
                    await addShipper(values);
                  }
                  // await addShipper(values);
                  resetForm();
                  setEditingShipper(null);
                  setModalVisible(false);
                  fetchShippers();
                } catch (error) {
                  console.error("Error saving shipper:", error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {(formikProps) => (
                <ScrollView style={shipperStyles.modalContent} showsVerticalScrollIndicator={false}>
                  <View style={shipperStyles.formContainer}>
                    {Object.keys(fieldLabels).map((field) => 
                      renderFormField(field, formikProps)
                    )}
                  </View>

                  <View style={shipperStyles.modalActions}>
                    <TouchableOpacity
                      style={shipperStyles.cancelButton}
                      onPress={() => {
                        setModalVisible(false);
                        setEditingShipper(null);
                      }}
                      disabled={loading}
                    >
                      <Text style={shipperStyles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[shipperStyles.submitButton, loading && shipperStyles.submitButtonDisabled]}
                      onPress={formikProps.handleSubmit as any}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <>
                          <Text style={shipperStyles.submitButtonText}>
                            {editingShipper ? "Edit Shipper" : "Add Shipper"}
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
};
