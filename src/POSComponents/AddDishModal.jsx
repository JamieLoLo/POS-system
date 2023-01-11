import React from 'react'
import Swal from 'sweetalert2'
// icon
import { ReactComponent as DeleteIcon } from './assets/icon/delete.svg'
// hook
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
// store
import { modalActions } from '../store/modal-slice'
// api
import { AddProductApi } from '../api/posApi'
// SCSS
import styles from './AddDishModal.module.scss'

const AddDishModal = () => {
  const dispatch = useDispatch()
  const formData = new FormData()

  // useSelector
  const isAddDishModalOpen = useSelector(
    (state) => state.modal.isAddDishModalOpen
  )
  // useState
  const [categoryId, setCategoryId] = useState()
  const [name, setName] = useState()
  const [nameEn, setNameEn] = useState()
  const [description, setDescription] = useState()
  const [imageFile, setImageFile] = useState()
  const [cost, setCost] = useState()
  const [price, setPrice] = useState()

  // 取得上傳照片位置
  const AddImageHandler = async (event) => {
    setImageFile(event.target.files[0])
  }

  // 新增餐點
  const addProductHandler = async () => {
    if (name === undefined || name === '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '品名不可空白',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    } else {
      formData.append('name', name)
    }
    if (nameEn === undefined || nameEn === '') {
      formData.append('nameEn', '')
    } else {
      formData.append('nameEn', nameEn)
    }
    if (categoryId !== undefined || categoryId !== '') {
      formData.append('categoryId', categoryId)
    }
    if (cost === undefined || cost === '') {
      formData.append('cost', 0)
    } else {
      formData.append('cost', cost)
    }
    if (price === undefined || price === '') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '價格不可空白',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    } else {
      formData.append('price', price)
    }
    formData.append('image', imageFile)
    if (description.length === 0) {
      formData.append('description', '')
    } else {
      formData.append('description', description)
    }
    const res = await AddProductApi(formData)
    if (res.status === 200) {
      dispatch(modalActions.setIsAddDishModalOpen(false))
      console.log('success!!!')
      console.log(res.data)
      return
    }
  }

  return isAddDishModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => dispatch(modalActions.setIsAddDishModalOpen(false))}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.delete__button__container}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() => dispatch(modalActions.setIsAddDishModalOpen(false))}
          />
        </div>
        <div className={styles.list__container}>
          <div className={styles.input__container}>
            <label htmlFor='chinese__name'>品名</label>
            <input
              type='text'
              id='chinese__name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='english__name'>英文品名</label>
            <input
              type='text'
              id='english__name'
              onChange={(e) => setNameEn(e.target.value)}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='category'>類別</label>
            <input
              type='text'
              id='category'
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='costs'>成本</label>
            <input
              type='text'
              id='costs'
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='price'>價格</label>
            <input
              type='text'
              id='price'
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='image'>照片</label>
            <input
              style={{ border: 'none' }}
              type='file'
              accept='image/png,image/jpeg,image/jpg'
              id='image'
              className={styles.upload__button}
              onChange={AddImageHandler}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='description'>描述</label>
            <textarea
              id='description'
              cols='30'
              rows='4'
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.submit__button__container}>
            <button
              className={styles.submit__button}
              onClick={addProductHandler}
            >
              送出
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default AddDishModal
