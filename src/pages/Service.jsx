import React, { useState, useEffect } from 'react'

// component
import Sidebar from '../components/Sidebar'
import TitleBar from '../components/TitleBar'
import { BasicButton } from '../components/BaseButton'
import { BaseInput, InputTextArea, InputFile } from '../components/BaseInput'
import { BaseModal, ModalLoading, openModal, closeModal } from '../components/BaseModal'

// api
import { GetService, CreateService } from '../api/serviceApi'

const Service = () => {

  const [serviceList, setServiceList] = useState([])
  const [nul, setNul] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
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
      case 'image': setImage(value);
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
  }

  const createService = async () => {
    try {
      const response = await createService({
        name: name,
        description: description,
        image: image
      })

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const cek = () => {
    console.log(image, '<-- image');
    console.log(name)
    console.log(description)
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
                        <button className="button small red --jb-modal" type="button">
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
          <BasicButton onClick={createService} title='Create'/>
          {/* <BasicButton onClick={cek} title='cek'/> */}
        </div>
      </BaseModal>

      {/* ===== loading ===== */}
      <ModalLoading id='modal-loading' />
    </>
  )
}

export default Service