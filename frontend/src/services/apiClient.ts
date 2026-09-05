import API_URL from "../config/api";

const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      options
    );

    if (!response.ok) {
      let message = "Ocurrió un error en la solicitud.";

      try {
        const data = await response.json();

        if (data?.error) {
          message = data.error;
        }
      } catch {
        // La respuesta no contenía JSON.
      }

      throw new Error(message);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      "No se pudo conectar con el servidor."
    );
  }
};

export default apiClient;