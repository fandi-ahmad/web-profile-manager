import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { createGlobalState } from 'react-hooks-global-state';
import { useGlobalState } from '../state/state';

// component
import Sidebar from '../components/Sidebar';
import TitleBar from '../components/TitleBar';
import Card from '../components/Card';
import { ModalLoading, openModal, closeModal, BaseModal } from '../components/BaseModal'
import { AlertConfirm, AlertError, AlertSuccess } from '../components/SweetAlert'
import { BasicButton } from '../components/BaseButton'
import { BaseInput } from '../components/BaseInput';

// api
import { GetUser, DeleteUser, CreateUser, UpdateUser } from '../api/userApi';

const Dashboard = () => {

  const [userActive, setUserActive] = useGlobalState('userActive')
  const [userList, setUserList] = useState([])
  const [nul, setnul] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [idUser, setIdUser] = useState(null)

  const auth = () => {
    const userToken = localStorage.getItem('user')
    return {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
  }

  const getId = (selector) => {
    return document.getElementById(selector)
  }

  const getAllUser = async () => {
    try {
      // const userToken = localStorage.getItem('user')
      const response = await GetUser(auth())

      setUserList(response.data)
    } catch (error) {
      console.log(error, '<-- error get all user');
    }
  };

  const deleteUser = async (id) => {
    try {
      openModal('modal-loading')
      // const userToken = localStorage.getItem('user')
      await DeleteUser(id, auth())
      setnul(nul+1)

      closeModal('modal-loading')
      AlertSuccess()
      return getAllUser()
    } catch (error) {
      closeModal('modal-loading')
      AlertError(error.message)
    }
  }

  const createNew = () => {
    openModal('upsert')
    getId('btnCreate').classList.remove('hidden')
    getId('btnUpdate').classList.add('hidden')
    getId('password').classList.remove('hidden')
    getId('oldPassword').classList.add('hidden')
    getId('newPassword').classList.add('hidden')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }

  const cek = () => {
    console.log(username, '<-- username')
    console.log(password, '<-- password')
    console.log(confirmPassword, '<-- confirmPassword')
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username': setUsername(value);
        break;
      case 'password': setPassword(value);
        break;
      case 'confirm password': setConfirmPassword(value);
        break;
      case 'old password': setOldPassword(value);
        break;
      case 'new password': setNewPassword(value);
        break;  
      default:
        break;
    }
  };

  // create in modal
  const createUser = async () => {
    try {
      if (username === '' || password === '' || confirmPassword === '') {
        AlertError('Input cannot be empty')
      } else {
        if (password != confirmPassword) {
          AlertError('password must be the same')
          setConfirmPassword('')
        } else {
          closeModal('upsert')
          openModal('modal-loading')

          // const userToken = localStorage.getItem('user')
          await CreateUser({
            username: username,
            password: password
          }, auth())

          setnul(nul+1)
          closeModal('modal-loading')
          getAllUser()
          AlertSuccess('User has been created')
        }
      }
    } catch (error) {
      closeModal('modal-loading')
      AlertError(error.message)
    }
  }

  const updateUser = (user) => {
    openModal('upsert')
    getId('btnCreate').classList.add('hidden')
    getId('btnUpdate').classList.remove('hidden')
    getId('password').classList.add('hidden')
    getId('oldPassword').classList.remove('hidden')
    getId('newPassword').classList.remove('hidden')
    setIdUser(user.id)
    setUsername(user.username)
    setPassword(user.password)
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  // update in modal
  const confirmUpdateUser = async () => {
    try {
      if (username === '' || oldPassword === '' || newPassword === '' || confirmPassword === '') {
        AlertError('Input cannot be empty')
      } else {
        if (newPassword != confirmPassword) {
          AlertError('password must be the same')
          setConfirmPassword('')
        } else {
          if (password != oldPassword) {
            AlertError('old password does not match')
          } else {
            closeModal('upsert')
            openModal('modal-loading')
  
            await UpdateUser({
              id: idUser,
              username: username,
              old_password: oldPassword,
              new_password: newPassword
            }, auth())
  
            closeModal('modal-loading')
            AlertSuccess('User has been updated')
          }
        }
        getAllUser()
      }
    } catch (error) {
      AlertError()
      console.log(error, '<-- error update user')
    }
  }

  useEffect(() => {
    getAllUser()
  }, [])

  useEffect(() => {
    getAllUser()
  }, [nul]);

 
  return (
    <>
      <Sidebar />
      <TitleBar
        title='Dashboard'
        button={<BasicButton onClick={createNew} iconShow='block' icon='mdi-plus-thick' title='Create New User'/>}
      />

      <section className="section main-section">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
          <Card title='Clients' />
          <Card value='235' color='red' />
          <Card color='blue' icon='mdi-finance' />
        </div>

        <div className="card has-table">
          <div className="card-content">
            <table className='text-slate-800'>
              <thead>
                <tr>
                  <th></th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Email</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user, index) => (
                  <tr key={user.id}>
                    <td className="image-cell">{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>-</td>
                    <td>
                      <small>{user.createdAt}</small>
                    </td>
                    <td className="actions-cell">
                      <div className="buttons right nowrap">
                        <button onClick={() => updateUser(user)} className="button small blue --jb-modal" type="button">
                          <span className="icon"><i className="mdi mdi-pencil mdi-18px"></i></span>
                        </button>
                        <button onClick={() => deleteUser(user.id)} className="button small red --jb-modal" type="button">
                          <span className="icon"><i className="mdi mdi-delete mdi-18px"></i></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="table-pagination">
              <div className="flex items-center justify-between">
                <div className="buttons">
                  <button type="button" className="button active">1</button>
                  <button type="button" className="button">2</button>
                  <button type="button" className="button">3</button>
                </div>
                <small>Page 1 of 3</small>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ===== upsert modal ===== */}
      <BaseModal id='upsert' title='Create New User'>
        <BaseInput value={username} onChange={handleInput} name='username' className='mb-5' />
        <BaseInput value={password} onChange={handleInput} name='password' type='password'id='password' className='mb-5' />
        <BaseInput value={oldPassword} onChange={handleInput} name='old password' type='password' id='oldPassword' className='mb-5 hidden' />
        <BaseInput value={newPassword} onChange={handleInput} name='new password' type='password' id='newPassword' className='mb-5 hidden' />
        <BaseInput value={confirmPassword} onChange={handleInput} name='confirm password' type='password' className='mb-5' />
        <div className="modal-action pt-4">
          <BasicButton onClick={() => closeModal('upsert')} title='Close' className='bg-gray-500 text-white' />
          <BasicButton onClick={createUser} id='btnCreate' title='Create'/>
          <BasicButton onClick={confirmUpdateUser} id='btnUpdate' title='Update'/>
        </div>
      </BaseModal>

      {/* ===== loading ===== */}
      <ModalLoading id='modal-loading' />

    </>
  )
}

export default Dashboard