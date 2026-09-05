import { Project } from "../types/project";
import apiClient from "./apiClient";

export const getProjects = async (): Promise<Project[]> => {
  const response = await apiClient("/proyectos");

  return response.json();
};