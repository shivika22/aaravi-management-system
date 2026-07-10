import api from "../api/api";

export const getPurchases = () =>
  api.get("/purchases");

export const createPurchase = (data) =>
  api.post("/purchases", data);