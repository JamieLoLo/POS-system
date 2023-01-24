import React from 'react'
import Swal from 'sweetalert2'
import Select from 'react-select'
// icon
import { ReactComponent as DeleteIcon } from './assets/icon/delete.svg'
// hook
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
// store
import { modalActions } from '../store/modal-slice'
import { informationActions } from '../store/information-slice'
import { updateActions } from '../store/update-slice'
// api
import { modifyProductApi } from '../api/posApi'
import { categoryGetAllApi } from '../api/categoryApi'
// SCSS
import styles from './ModifyProductModal.module.scss'

const ModifyProductModal = () => {
  const dispatch = useDispatch()
  const formData = new FormData()

  // useSelector
  const isModifyProductModalOpen = useSelector(
    (state) => state.modal.isModifyProductModalOpen
  )
  const productData = useSelector((state) => state.information.product)
  const productId = useSelector((state) => state.information.product.id)
  const categoryId = useSelector(
    (state) => state.information.product.categoryId
  )
  const name = useSelector((state) => state.information.product.name)
  const nameEn = useSelector((state) => state.information.product.nameEn)
  const imageFile = useSelector((state) => state.information.product.image)
  const cost = useSelector((state) => state.information.product.cost)
  const price = useSelector((state) => state.information.product.price)
  const description = useSelector(
    (state) => state.information.product.description
  )

  // useState
  const [newImageFile, setNewImageFile] = useState()
  const [allCategoryData, setAllCategoryData] = useState([])

  // 取得上傳照片位置
  const newImageHandler = async (event) => {
    setNewImageFile(event.target.files[0])
  }

  // 取得所有分類
  useEffect(() => {
    const categoryGetAll = async () => {
      try {
        const res = await categoryGetAllApi()
        await setAllCategoryData(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    categoryGetAll()
  }, [])

  // 餐點分類選單
  const selectList = allCategoryData.map((data) => ({
    value: data.id,
    label: data.name,
  }))
  selectList.push({ value: 0, label: '未分類' })
  const options = selectList

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

    if (nameEn !== null && nameEn.length > 100) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '英文品名請輸入100字以內',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }
    if (nameEn === undefined || nameEn === '') {
      formData.append('nameEn', '')
    } else {
      formData.append('nameEn', nameEn)
    }
    if (categoryId && categoryId !== 0) {
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

    formData.append('image', newImageFile)

    if (description !== null && description.length > 100) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '描述請輸入100字以內',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    }
    if (description === undefined || description === '') {
      formData.append('description', '')
    } else {
      formData.append('description', description)
    }
    dispatch(modalActions.setIsLoadingModalOpen(true))
    const res = await modifyProductApi(formData, productId)
    if (res.status === 200) {
      dispatch(modalActions.setIsLoadingModalOpen(false))
      dispatch(updateActions.setIsProductUpdate())
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '修改成功',
        showConfirmButton: false,
        timer: 2000,
      })
      dispatch(modalActions.setIsModifyProductModalOpen(false))
      setNewImageFile(undefined)
      return
    }
  }

  return isModifyProductModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() =>
          dispatch(modalActions.setIsModifyProductModalOpen(false))
        }
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.delete__button__container}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() =>
              dispatch(modalActions.setIsModifyProductModalOpen(false))
            }
          />
        </div>

        <div className={styles.list__container}>
          <div className={styles.input__container}>
            <label htmlFor='chinese__name'>品名</label>
            <input
              type='text'
              id='chinese__name'
              defaultValue={productData.name}
              autoComplete='off'
              onChange={(e) =>
                dispatch(
                  informationActions.setProductInfo({
                    ...productData,
                    name: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='english__name'>英文品名</label>
            <input
              type='text'
              id='english__name'
              autoComplete='off'
              onChange={(e) =>
                dispatch(
                  informationActions.setProductInfo({
                    ...productData,
                    nameEn: e.target.value,
                  })
                )
              }
              defaultValue={productData.nameEn}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='category'>類別</label>
            <Select
              className={styles.select__list}
              options={options}
              onChange={(item) =>
                dispatch(
                  informationActions.setProductInfo({
                    ...productData,
                    categoryId: item.value,
                  })
                )
              }
              placeholder={productData.Category.name}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='costs'>成本</label>
            <input
              type='text'
              id='costs'
              value={productData.cost}
              autoComplete='off'
              onChange={(e) =>
                dispatch(
                  informationActions.setProductInfo({
                    ...productData,
                    cost: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='price'>價格</label>
            <input
              type='text'
              id='price'
              autoComplete='off'
              value={productData.price}
              onChange={(e) =>
                dispatch(
                  informationActions.setProductInfo({
                    ...productData,
                    price: e.target.value,
                  })
                )
              }
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
              onChange={newImageHandler}
            />
          </div>
          <div className={styles.input__container}>
            <label htmlFor='description'>描述</label>
            <textarea
              id='description'
              cols='30'
              rows='2'
              autoComplete='off'
              onChange={(e) =>
                dispatch(
                  informationActions.setProductInfo({
                    ...productData,
                    description: e.target.value,
                  })
                )
              }
              value={productData.description}
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

export default ModifyProductModal
