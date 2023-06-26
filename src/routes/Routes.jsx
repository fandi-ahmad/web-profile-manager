import { React, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Service from '../pages/Service';

export const RoutesTemplate = () => {

    useEffect(() => {
        document.title = 'WPM'
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<Dashboard/>} />
                <Route path="/service" element={<Service/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesTemplate