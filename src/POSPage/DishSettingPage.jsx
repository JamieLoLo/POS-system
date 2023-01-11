import React from 'react'
import Select from 'react-select'
// hook
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// UI
import {
  SettingSwitchButton,
  DishItem,
  AddProductModal,
  LoadingModal,
  ModifyProductModal,
} from '../POSComponents/index'
import { PosMainGridSystem } from '../POSLayout/GridSystem'
// store
import { modalActions } from '../store/modal-slice'
// api
import { categoryGetAllApi, getProductsApi } from '../api/categoryApi'
// SCSS
import styles from './DishSettingPage.module.scss'

const DishSettingPage = () => {
  const dispatch = useDispatch()
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  // useSelector
  const isAddProductModalOpen = useSelector(
    (state) => state.modal.isAddProductModalOpen
  )
  const isLoadingModalOpen = useSelector(
    (state) => state.modal.isLoadingModalOpen
  )
  const isModifyProductModalOpen = useSelector(
    (state) => state.modal.isModifyProductModalOpen
  )
  // useState
  const [allCategoryData, setAllCategoryData] = useState([])
  const [products, setProducts] = useState([])
  // localStorage
  const defaultCategoryId = localStorage.getItem('default_category_id')
  const defaultCategoryName = localStorage.getItem('default_category_name')

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

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

  // 取得單一分類裡的所有餐點 (首次進入本頁時)
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await getProductsApi(defaultCategoryId)
        await setProducts(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
  }, [defaultCategoryId])

  // 取得單一分類裡的所有餐點 (變化選單時)
  const productsHandler = async (item) => {
    try {
      const res = await getProductsApi(item.value)
      setProducts(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  // 登出
  const logoutHandler = () => {
    localStorage.clear()
    navigate('/admin/login')
  }

  // 餐點列表
  const productList = products.map((data) => (
    <DishItem data={data} key={data.id} />
  ))

  return (
    <div>
      <AddProductModal trigger={isAddProductModalOpen} />
      <ModifyProductModal trigger={isModifyProductModalOpen} />
      <LoadingModal trigger={isLoadingModalOpen} />
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <button className={styles.logout__button} onClick={logoutHandler}>
            登出
          </button>
          <SettingSwitchButton page='dish' />
          <div className={styles.input__container}>
            <button
              className={styles.button}
              onClick={() => {
                dispatch(modalActions.setIsAddProductModalOpen(true))
              }}
            >
              新增品項
            </button>
            <Select
              options={options}
              className={styles.select__list}
              placeholder={defaultCategoryName}
              onChange={(item) => productsHandler(item)}
            />
          </div>
          <div className={styles.list__container}>
            <div className={styles.title__container}>
              <div className={styles.title}>品項</div>
              <div className={styles.title}>類別</div>
            </div>
            <div className={styles.dish__list}>{productList}</div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default DishSettingPage
