import React, { useState } from "react";

const BASE_URL = "http://localhost:3000";

const LoginDialog = ({ onClose, onSwitchToRegister, onSwitchToReset, onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                setErrorMessage(data.message);
                return;
            }

            localStorage.setItem("access_token", data.token);
            localStorage.setItem("username", data.username);
            onLoginSuccess(data.username, data.role);

        } catch(err) {
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-80 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 mr-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    aria-label="Close"
                >
                    &#x2715;
                </button>

                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                {errorMessage && (
                    <div className="mb-4 text-red-500 font-bold text-sm text-center">{errorMessage}</div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 flex justify-between text-sm">
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={onSwitchToReset}
                    >
                        Forgot Password?
                    </button>
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={onSwitchToRegister}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginDialog;
