import React, { useState } from "react";
import { z } from "zod";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";
import baseURL from "../config/baseURL";
import { fetchLink } from "../components/customFetch";

const schema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required")
});

const inputStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: 8,
    marginBottom: 12,
    outline: "none"
};

const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem",
    borderRadius: 8,
    border: "none",
    fontWeight: 700,
    cursor: "pointer"
};

const Login: React.ComponentType<{ loadingOn: () => void, loadingOff: () => void, loading: boolean }> = ({
    loadingOn = () => { },
    loadingOff = () => { },
    loading = false
}) => {
    const { login } = useAuth();
    const nav = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        const parsed = schema.safeParse(form);

        if (!parsed.success) {
            setError(parsed.error.issues[0].message);
            return;
        }

        fetchLink({
            address: `configuration/login`,
            method: "POST",
            bodyData: parsed.data,
            loadingOff,
            loadingOn
        }).then(data => {
            if (data.success) {
                login(data?.others?.token, data?.others?.user);
                nav("/", { replace: true });
            } else {
                setError(data.message);
            }
        }).catch(e => {
            setError(e.message || "Something went wrong");
        })
    }

    return (
        <div style={{
            minHeight: "100vh", display: "grid", placeItems: "center",
            background: "linear-gradient(135deg, #f6f8fb, #eef1f7)"
        }}>
            <form onSubmit={handleSubmit} style={{
                width: 360, background: "#fff", padding: 28, borderRadius: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
            }}>
                <h2 style={{ marginBottom: 16, textAlign: "center" }}>Welcome back</h2>
                <label>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>Username</span>
                    <input
                        style={inputStyle}
                        value={form.username}
                        onChange={e => setForm({ ...form, username: e.target.value })}
                        placeholder="e.g. jane"
                        autoComplete="username"
                    />
                </label>

                <label>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>Password</span>
                    <input
                        style={inputStyle}
                        type="password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        placeholder="••••••••"
                        autoComplete="current-password"
                    />
                </label>

                {error && <div style={{ color: "#b00020", marginBottom: 12 }}>{error}</div>}

                <button type="submit" style={buttonStyle} disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                <p style={{ marginTop: 12, fontSize: 12, color: "#666", textAlign: "center" }}>
                    Demo server: <code>{baseURL}</code>
                </p>
            </form>
        </div>
    );
}

export default Login;