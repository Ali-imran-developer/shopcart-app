import { getSummaryCardsProps } from "@/types/types";

export function ensureArray<T>(value: T | T[] | null | undefined): T[] {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}

export function ensureObject<T extends object>(value: T | null | undefined): T {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  return {} as T;
}

export const getSummaryCards = ({
  orders,
  totalOrders,
}: getSummaryCardsProps) => {
  const statusCounts = ensureArray(orders)?.reduce((acc, order) => {
    const status = order.status || "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const paymentCounts = ensureArray(orders)?.reduce((acc, order) => {
    const payment = order.payment || "unknown";
    acc[payment] = (acc[payment] || 0) + 1;
    return acc;
  }, {});

  return [
    {
      id: "1",
      title: "Total Orders",
      value: totalOrders?.toString(),
      icon: "shopping-bag",
      color: "#3b82f6",
    },
    {
      id: "2",
      title: "Open Orders",
      value: (statusCounts.open || 0).toString(),
      icon: "clock",
      color: "#f59e0b",
    },
    {
      id: "3",
      title: "Completed",
      value: (statusCounts.completed || 0).toString(),
      icon: "check-circle",
      color: "#10b981",
    },
    {
      id: "4",
      title: "Pending Payment",
      value: (paymentCounts.pending || 0).toString(),
      icon: "credit-card",
      color: "#ef4444",
    },
  ];
};

export const getPaymentStatusColor = (payment: string) => {
  switch (payment?.toLowerCase()) {
    case "paid":
    case "completed":
      return { bg: "#dcfce7", text: "#16a34a" };
    case "pending":
      return { bg: "#fef3c7", text: "#d97706" };
    case "failed":
      return { bg: "#fee2e2", text: "#dc2626" };
    default:
      return { bg: "#f3f4f6", text: "#6b7280" };
  }
};

export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
    case "delivered":
      return { bg: "#dcfce7", text: "#16a34a" };
    case "pending":
    case "open":
      return { bg: "#fef3c7", text: "#d97706" };
    case "shipped":
    case "processing":
      return { bg: "#dbeafe", text: "#2563eb" };
    case "cancelled":
      return { bg: "#fee2e2", text: "#dc2626" };
    default:
      return { bg: "#f3f4f6", text: "#6b7280" };
  }
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrency = (amount: number) => {
  return `Rs. ${amount?.toLocaleString()}`;
};

export const getOrderStatusColor = (status: string) => {
  const colors: any = {
    pending: { bg: "#FEF3C7", text: "#92400E" },
    open: { bg: "#DBEAFE", text: "#1E40AF" },
    processing: { bg: "#FED7AA", text: "#C2410C" },
    shipped: { bg: "#E9D5FF", text: "#7C3AED" },
    delivered: { bg: "#D1FAE5", text: "#065F46" },
    cancelled: { bg: "#FEE2E2", text: "#DC2626" },
  };
  return colors[status] || { bg: "#F3F4F6", text: "#374151" };
};

// export const getPaymentStatusColor = (status: string) => {
//   const colors: any = {
//     pending: { bg: "#FEF3C7", text: "#92400E" },
//     paid: { bg: "#D1FAE5", text: "#065F46" },
//     failed: { bg: "#FEE2E2", text: "#DC2626" },
//   };
//   return colors[status] || { bg: "#F3F4F6", text: "#374151" };
// };

export const getStockStatus = (stock: number) => {
  if (stock > 50)
    return { status: "In Stock", color: "#10b981", bgColor: "#d1fae5" };
  if (stock > 10)
    return { status: "Limited Stock", color: "#f59e0b", bgColor: "#fef3c7" };
  if (stock > 0)
    return { status: "Low Stock", color: "#ef4444", bgColor: "#fee2e2" };
  return { status: "Out of Stock", color: "#6b7280", bgColor: "#f3f4f6" };
};
