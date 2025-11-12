import baseURL from "../config/baseURL";

interface FetchLinkParams {
    address: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    bodyData?: Record<string, any> | FormData | null | any[] | any;
    others?: RequestInit;
    autoHeaders?: boolean;
    loadingOn?: () => void;
    loadingOff?: () => void;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data: T[];
    message: string;
    others?: Record<string, any>;
}

export const fetchLink = async <T = any>({
    address,
    method = "GET",
    headers = {},
    bodyData = null,
    others = {},
    autoHeaders = false,
    loadingOn,
    loadingOff,
}: FetchLinkParams): Promise<ApiResponse<T>> => {
    const token = localStorage.getItem('token');
    const isFormData = bodyData instanceof FormData;

    const defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + (token || ""),
    };

    const finalHeaders = autoHeaders
        ? defaultHeaders
        : { ...defaultHeaders, ...headers };

    if (isFormData) {
        delete finalHeaders["Content-Type"];
    }

    const options: RequestInit = {
        method,
        headers: finalHeaders,
        ...others,
    };

    if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
        options.body = isFormData ? (bodyData as FormData) : JSON.stringify(bodyData || {});
    }

    try {
        if (loadingOn) loadingOn();

        const response = await fetch(baseURL + address.replace(/\s+/g, ""), options);

        if (response.status === 401) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/';
            return null as any;
        }

        if ((finalHeaders["Content-Type"] || "").includes("application/json")) {
            const json = (await response.json()) as ApiResponse<T>;
            return json;
        } else {
            return (response as unknown) as ApiResponse<T>;
        }
        
    } catch (e) {
        console.error("Fetch Error", e);
        throw e;
    } finally {
        if (loadingOff) loadingOff();
    }
};
