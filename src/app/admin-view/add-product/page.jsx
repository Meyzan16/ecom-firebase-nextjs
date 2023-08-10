"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import {
  AvailableSizes,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStorageURL,
} from "@/utils";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useContext, useState, useEffect } from "react";
import { addNewProduct, updateAdminProducts } from "@/services/product";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { useRouter } from "next/navigation";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const createUniqueFileName = (file) => {
  const timestamps = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${file.name}-${timestamps}-${randomStringValue}`;
};

async function helperForUploadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

const initialFormData = {
  userId: "",
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

const AdminAddNewProduct = () => {
  const router = useRouter();

  const {
    user,
    componentLevelLoader,
    setComponentLevelLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    ...initialFormData,
    userId: user?._id,
  });

  useEffect(() => {
    if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct);
  }, [currentUpdatedProduct]);

  //image
  const handleImage = async (event) => {
    console.log(event.target.files);
    const extractImageUrl = await helperForUploadingImageToFirebase(
      event.target.files[0]
    );

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl,
      });
    }
  };

  //sizes
  function handleTitleClick(getCurrentItem) {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  }

  const handleaddproduct = async () => {
    setComponentLevelLoader({ loading: true, id: "" });

    const res =
      currentUpdatedProduct !== null
        ? await updateAdminProducts(formData)
        : await addNewProduct(formData);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 2000);
      setFormData(initialFormData);
      setCurrentUpdatedProduct(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // console.log(formData);

  return (
    <div className="w-full mt-5 relative">
      <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-2xl relative">
        <div className="w-full space-y-8">
          <input
            accept="image/*"
            max="2048"
            type="file"
            onChange={handleImage}
          />

          <div className="flex gap-2 flex-col">
            <label>Available sizes</label>
            <TileComponent
              selected={formData.sizes}
              onClick={handleTitleClick}
              data={AvailableSizes}
            />
          </div>

          {adminAddProductformControls.map((item) =>
            item.componentType === "input" ? (
              <InputComponent
                key={item.id}
                type={item.type}
                placeholder={item.placeholder}
                label={item.label}
                value={formData[item.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [item.id]: event.target.value,
                  });
                }}
              />
            ) : item.componentType === "select" ? (
              <SelectComponent
                key={item.id}
                label={item.label}
                options={item.options}
                value={formData[item.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [item.id]: event.target.value,
                  });
                }}
              />
            ) : null
          )}

          <div className="flex gap-2 ">
            <button onClick={handleaddproduct} className="button">
              {componentLevelLoader && componentLevelLoader.loading ? (
                <ComponentLevelLoader
                  text={currentUpdatedProduct !== null ? 'Updating Product' : 'Adding Product' }
                  color={"#ffffff"}
                  loading={componentLevelLoader && componentLevelLoader.loading}
                />
              ) : (
                `${currentUpdatedProduct !== null ? 'Update Product' : 'Add Product' }`
              )}
            </button>

            <Link href="/admin-view/all-products" className="button-cancel">
              Cancel
            </Link>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default AdminAddNewProduct;
