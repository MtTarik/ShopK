import { API_BASE_URL } from '../env-config';

export const getCartItems = async (token: string, username: string) => {
    const response = await fetch(`${API_BASE_URL}/api/cartItem?&username=${username}`, {
        headers: { Authorization: `Bearer ${token}` },
    })

    if (response.status === 401) {
        return response;
    }

    return response.json();
}

export const deleteCartItem = async (token: string, id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/cartItem/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.status === 401) {
        return response;
    }

    return response.json();
}

export const changeQuantity = async (token: string, id: number, quantity: number) => {
    const response = await fetch(`${API_BASE_URL}/api/cartItem/${id}/quantity?quantity=${quantity}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.status === 401) {
        return response;
    }

    return response.json();
}
