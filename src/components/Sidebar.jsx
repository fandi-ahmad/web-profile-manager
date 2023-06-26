import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { GetUser } from '../api/userApi'
import { AlertConfirm } from './SweetAlert'

const Sidebar = () => {

    const navigate = useNavigate()

    const checkToken = async () => {
        try {
            const response = await GetUser()
            if (response.status == 403) {
                localStorage.removeItem("user");
                navigate('/login')
            }
        } catch (error) {
        }
    }

    const logoutUser = () => {
        AlertConfirm({
            title: 'Logout?',
            preConfirm: () => {
                localStorage.removeItem("user");
                navigate('/login')
            }
        })
    }

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <aside className="aside is-placed-left is-expanded">
            <div className='h-5/6'>
                <div className="aside-tools">
                    <div>
                        Web Profile Manager <b className="font-black">(WPM)</b>
                    </div>
                </div>
                <div className="menu is-menu-main">
                    <p className="menu-label">Menu</p>
                    <ul className="menu-list">
                        <li className="active">
                            <a onClick={() => navigate('/')}>
                                <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
                                <span className="menu-item-label">Dashboard</span>
                            </a>
                        </li>
                        <li className="--set-active-tables-html">
                            <a onClick={() => navigate('/service')}>
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                <span className="menu-item-label">Service</span>
                            </a>
                        </li>
                        <li className="--set-active-forms-html">
                            <a>
                                <span className="icon"><i className="mdi mdi-tools"></i></span>
                                <span className="menu-item-label">Setup</span>
                            </a>
                        </li>
                        <li className="--set-active-profile-html">
                            <a>
                                <span className="icon"><i className="mdi mdi-account-circle"></i></span>
                                <span className="menu-item-label">Profile</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex justify-center'>
                <ul onClick={logoutUser} className="bg-slate-700 hover:bg-slate-600 cursor-pointer p-2 rounded-md w-full mx-2 text-center">
                    <li className="--set-active-profile-htm">
                        <a className='text-white'>
                            <span className="icon"><i className="mdi mdi-logout"></i></span>
                            <span className="menu-item-label">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar