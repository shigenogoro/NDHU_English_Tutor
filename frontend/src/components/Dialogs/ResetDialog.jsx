import React, { useState } from "react";

const BASE_URL = "http://localhost:3000/auth";

const ResetDialog = ({ onClose, onResetSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        // Reset password logic
        try {
            const response = await fetch(`${BASE_URL}/reset-password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                setErrorMessage(data.message);
                return;
            }

            onResetSuccess();
        } catch (error) {   
            setErrorMessage("An error occurred. Please try again.");
        };
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-80 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    aria-label="Close"
                >
                    &#x2715;
                </button>

                <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

                {errorMessage && (
                    <div className="mb-4 text-red-500 font-bold text-sm text-center">{errorMessage}</div>
                )}

                <form onSubmit={handleReset}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
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
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Reset
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetDialog;
