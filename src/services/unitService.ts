import api from "./api";

export type UnitPayload = {
  codigo: string;
  nome: string;
  ativa: boolean;
  observacao: string;
};

export const getUnits = async () => {
  const res = await api.get("/v1/unidade");
  return res.data;
};

export const createUnit = async (data: UnitPayload) => {
  const res = await api.post("/v1/unidade", data);
  return res.data;
};

export const updateUnit = async (id: number, data: UnitPayload) => {
  const res = await api.put(`/v1/unidade/${id}`, data);
  return res.data;
};

export const deleteUnit = async (id: number) => {
  const res = await api.delete(`/v1/unidade/${id}`);
  return res.data;
};
