import { fetchLink } from "../../../components/customFetch";
import type { Pack } from "../types";
import { toast } from 'react-toastify';

const packAPI = "masters/packs/";

export const getPacks = async (
    loadingOn?: () => void,
    loadingOff?: () => void
): Promise<Pack[]> => {
    try {
        const res = await fetchLink<Pack>({
            address: packAPI,
            method: "GET",
            loadingOn: typeof loadingOn === 'function' ? loadingOn : undefined,
            loadingOff: typeof loadingOff === 'function' ? loadingOff : undefined
        });

        if (res.success) {
            return res.data;
        } else {
            return [];
        }
    } catch (e) {
        console.error("getPacks Error:", e);
        return [];
    }
};

export const createPack = async (
    bodyData: Pack,
    loadingOn?: () => void,
    loadingOff?: () => void
): Promise<boolean> => {
    try {
        const res = await fetchLink({
            address: packAPI,
            method: "POST",
            bodyData: bodyData,
            loadingOn: typeof loadingOn === 'function' ? loadingOn : undefined,
            loadingOff: typeof loadingOff === 'function' ? loadingOff : undefined
        });

        if (res.success) {
            toast.success(res.message);
            return true;
        } else {
            toast.error(res.message);
            return false;
        }
    } catch (e) {
        console.error("createPack Error:", e);
        return false;
    }
}

export const updatePack = async (
    id: number,
    bodyData: Pack,
    loadingOn?: () => void,
    loadingOff?: () => void
): Promise<boolean> => {
    try {
        const res = await fetchLink({
            address: packAPI + '/' + id,
            method: "PUT",
            bodyData: bodyData,
            loadingOn: typeof loadingOn === 'function' ? loadingOn : undefined,
            loadingOff: typeof loadingOff === 'function' ? loadingOff : undefined
        });

        if (res.success) {
            toast.success(res.message);
            return true;
        } else {
            toast.error(res.message);
            return false;
        }
    } catch (e) {
        console.error("updatePack Error:", e);
        return false;
    }
}