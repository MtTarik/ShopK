import { API_BASE_URL } from '../env-config';

export const getUserInfo = async (username: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user/${username}`, {
        headers: { 'Content-Type': 'application/json' }
    })

    return response.json();
}

export const getUserPhoto = async (username: string) => {
    const response = await fetch(`${API_BASE_URL}/api/user/${username}/photo`, {})

    if (response.status === 401) {
        return response;
    }

    return response.blob();
}

export const setUserPhoto = async (token: string, username: string, photo: File | null) => {
    const formData = new FormData();
    formData.append("photo", photo ?? "");

    const response = await fetch(`${API_BASE_URL}/api/user/${username}/photo`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    })

    if (response.status === 401) {
        return response;
    }

    return response.json();
}

export const updateUser = async (token: string, username: string, email: string, firstName: string, lastName: string, address: string, phoneNumber: string ) => {
    const userDTO = {
        email,
        firstName,
        lastName,
        address,
        phoneNumber
    };

    const response = await fetch(`${API_BASE_URL}/api/user/${username}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(userDTO),
    });

    if (response.status === 401) {
        return response;
    }

    return response.json();
}
