export const navOptions = [
    {
        id: "home",
        label: "Home",
        path: "/",
    },
    {
        id: "listing",
        label: "All Products",
        path: "/product/listing/all-products",
    },
    {
        id: "listingMen",
        label: "Men",
        path: "/product/listing/men",
    },
    {
        id: "listingWomen",
        label: "Women",
        path: "/product/listing/women",
    },
    {
        id: "listingKids",
        label: "Kids",
        path: "/product/listing/kids",
    },
];

export const adminNavOptions = [
    {
        id: "adminListing",
        label: "Manage All Products",
        path: "/admin-view/all-products",
    },
    {
        id: "adminNewProduct",
        label: "Admin New Product",
        path: "/admin-view/add-product",
    },
];

export const registrationFormControls = [
    {
        id: 'name',
        type: 'text',
        placeholder: 'Enter your name',
        label: 'Name',
        componentType: 'input',
    },
    {
        id: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        label: 'Email',
        componentType: 'input',
    },
    {
        id: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        label: 'Password',
        componentType: 'input',
    },
    {
        id: 'role',
        type: '',
        placeholder: '',
        label: 'Role',
        componentType: 'select',
        options: [
            {
                id:'admin',
                label: 'Admin',
            },
            {
                id:'customer',
                label: 'Customer',
            }
        ]
    },
];

export const loginFormControls = [  
    {
        id: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        label: 'Email',
        componentType: 'input',
    },
    {
        id: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        label: 'Password',
        componentType: 'input',
    },
];

export const adminAddProductformControls = [
    {
        id:'name',
        type: 'text',
        placeholder: 'Enter name',
        label: 'Name',
        componentType: 'input',
    },
    {
        id:'price',
        type: 'number',
        placeholder: 'Enter price',
        label: 'Price',
        componentType: 'input',
    },
    {
        id:'description',
        type: 'text',
        placeholder: 'Enter description',
        label: 'Description',
        componentType: 'input',
    },
    {
        id:'category',
        type: '',
        placeholder: '',
        label: 'Category',
        componentType: 'select',
        options: [
            {
                id: 'men',
                label: 'Men'
            },
            {
                id: 'women',
                label: 'Women'
            },
            {
                id: 'kids',
                label: 'Kids'
            },
        ],
    },
    {
        id:'deliveryInfo',
        type: 'text',
        placeholder: 'Enter deliveryInfo',
        label: 'Delivery Info',
        componentType: 'input',
    },
    {
        id:'onSale',
        type: '',
        placeholder: '',
        label: 'On Sale',
        componentType: 'select',
        options: [
            {
                id:'yes',
                label: 'Yes',
            },
            {
                id:'no',
                label: 'No',
            },
        ],
    },
    {
        id:'priceDrop',
        type: 'number',
        placeholder: 'Enter price drop',
        label: 'Price Drop',
        componentType: 'input',
    },
];

export const AvailableSizes = [
    {
        id:'s',
        label: 'S',
    },
    {
        id:'m',
        label: 'M',
    },
    {
        id:'l',
        label: 'L',
    },
]

export const firebaseConfig = {
    apiKey: "AIzaSyBFTiQzuV_H63vBD_MHqdXzcUfhO-U5foU",
    authDomain: "next-js-ecom-firebase.firebaseapp.com",
    projectId: "next-js-ecom-firebase",
    storageBucket: "next-js-ecom-firebase.appspot.com",
    messagingSenderId: "120286749015",
    appId: "1:120286749015:web:82e64dad5e6cda05ac9e12",
    measurementId: "G-925LJVPBSF"
  };

export const firebaseStorageURL = 'gs://next-js-ecom-firebase.appspot.com';

export const addNewAddressFormControls = [
    {
        id: 'fullName',
        type: 'input',
        placeholder: 'Enter your full name',
        label : 'Full Name',
        componentType : 'input'
    },
    {
        id: 'address',
        type: 'input',
        placeholder: 'Enter your address',
        label : 'Address',
        componentType : 'input'
    },
    {
        id: 'city',
        type: 'input',
        placeholder: 'Enter your city',
        label : 'City',
        componentType : 'input'
    },
    {
        id: 'country',
        type: 'input',
        placeholder: 'Enter your country',
        label : 'Country',
        componentType : 'input'
    },
    {
        id: 'postalCode',
        type: 'input',
        placeholder: 'Enter your postal code',
        label : 'Postal Code',
        componentType : 'input'
    },
]