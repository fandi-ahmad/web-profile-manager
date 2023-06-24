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
import { GetUser, DeleteUser, CreateUser } from '../api/userApi';

const Dashboard = () => {

  const [userActive, setUserActive] = useGlobalState('userActive')
  const [userList, setUserList] = useState([])
  const [nul, setnul] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const auth = (token) => {
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }


  const getAllUser = async () => {
    try {
      const userToken = localStorage.getItem('user')
      const response = await GetUser(auth(userToken))

      setUserList(response.data)
    } catch (error) {
      console.log(error, '<-- error get all user');
    }
  };

  const deleteUser = async (id) => {
    try {
      openModal('modal-loading')
      const userToken = localStorage.getItem('user')
      await DeleteUser(id, auth(userToken))
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
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirm password':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const createUser = async () => {
    try {
      if (username === '' || password === '' || confirmPassword === '') {
        AlertError('Input cannot be empty')
      } else {
        if (password != confirmPassword) {
          AlertError('password must be the same')
          setConfirmPassword('')
        } else {
          console.log('semua input terpenuhi')
          closeModal('upsert')
          openModal('modal-loading')

          const response = await CreateUser({
            username: username,
            password: password
          })

          console.log(response, '<-- berhasil create user')

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
                  <th>Fullname</th>
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
                    <td>-</td>
                    <td>-</td>
                    <td>
                      <small>{user.createdAt}</small>
                    </td>
                    <td className="actions-cell">
                      <div className="buttons right nowrap">
                        <button className="button small blue --jb-modal" type="button">
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
        <BaseInput value={password} onChange={handleInput} name='password' type='password' className='mb-5' />
        <BaseInput value={confirmPassword} onChange={handleInput} name='confirm password' type='password' className='mb-5' />
        <div className="modal-action pt-4">
          <BasicButton onClick={() => closeModal('upsert')} title='Close' className='bg-gray-500 text-white' />
          <BasicButton onClick={createUser} title='Create'/>
        </div>
      </BaseModal>

      {/* ===== loading ===== */}
      <ModalLoading id='modal-loading' />

    </>
  )
}

export default Dashboard