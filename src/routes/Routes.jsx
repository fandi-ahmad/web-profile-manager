import { React, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';

export const RoutesTemplate = () => {

    useEffect(() => {
        document.title = 'WPM'
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesTemplate