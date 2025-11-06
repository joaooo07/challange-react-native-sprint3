import api, { setAuthToken } from "./api";

type LoginPayload = {
  email: string;
  senha: string;
};

type LoginResponse = {
  message: string;
  token: string; 
  usuario: {
    id: number;
    nome: string;
    email: string;
    ativo: boolean;
  };
};


export const login = async ({ email, senha }: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/v1/usuario/login", { email, senha });

  const token = res.data?.token;
  if (!token) throw new Error("Login OK, mas sem token no corpo da resposta.");

  setAuthToken(token);

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

export const logout = async () => {
  setAuthToken(null);
  localStorage.removeItem("accessToken");
}; 
