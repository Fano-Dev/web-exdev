
import apiClient from "./apiClient";
import { Member } from "../types/member";

export const getMembers = async (): Promise<Member[]> => {
  const response = await apiClient("/miembros");

  if (!response.ok) {
    throw new Error("Error obteniendo miembros");
  }

  return response.json();
};
