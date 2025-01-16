import React from "react";

const Home = () => {
    return (
        <div className="bg-gray-100">
            <div
                className="min-h-[calc(100vh-3rem)] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://vfis.tdtu.edu.vn/sites/default/files/vfis/network%20university/12.jpg')",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    backgroundBlendMode: "overlay",
                }}
            >
                <div className="text-center text-white p-6 bg-opacity-75 bg-gray-800 rounded-lg">
                    <h1 className="text-6xl font-bold mb-6">
                        Welcome to NDHU English Tutoring System
                    </h1>
                    <p className="text-2xl mb-8">
                        Our system helps students understand English sentences and learn vocabulary effectively.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
