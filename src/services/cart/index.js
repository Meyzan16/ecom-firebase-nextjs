import Cookies from "js-cookie";

export const addToCart = async (formData) => {
    try {
        const res = await fetch('/api/cart/add-to-cart',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData),
        })

        const data = await res.json();
        return data;
        
    } catch (error) {
        console.error(error);
    }
} 

export const getAllCartItems = async (id) => {
    try {
        const response = await fetch(`/api/cart/all-cart-items?id=${id}`, {
            method: 'GET',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            },
        })

        const data = await response.json();
        return data; 
        
    } catch (error) {
        console.error(error);
    }
}

export const deletFromCart = async (id) => {
    try {
        const response = await fetch(`/api/cart/delete/${id}/cart`, {
            method: 'DELETE',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            },
        })

        const data = await response.json();
        return data; 
        
    } catch (error) {
        console.error(error);
    }
}