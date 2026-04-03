export const convertToUserFormData = (data: any): FormData => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.image && data.image[0]) {
        formData.append("image", data.image[0]); 
    }

    return formData;
};