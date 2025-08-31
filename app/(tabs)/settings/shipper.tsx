import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  ScrollView, 
  ActivityIndicator,
  Dimensions,
  Platform
} from "react-native";
import { Formik } from "formik";
import Loader from "@/components/Loader";
import { ensureArray } from "@/hooks/useFormater";
import { useShipperData } from "@/hooks/useShipper";
import { ShipperSchema } from "@/validators/shipperinfo-schema";

const fieldLabels: any = {
  storeName: "Store Name",
  locationName: "Location Name", 
  address: "Address",
  returnAddress: "Return Address",
  city: "City",
  phoneNumber: "Phone Number"
};

export default function ShipperSettings() {
  const { fetchShippers, isLoading, shippers, addShipper } = useShipperData();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingShipper, setEditingShipper] = useState<any>(null);

  useEffect(() => {
    fetchShippers();
  }, []);

  const renderShipperCard = (info: any, index: number) => (
    <View key={info?._id ?? index} style={styles.shipperCard}>
      <View style={styles.cardHeader}>
        <View style={styles.storeIconContainer}>
          <Text style={styles.storeIcon}>🏪</Text>
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.storeName}>{info?.storeName ?? "N/A"}</Text>
          <Text style={styles.locationSubtitle}>{info?.locationName ?? "N/A"}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.editButton} 
            onPress={() => {
              setEditingShipper(info);
              setModalVisible(true);
            }}
          >
            <Text style={styles.editButtonText}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.cardDivider} />
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>📍 City</Text>
            <Text style={styles.infoValue}>{info?.city ?? "N/A"}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>📞 Phone</Text>
            <Text style={styles.infoValue}>{info?.phoneNumber ?? "N/A"}</Text>
          </View>
        </View>
        
        <View style={styles.addressSection}>
          <Text style={styles.infoLabel}>🏠 Address</Text>
          <Text style={styles.addressText}>{info?.address ?? "N/A"}</Text>
        </View>
        
        <View style={styles.addressSection}>
          <Text style={styles.infoLabel}>↩️ Return Address</Text>
          <Text style={styles.addressText}>{info?.returnAddress ?? "N/A"}</Text>
        </View>
      </View>
    </View>
  );

  const renderFormField = (field: any, formikProps: any) => {
    const { handleChange, handleBlur, values, errors, touched } = formikProps;
    const hasError = touched[field] && errors[field];
    
    return (
      <View key={field} style={styles.formGroup}>
        <Text style={styles.formLabel}>{fieldLabels[field]}</Text>
        <TextInput
          style={[
            styles.formInput,
            hasError && styles.formInputError
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
          <Text style={styles.errorText}>{errors[field]}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Shipper Management</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonIcon}>+</Text>
          <Text style={styles.addButtonText}>Add Shipper</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {ensureArray(shippers?.shipper)?.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>No Shippers Added</Text>
            <Text style={styles.emptySubtitle}>
              Add your first shipper to get started with managing your shipping locations
            </Text>
            <TouchableOpacity 
              style={styles.emptyStateButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.emptyStateButtonText}>Add First Shipper</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.shipperList}>
            {ensureArray(shippers?.shipper)?.map((info, index) => 
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingShipper ? "Edit Shipper" : "Add New Shipper"}
              </Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setEditingShipper(null);
                }}
              >
                <Text style={styles.closeButtonText}>✕</Text>
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
                <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                  <View style={styles.formContainer}>
                    {Object.keys(fieldLabels).map((field) => 
                      renderFormField(field, formikProps)
                    )}
                  </View>

                  <View style={styles.modalActions}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        setModalVisible(false);
                        setEditingShipper(null);
                      }}
                      disabled={loading}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                      onPress={formikProps.handleSubmit as any}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <>
                          <Text style={styles.submitButtonText}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '400',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  addButtonIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  shipperList: {
    gap: 16,
  },
  shipperCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  storeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  storeIcon: {
    fontSize: 24,
  },
  cardHeaderText: {
    flex: 1,
  },
  storeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  locationSubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 20,
  },
  cardBody: {
    padding: 20,
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  addressSection: {
    gap: 4,
  },
  addressText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  emptyStateButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  emptyStateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    minHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#64748B',
    fontWeight: '500',
  },
  modalContent: {
    flex: 1,
  },
  formContainer: {
    padding: 24,
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  formInput: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
  formInputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '500',
    marginTop: 4,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 24,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    ...Platform.select({
      ios: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
