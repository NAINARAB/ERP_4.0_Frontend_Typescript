import { fetchLink } from "../../../../components/customFetch";
import type { ProductAttributes } from "./variables";

const productApi = 'masters/products';

export const listProduct = async ({
    loadingOn,
    loadingOff
}: {
    loadingOn?: () => void,
    loadingOff?: () => void
}): Promise<ProductAttributes[]> => {
    const req = await fetchLink<ProductAttributes>({
        address: productApi,
        method: "GET",
        loadingOn, loadingOff
    });

    if (req.success) {
        return req.data;
    } else {
        return []
    };
}

export const getProduct = async ({
    id,
    loadingOn,
    loadingOff
}: {
    id: number,
    loadingOn?: () => void,
    loadingOff?: () => void
}): Promise<ProductAttributes[]> => {
    const req = await fetchLink<ProductAttributes>({
        address: `${productApi}/${id}`,
        method: "GET",
        loadingOn, loadingOff
    });

    if (req.success) {
        return req.data;
    } else {
        return []
    };
}

export const createProduct = async ({
    data,
    image,
    loadingOn,
    loadingOff,
    onSuccess,
    onError
}: {
    data: Record<string, any>,
    loadingOn: () => void,
    loadingOff: () => void,
    image?: File | null,
    onSuccess?: () => void,
    onError?: () => void
}): Promise<boolean> => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") form.append(k, String(v));
    });
    if (image) form.append("image", image);

    const req = await fetchLink({
        address: productApi,
        method: "POST",
        bodyData: form,
        loadingOn, loadingOff,
    });

    if (req.success) {
        if (onSuccess) onSuccess();
        return true;
    } else {
        if (onError) onError();
        return false;
    }
}

export const updateProduct = async ({
    id,
    data,
    image,
    loadingOn,
    loadingOff,
    onSuccess,
    onError
}: {
    id: number;
    data: Record<string, any>;
    image?: File | null;
    loadingOn?: () => void;
    loadingOff?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
}): Promise<boolean> => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") form.append(k, String(v));
    });
    if (image) form.append("image", image);

    const req = await fetchLink<ProductAttributes>({
        address: `${productApi}/${id}`,
        method: "PUT",
        bodyData: form,
        loadingOn,
        loadingOff,
    });

    if (req.success) {
        if (onSuccess) onSuccess();
        return true;
    } else {
        if (onError) onError();
        return false;
    }
}

export const deleteProduct = async ({
    id,
    loadingOn,
    loadingOff,
    onSuccess,
    onError
}: {
    id: number,
    loadingOn?: () => void,
    loadingOff?: () => void,
    onSuccess?: () => void,
    onError?: () => void
}): Promise<boolean> => {
    const req = await fetchLink({
        address: `${productApi}/${id}`,
        method: "DELETE",
        loadingOn,
        loadingOff,
    });

    if (req.success) {
        if (onSuccess) onSuccess();
        return true;
    } else {
        if (onError) onError();
        return false;
    }
}
