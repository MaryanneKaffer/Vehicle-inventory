export const convertToVehicleFormData = (data: any): FormData => {
    const formData = new FormData();

    const fields = ["name", "description", "brand", "model", "price", "manufactureYear"];

    fields.forEach(field => {
        if (data[field] !== undefined && data[field] !== null) {
            formData.append(field, data[field]);
        }
    });

    if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
    }

    return formData;
};