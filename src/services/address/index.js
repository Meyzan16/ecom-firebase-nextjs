
import Cookies from 'js-cookie';

export const AddNewAddress = async (formData) => {
    try {
        const res = await fetch('/api/address/add-new',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData),
        })
        const data = res.json();
        return data;
        
    } catch (error) {   
        console.error(error);
    }
}

export const getallAddress = async (id) => {
    try {
        const res = await fetch(`/api/address/get-all?id=${id}`,{
            method: 'GET',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            },
        })
        const data = res.json();
        return data;

    } catch (error) {   
        console.error(error);
    }
}

export const updateAddress = async (formData) => {
    try {
        const res = await fetch('/api/address/update',{
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData),
        })
        const data = res.json();
        return data;
        
    } catch (error) {   
        console.error(error);
    }
}

export const deleteAddress = async (id) => {
    try {
        const res = await fetch(`/api/address/delete/${id}`,{
            method: 'DELETE',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            },
         
        })
        const data = res.json();
        return data;
        
    } catch (error) {   
        console.error(error);
    }
}