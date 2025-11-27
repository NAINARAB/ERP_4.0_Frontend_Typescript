import { useState } from 'react';
import { type ProductAttributes, productInitialValue } from './variables';
import type { PageProps } from '../../../../routes/indexRouter';
import { createProduct, listProduct, updateProduct } from './api';


const ProductForm: React.ComponentType<PageProps> = ({ loadingOff, loadingOn }) => {
    const [productInput, setProductInput] = useState<ProductAttributes>(productInitialValue);

    async function handleCreate(payload: Record<string, any>, image?: File | null) {
        await createProduct({
            data: payload,
            loadingOn, loadingOff,
            image: image ?? null
        });
    }

    async function handleUpdate(payload: Record<string, any>, image?: File | null) {
        await updateProduct({
            id: productInput.Product_Id,
            data: payload,
            image: image ?? null,
            loadingOn, loadingOff
        });
    }

    // async function handleDelete(id: number) {
    //     await deleteProduct(id);
    //     await load();
    // }

    return (
        <>

        </>
    )
}

export default ProductForm;
