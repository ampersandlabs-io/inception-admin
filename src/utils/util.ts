export const getProjectStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "draft":
      return "bg-[#4FC3F7] text-[#066093]";
    case "active":
    case "published":
      return "bg-[#4ade80] text-white";
    case "in_review":
      return "bg-[#F48FB1] text-[#C6302B]";
    case "completed":
      return "bg-[#10b981] text-white";
    case "cancelled":
      return "bg-[#ef4444] text-white";
    case "pending_funding":
      return "bg-[#FFB74D] text-white";
    default:
      return "bg-[#8f9bba] text-white";
  }
};

export const formatBudget = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getProjectStatusText = (status: string) => {
  switch (status.toLowerCase()) {
    case "published":
      return "Active";
    case "in_review":
      return "In Review";
    case "draft":
      return "Draft";
    case "completed":
      return "Completed";
    default:
      return status;
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
