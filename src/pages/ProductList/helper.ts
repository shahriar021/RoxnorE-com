
export const getRatingColor = (rating: number) => {
  if (rating >= 4.5) return "#22c55e";
  if (rating >= 3.5) return "#f59e0b";
  return "#ef4444";
};

export const getStockStatus = (stock: number) => {
  if (stock > 50) return { color: "success", text: stock };
  if (stock > 10) return { color: "warning", text: stock };
  return { color: "error", text: stock };
};

