import React from 'react'
import Select from 'react-select'
// hook
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// icon
import { ReactComponent as LoadingIcon } from '../POSComponents/assets/icon/loading_ball.svg'
// UI
import {
  SettingSwitchButton,
  DishItem,
  AddProductModal,
  LoadingModal,
  ModifyProductModal,
} from '../POSComponents/index'
import { PosMainGridSystem } from '../POSLayout/GridSystem'
// slice
import { posActions } from '../store/pos-slice'
import { categoryGetAllApi, getProductsApi } from '../store/category-slice'
// SCSS
import styles from './DishSettingPage.module.scss'

const DishSettingPage = () => {
  const dispatch = useDispatch()
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  // useSelector
  const isProductUpdate = useSelector((state) => state.pos.isProductUpdate)
  const allCategoryData = useSelector((state) => state.category.allCategoryData)
  const loadingStatus = useSelector((state) => state.category.loadingStatus)
  const products = useSelector((state) => state.category.products)
  // localStorage
  let id = localStorage.getItem('default_category_id')
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
    dispatch(categoryGetAllApi({ page: 'product_setting' }))
  }, [dispatch])

  // 餐點分類選單
  const selectList = allCategoryData.map((data) => ({
    value: data.id,
    label: data.name,
  }))
  selectList.push({ value: 0, label: '未分類' })
  const options = selectList

  // 取得單一分類裡的所有餐點 (首次進入本頁時)
  useEffect(() => {
    dispatch(getProductsApi({ id, page: 'setting_first' }))
  }, [dispatch, id, isProductUpdate])

  // 取得單一分類裡的所有餐點 (變化選單時)
  const productsHandler = (item) => {
    let id = item.value
    dispatch(getProductsApi({ id, page: 'setting_select' }))
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
      <AddProductModal />
      <ModifyProductModal />
      <LoadingModal title='資料上傳中...' />
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
                dispatch(posActions.setIsAddProductModalOpen(true))
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
            <div className={styles.dish__list}>
              {loadingStatus === false ? (
                productList
              ) : (
                <LoadingIcon className={styles.loading__icon} />
              )}
            </div>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default DishSettingPage
