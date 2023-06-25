import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { GetUser } from '../api/userApi'

const Sidebar = () => {

    const navigate = useNavigate()

    const checkToken = async () => {
        try {
            const response = await GetUser()
            if (response.status == 403) {
                navigate('/login')
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <aside className="aside is-placed-left is-expanded">
            <div className="aside-tools">
                <div>
                    Web Profile Manager <b className="font-black">(WPM)</b>
                </div>
            </div>
            <div className="menu is-menu-main">
                <p className="menu-label">Menu</p>
                <ul className="menu-list">
                    <li className="active">
                        <a href="">
                            <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
                            <span className="menu-item-label">Dashboard</span>
                        </a>
                    </li>
                    <li className="--set-active-tables-html">
                        <a href="">
                            <span className="icon"><i className="mdi mdi-table"></i></span>
                            <span className="menu-item-label">Tables</span>
                        </a>
                    </li>
                    <li className="--set-active-forms-html">
                        <a href="">
                            <span className="icon"><i className="mdi mdi-square-edit-outline"></i></span>
                            <span className="menu-item-label">Forms</span>
                        </a>
                    </li>
                    <li className="--set-active-profile-html">
                        <a href="">
                            <span className="icon"><i className="mdi mdi-account-circle"></i></span>
                            <span className="menu-item-label">Profile</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar