import api from "./api";

type LoginPayload = {
  email: string;
  senha: string;
};

export const login = async ({ email, senha }: LoginPayload) => {
  const res = await api.post("/v1/usuario/login", { email, senha });

  return res.data; 
};

type RegisterPayload = {
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
};

export const register = async (data: RegisterPayload) => {
  const res = await api.post("/v1/usuario", data);
  return res.data;
};

