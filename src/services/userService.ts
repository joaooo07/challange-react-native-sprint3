import api from "./api";

export const getUsers = async () => {
  const res = await api.get("/v1/usuario");
  return res.data.data; 
};

export const getUserById = async (id: number) => {
  const res = await api.get(`/v1/usuario/${id}`);
  return res.data.data;
};

export const createUser = async (user: any) => {
  const res = await api.post("/v1/usuario", user);
  return res.data;
};

export const updateUser = async (id: number, user: any) => {
  const res = await api.put(`/v1/usuario/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: number) => {
  await api.delete(`/v1/usuario/${id}`);
};
