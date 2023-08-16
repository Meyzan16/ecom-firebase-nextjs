import Cookies from "js-cookie";


export const createNewOrder = async (formData) => {
    try {
        
        const res = await fetch('/api/order/create-orders',{
            method: 'POST',
            headers : {
                "Content-Type": "application/json",
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData)
        })

        const data = await res.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

export const getAllOrderForUser = async (id) => {
    try {
        
        const res = await fetch(`/api/order/get-all-orders?id=${id}`,{
            method: 'GET',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`,
            },
        })

        const data = await res.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

export const getOrderDetails = async (id) => {
    try {
        
        const res = await fetch(`/api/order/order-details?id=${id}`,{
            method: 'GET',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`,
            },
        })

        const data = await res.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}