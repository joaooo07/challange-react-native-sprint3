import api from "./api";

export const getMotorcycles = async () => {
  const res = await api.get("/motorcycles");
  return res.data;
};

export const getMotorcycleById = async (id: number) => {
  const res = await api.get(`/motorcycles/${id}`);
  return res.data;
};

export const createMotorcycle = async (data: any) => {
  const res = await api.post("/motorcycles", data);
  return res.data;
};

export const updateMotorcycle = async (data: any) => {
  const res = await api.put("/motorcycles", data);
  return res.data;
};

export const deleteMotorcycle = async (id: number) => {
  const res = await api.delete(`/motorcycles/${id}`);
  return res.data;
};
