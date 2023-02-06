import React from 'react'
import Swal from 'sweetalert2'
import Select from 'react-select'
// icon
import { ReactComponent as DeleteIcon } from './assets/icon/delete.svg'
// hook
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
// slice
import { addProductApi, posActions } from '../store/pos-slice'
import { categoryGetAllApi } from '../store/category-slice'
// SCSS
import styles from './AddProductModal.module.scss'

const AddProductModal = () => {
  const dispatch = useDispatch()
  const formData = new FormData()

  // useSelector
  const isAddProductModalOpen = useSelector(
    (state) => state.pos.isAddProductModalOpen
  )
  const allCategoryData = useSelector((state) => state.category.allCategoryData)
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

  // 取得所有分類
  useEffect(() => {
    dispatch(categoryGetAllApi({ page: 'add_product' }))
  }, [dispatch])

  // 關閉 modal 時，清空原有資料。
  const refreshHandler = () => {
    setCategoryId()
    setName()
    setNameEn()
    setDescription()
    setImageFile()
    setCost()
    setPrice()
  }

  // 餐點分類選單
  const options = allCategoryData.map((data) => ({
    value: data.id,
    label: data.name,
  }))

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
    } else if (name.length > 25) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '品名請輸入25字以內',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    } else {
      formData.append('name', name)
    }
    if (nameEn === undefined || nameEn === '') {
      formData.append('nameEn', '')
    } else if (nameEn.length > 100) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '英文品名請輸入100字以內',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    } else {
      formData.append('nameEn', nameEn)
    }
    if (categoryId) {
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
    if (description === undefined || description === '') {
      formData.append('description', '')
    } else if (description.length > 100) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '描述請輸入100字以內',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    } else {
      formData.append('description', description)
    }
    dispatch(posActions.setIsLoadingModalOpen(true))
    dispatch(addProductApi(formData))
  }

  return isAddProductModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => {
          dispatch(posActions.setIsAddProductModalOpen(false))
          refreshHandler()
        }}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.delete__button__container}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() => {
              dispatch(posActions.setIsAddProductModalOpen(false))
              refreshHandler()
            }}
          />
        </div>

        <div className={styles.list__container}>
          <div className={styles.input__container}>
            <label htmlFor='chinese__name'>品名</label>
            <input
              type='text'
              id='chinese__name'
              onChange={(e) => setName(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='english__name'>英文品名</label>
            <input
              type='text'
              id='english__name'
              onChange={(e) => setNameEn(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='category'>類別</label>
            <Select
              className={styles.select__list}
              options={options}
              onChange={(item) => setCategoryId(item.value)}
              placeholder='請選擇類別'
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='costs'>成本</label>
            <input
              type='text'
              id='costs'
              onChange={(e) => setCost(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='price'>價格</label>
            <input
              type='text'
              id='price'
              onChange={(e) => setPrice(e.target.value)}
              autoComplete='off'
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
              rows='2'
              onChange={(e) => setDescription(e.target.value)}
              autoComplete='off'
            ></textarea>
          </div>
        </div>
        <div className={styles.submit__button__container}>
          <button className={styles.submit__button} onClick={addProductHandler}>
            送出
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default AddProductModal
