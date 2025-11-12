import { fetchLink } from "../../../components/customFetch";
import type { Product } from "../types";

export function listProducts(): Promise<Product[]> {
    return fetchLink<Product[]>({
        address: "/api/products",
        method: "GET",
    });
}

export function getProduct(id: number): Promise<Product> {
    return fetchLink<Product>({
        address: `/api/products/${id}`,
        method: "GET",
    });
}

export function createProduct(
    data: Record<string, any>,
    image?: File | null,
    loading?: { on?: () => void; off?: () => void }
): Promise<Product> {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") form.append(k, String(v));
    });
    if (image) form.append("image", image);

    return fetchLink<Product>({
        address: "/api/products",
        method: "POST",
        bodyData: form,
        // autoHeaders can stay false — we removed content-type automatically for FormData
        loadingOn: loading?.on,
        loadingOff: loading?.off,
    });
}

export function updateProduct(
    id: number,
    data: Record<string, any>,
    image?: File | null,
    loading?: { on?: () => void; off?: () => void }
): Promise<Product> {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") form.append(k, String(v));
    });
    if (image) form.append("image", image);

    return fetchLink<Product>({
        address: `/api/products/${id}`,
        method: "PUT",
        bodyData: form,
        loadingOn: loading?.on,
        loadingOff: loading?.off,
    });
}

export function deleteProduct(
    id: number,
    loading?: { on?: () => void; off?: () => void }
) {
    return fetchLink({
        address: `/api/products/${id}`,
        method: "DELETE",
        loadingOn: loading?.on,
        loadingOff: loading?.off,
    });
}
