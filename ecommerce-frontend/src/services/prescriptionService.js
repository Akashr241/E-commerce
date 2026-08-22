import api from "./api";

export const uploadPrescription = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/api/prescription/analyze",
        formData
    );

    return response.data;
};