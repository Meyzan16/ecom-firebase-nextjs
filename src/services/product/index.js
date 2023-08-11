

//add  a new product service
import Cookies from 'js-cookie';

export const addNewProduct = async (formData) => {
    try {
        const response = await fetch('/api/admin/add-product', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData),
        })

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

export const getAllAdminProducts = async (id) => {
    try {
        const response = await fetch(`/api/admin/all-products/${id}/products`, {
            method: 'GET',
            cache: 'no-store'
        })

        const data = await response.json();
        return data; 
        
    } catch (error) {
        console.error(error);
    }
}

export const updateAdminProducts = async (formData) => {
    try {
        const response = await fetch('/api/admin/update-product',{
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData),
        })

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

export const deleteAdminProducts = async (id) => {
    try {
        const response = await fetch(`/api/admin/delete-product/${id}/product`, {
            method: 'DELETE',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`,
            },
        })

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

export const productByCategory = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/admin/product-by-category?id=${id}`, {
            method: 'GET',
            cache: 'no-store'
        })

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

export const productBySlug = async (slug) => {
    try {
        const response = await fetch(`http://localhost:3000/api/product/product-by-slug/${slug}`, {
            method: 'GET',
            cache: 'no-store'
        })

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

export const getAllProducts = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/product/getall-products`, {
            method: 'GET',
            cache: 'no-store'
        })

        const data = await response.json();
        return data; 
        
    } catch (error) {
        console.error(error);
    }
}