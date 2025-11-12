"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
    return (
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <h1>ログイン</h1>
            <p>Googleアカウントでサインインしてください</p>
            <button
                onClick={() => signIn("google")}
                style={{
                background: "#4285F4",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                }}
            >
                Googleでログイン
            </button>
        </div>
    );
}
