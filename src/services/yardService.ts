import api from "./api";

export const getYards = async () => {
  const res = await api.get("/yards");
  return res.data;
};

export const getYardById = async (id: number) => {
  const res = await api.get(`/yards/${id}`);
  return res.data;
};

export const createYard = async (data: any) => {
  const res = await api.post("/yards", data);
  return res.data;
};
