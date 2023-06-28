import React, { useState, useEffect } from 'react'

// component
import Sidebar from '../components/Sidebar'
import TitleBar from '../components/TitleBar'
import { BasicButton } from '../components/BaseButton'
import { BaseInput, InputTextArea, InputFile } from '../components/BaseInput'
import { BaseModal, ModalLoading, openModal, closeModal } from '../components/BaseModal'
import { AlertSuccess, AlertConfirm } from '../components/SweetAlert'

// api
import { GetService, CreateService, DeleteService } from '../api/serviceApi'

const Service = () => {

  const [serviceList, setServiceList] = useState([])
  const [nul, setNul] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')

  const getAllService = async () => {
    try {
      const respone = await GetService()
      setServiceList(respone.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name': setName(value);
        break;
      case 'description': setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleInputFile = (e) => {
    const imageSelect = e.target.files[0]
    setImage(imageSelect);
    setImageUrl(URL.createObjectURL(imageSelect));
  };

  const createNew = () => {
    openModal('upsert')
    setName('')
    setDescription('')
    setImage(nul)
    setImageUrl('')
  }

  const createNewService = async () => {
    const formData = new FormData();
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', image);
    try {
      closeModal('upsert')
      openModal('modal-loading')
      await CreateService(formData)

      getAllService()
      closeModal('modal-loading')
      AlertSuccess('Service has been created')
    } catch (error) {
      console.log(error);
    }
  }

  const deleteService = (id) => {
    AlertConfirm({
      title: 'Delete?',
      preConfirm: () => {
        confirmDeleteService(id)
      }
    })
  }

  const confirmDeleteService = async (id) => {
    try {
      openModal('modal-loading')
      const respone = await DeleteService(id)
      
      closeModal('modal-loading')
      AlertSuccess(respone.message)
      getAllService()
    } catch (error) {
      console.log(error);
    }
  }

  const cek = () => {
    console.log(name)
    console.log(description)
    console.log(image, '<-- image');
    // console.log(imageUrl, '<-- image URL');
  }

  useEffect(() => {
    getAllService()
  }, [])

  return (
    <>
      <Sidebar />
      <TitleBar
        title='Service'
        button={<BasicButton onClick={createNew} iconShow='block' icon='mdi-plus-thick' title='Create New Service'/>}
      />

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <table className='text-slate-800'>
              <thead>
                <tr>
                  <th></th>
                  <th>Service Name</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {serviceList.map((service, index) => (
                  <tr key={service.id}>
                    <td>{index+1}</td>
                    <td>{service.name}</td>
                    <td>{service.description}</td>
                    <td>
                      <img style={{width: '150px'}} src={`http://localhost:8000/${service.image}`} alt="" />
                    </td>
                    <td>
                      <small>{service.createdAt}</small>
                    </td>
                    <td className="actions-cell">
                      <div className="buttons right nowrap">
                        <button className="button small blue --jb-modal" type="button">
                          <span className="icon"><i className="mdi mdi-pencil mdi-18px"></i></span>
                        </button>
                        <button onClick={() => deleteService(service.id)} className="button small red --jb-modal" type="button">
                          <span className="icon"><i className="mdi mdi-delete mdi-18px"></i></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== upsert modal ===== */}
      <BaseModal id='upsert' title='Create New Service' classSize='w-screen'>
          <div className='grid gap-4 md:grid-cols-2'>
            <BaseInput value={name} onChange={handleInput} name='name' className='mb-5' />
            <InputFile value={image} onChange={handleInputFile} name='image' className='mb-5' />
          </div>
          <InputTextArea value={description} onChange={handleInput} name='description' className='mb-5' />
          <div className="modal-action pt-4">
            <BasicButton onClick={() => closeModal('upsert')} title='Close' className='bg-gray-500 text-white' />
            <BasicButton onClick={createNewService} title='Create'/>
            <BasicButton onClick={cek} title='cek' />
          </div>
      </BaseModal>

      {/* ===== loading ===== */}
      <ModalLoading id='modal-loading' />
    </>
  )
}

export default Service