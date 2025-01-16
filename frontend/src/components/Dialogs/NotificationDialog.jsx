import React from "react";

const NotificationDialog = ({ isOpen, title, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96 text-center">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                
                <div className="text-gray-700 mb-6">
                    {Array.isArray(message)
                        ? message.map((line, index) => (
                            <p key={index} className="mb-2">
                                {line}
                            </p>
                        ))
                        : <p>{message}</p>}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationDialog;
