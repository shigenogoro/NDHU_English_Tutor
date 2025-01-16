import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LoginDialog from "../components/Dialogs/LoginDialog";
import RegisterDialog from "../components/Dialogs/RegisterDialog";
import ResetDialog from "../components/Dialogs/ResetDialog";
import NotificationDialog from "../components/Dialogs/NotificationDialog";

const Home = () => {
    const [activeDialog, setActiveDialog] = useState(null); // Track the active dialog
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notification, setNotification] = useState({
        isOpen: false,
        title: "",
        message: "",
    });

    const handleOpenLoginDialog = () => setActiveDialog("login");
    const handleOpenRegisterDialog = () => setActiveDialog("register");
    const handleOpenResetDialog = () => setActiveDialog("reset");
    const handleCloseDialog = () => setActiveDialog(null);

    const handleLoginSuccess = (userName, role) => {
        setIsLoggedIn(true);
        localStorage.setItem("username", userName);
        localStorage.setItem("role", role);
        handleCloseDialog();
    };

    const handleRegisterSuccess = () => {
        setNotification({
            isOpen: true,
            title: "Registration Successful",
            message: [
                "You have successfully registered.",
                "Please log in to continue.",
            ],
        });
        handleCloseDialog();
    };

    const handleResetSuccess = () => {
        setNotification({
            isOpen: true,
            title: "Password Reset Successful",
            message: [
                "Your password has been reset successfully.",
                "Please log in with your new password.",
            ],
        });
        handleCloseDialog();
    };
    

    const handleCloseNotification = () => {
        setNotification({ ...notification, isOpen: false });
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar
                onLoginClick={handleOpenLoginDialog}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
            />
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

            {activeDialog === "login" && (
                <LoginDialog
                    onClose={handleCloseDialog}
                    onLoginSuccess={(userName, role) => handleLoginSuccess(userName, role)}
                    onSwitchToRegister={handleOpenRegisterDialog}
                    onSwitchToReset={handleOpenResetDialog}
                />
            )}

            {activeDialog === "register" && (
                <RegisterDialog
                    onClose={handleCloseDialog}
                    onRegisterSuccess={handleRegisterSuccess}
                    onSwitchToLogin={handleOpenLoginDialog}
                />
            )}

            {activeDialog === "reset" && (
                <ResetDialog
                    onClose={handleCloseDialog}
                    onResetSuccess={handleResetSuccess}
                    onSwitchToLogin={handleOpenLoginDialog}
                />
            )}

            <NotificationDialog
                isOpen={notification.isOpen}
                title={notification.title}
                message={notification.message}
                onClose={handleCloseNotification}
            />
        </div>
    );
};

export default Home;
