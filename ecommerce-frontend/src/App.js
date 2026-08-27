import React from "react";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import ProtectedRoute from "./components/ProtectedRoute";
import ReminderManager from "./components/ReminderManager";
import OrderDetails from "./pages/OrderDetails";
import MedicineReminder from "./pages/MedicineReminder";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Prescription from "./components/Prescription";
import ChatbotPage from "./pages/ChatbotPage";

import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";


const ProtectedPage = ({ children }) => {

    return (
        <ProtectedRoute>
            <ReminderManager/>

            <Navbar />

            {children}

            <Chatbot />

        </ProtectedRoute>
    );
};


function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* PUBLIC */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* PROTECTED */}

                <Route
                    path="/"
                    element={
                        <ProtectedPage>
                            <Home />
                        </ProtectedPage>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <ProtectedPage>
                            <Products />
                        </ProtectedPage>
                    }
                />


                <Route
                    path="/products/:id"
                    element={
                        <ProtectedPage>
                            <ProductDetails />
                        </ProtectedPage>
                    }
                />

                <Route path="/reminder/:id" element={
                    <ProtectedPage>
                        <MedicineReminder />
                    </ProtectedPage>
                }
                />
                
                <Route
                    path="/cart"
                    element={
                        <ProtectedPage>
                            <Cart />
                        </ProtectedPage>
                    }
                />

                <Route
                    path="/checkout"
                    element={
                        <ProtectedPage>
                            <Checkout />
                        </ProtectedPage>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <ProtectedPage>
                            <Orders />
                        </ProtectedPage>
                    }
                />

                <Route
    path="/orders/:orderId"
    element={<OrderDetails />}
/>

                <Route
                    path="/prescription"
                    element={
                        <ProtectedPage>
                            <Prescription />
                        </ProtectedPage>
                    }
                />

                <Route
                    path="/chatbot"
                    element={
                        <ProtectedPage>
                            <ChatbotPage />
                        </ProtectedPage>
                    }
                />

                <Route
                    path="/payment"
                    element={
                        <ProtectedPage>
                            <Payment />
                        </ProtectedPage>
                    }
                />

                <Route
                    path="/payment-success"
                    element={
                        <ProtectedPage>
                            <PaymentSuccess />
                        </ProtectedPage>
                    }
                />

                <Route
                    path="/payment-failure"
                    element={
                        <ProtectedPage>
                            <PaymentFailure />
                        </ProtectedPage>
                    }
                />
              

            </Routes>

        </BrowserRouter>
    );
}

export default App;