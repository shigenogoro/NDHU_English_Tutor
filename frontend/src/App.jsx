import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import VerbAndSentencePatternPage from "./pages/VerbAndSentencePatternPage";
import LoginDialog from "./components/Dialogs/LoginDialog";
import RegisterDialog from "./components/Dialogs/RegisterDialog";
import ResetDialog from "./components/Dialogs/ResetDialog";
import NotificationDialog from "./components/Dialogs/NotificationDialog";

const App = () => {
    const [activeDialog, setActiveDialog] = useState(null);
    const [userName, setUserName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [notification, setNotification] = useState({
        isOpen: false,
        title: "",
        message: "",
    });

    // Function to check if the user is logged in
    const isLoggedIn = localStorage.getItem("access_token") !== null;

    useEffect(() => {
        // Update user info on mount or when authentication changes
        const storedUserName = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");
        setUserName(storedUserName || "");
        setIsAdmin(storedRole === "true");
    }, [isLoggedIn]);

    const handleOpenLoginDialog = () => setActiveDialog("login");
    const handleOpenRegisterDialog = () => setActiveDialog("register");
    const handleOpenResetDialog = () => setActiveDialog("reset");
    const handleCloseDialog = () => setActiveDialog(null);

    const handleLoginSuccess = (userName, role) => {
        localStorage.setItem("access_token", "your-access-token"); // Store access token
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
        setUserName("");
        setIsAdmin(false);
    };

    const element = useRoutes([
        { path: "/", element: <Home /> },
        {
            path: "/verb-and-sentence-pattern-page",
            element: (
                <ProtectedRoute isAuthenticated={isLoggedIn}>
                    <VerbAndSentencePatternPage />
                </ProtectedRoute>
            ),
        },
    ]);

    return (
        <div>
            <Navbar
                onLoginClick={handleOpenLoginDialog}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
            />
            {element}
            <Footer />

            {activeDialog === "login" && (
                <LoginDialog
                    onClose={handleCloseDialog}
                    onLoginSuccess={handleLoginSuccess}
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

export default App;
