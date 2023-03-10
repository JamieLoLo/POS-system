import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
// UI
import {
  OrderItem,
  OrderCategory,
  MenuItem,
  CheckoutModal,
  LoadingModal,
} from '../POSComponents'

// slice
import { customerOrderApi } from '../store/order-slice'
import { categoryGetAllApi, getProductsApi } from '../store/category-slice'
import {
  modifyHeadcountApi,
  posActions,
  getTablesApi,
} from '../store/pos-slice'
// icon
import { ReactComponent as CustomerPlusIcon } from '../POSComponents/assets/icon/customer_plus_white.svg'
import { ReactComponent as CustomerMinusIcon } from '../POSComponents/assets/icon/customer_minus_white.svg'
// SCSS
import styles from './OrderSystemPage.module.scss'

const OrderSystemPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // localStorage
  const orderInfo = JSON.parse(localStorage.getItem('order_info'))
  const id = localStorage.getItem('default_category_id')
  const table_id = orderInfo.tableId
  const cartList = JSON.parse(localStorage.getItem('cart_list'))
  const renderCartList = JSON.parse(localStorage.getItem('render_cart_list'))
  const minCharge = Number(localStorage.getItem('min_charge'))
  const totalPrice = orderInfo.totalPrice
  const defaultTotalPrice = orderInfo.totalPrice
  const realTotalPrice = Number(orderInfo.totalPrice)
  const tableName = orderInfo.Table.name
  const order_id = Number(orderInfo.id)
  const defaultAdultNum = orderInfo.adultNum
  const defaultChildrenNum = orderInfo.childrenNum
  // useSelector
  const allCategoryData = useSelector((state) => state.category.allCategoryData)
  const products = useSelector((state) => state.category.products)

  // useState
  const [adultNum, setAdultNum] = useState(defaultAdultNum)
  const [childrenNum, setChildrenNum] = useState(defaultChildrenNum)
  const [adultCountForCompare, setAdultCountForCompare] =
    useState(defaultAdultNum)
  const [childrenCountForCompare, setChildrenCountForCompare] =
    useState(defaultChildrenNum)
  const [totalPriceForRender, setTotalPriceForRender] = useState(totalPrice)
  const [total, setTotal] = useState(defaultTotalPrice)

  // ??????????????????
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  // ??????????????????
  useEffect(() => {
    dispatch(categoryGetAllApi({ page: 'admin_order_page' }))
  }, [dispatch])

  // ???????????????????????????????????? (?????????????????????)
  useEffect(() => {
    dispatch(getProductsApi({ id, page: 'admin_order_first' }))
  }, [dispatch, id])

  // ??????????????? orderInfo
  // useEffect(() => {
  //   let table_id = tableName
  //   dispatch(getOrderApi({ table_id, page: 'pos_order_page' }))
  // }, [dispatch, table_id, tableName])

  // ???????????????????????????????????? (??????????????????)
  const productsHandler = async (id) => {
    dispatch(getProductsApi({ id, page: 'admin_order_select' }))
  }

  // ???????????????????????????????????????
  const addProductHandler = (productId, price, name) => {
    // ??????????????????????????????
    let isProductExit = cartList.find(
      (product) => product.productId === productId
    )
    if (isProductExit) {
      // ????????????
      let newList = cartList.map((product) => {
        if (product.productId === productId) {
          product.count = product.count + 1
        }
        return product
      })
      let filterCartList = newList.filter((product) => product.count !== 0)
      localStorage.setItem('cart_list', JSON.stringify(filterCartList))
    } else {
      // ????????????
      cartList.push({
        orderId: order_id,
        productId: productId,
        count: 1,
        sellingPrice: price,
      })
      localStorage.setItem('cart_list', JSON.stringify(cartList))
    }

    // ???????????????????????????
    let isRenderCartExit = renderCartList.find(
      (product) => product.productId === productId
    )
    if (isRenderCartExit) {
      // ????????????
      let newList = renderCartList.map((product) => {
        if (product.productId === productId) {
          product.count = product.count + 1
        }
        return product
      })
      let filterCartList = newList.filter((product) => product.count !== 0)
      localStorage.setItem('render_cart_list', JSON.stringify(filterCartList))
    } else {
      // ????????????
      renderCartList.push({
        productId: productId,
        name: name,
        count: 1,
        sellingPrice: price,
      })
      localStorage.setItem('render_cart_list', JSON.stringify(renderCartList))
    }

    let calculatePrice = cartList.reduce(
      (acc, product) => acc + product.count * product.sellingPrice,
      0
    )
    localStorage.setItem('total_price', calculatePrice)
    setTotalPriceForRender(calculatePrice)
  }

  // ???????????????????????????????????????
  const minusProductHandler = (id) => {
    // ??????????????????????????????
    let isProductExit = cartList.find((product) => product.productId === id)
    if (isProductExit) {
      // ????????????
      let newList = cartList.map((product) => {
        if (product.productId === id && product.count !== 0) {
          product.count = product.count - 1
        }
        return product
      })
      let filterCartList = newList.filter((product) => product.count !== 0)
      localStorage.setItem('cart_list', JSON.stringify(filterCartList))
    }

    // ??????????????????????????????
    let isRenderCartExit = renderCartList.find(
      (product) => product.productId === id
    )
    if (isRenderCartExit) {
      // ????????????
      let newList = renderCartList.map((product) => {
        if (product.productId === id && product.count !== 0) {
          product.count = product.count - 1
        }
        return product
      })
      let filterCartList = newList.filter((product) => product.count !== 0)
      localStorage.setItem('render_cart_list', JSON.stringify(filterCartList))
    }

    let calculatePrice = cartList.reduce(
      (acc, product) => acc + product.count * product.sellingPrice,
      0
    )

    localStorage.setItem('total_price', calculatePrice)
    setTotalPriceForRender(calculatePrice)
  }

  // ???????????????????????????
  const addMenuItemHandler = (productId, price, name) => {
    // ??????????????????????????????
    let isProductExit = cartList.find(
      (product) => product.productId === productId
    )
    if (isProductExit) {
      return
    } else {
      // ????????????
      cartList.push({
        orderId: order_id,
        productId: productId,
        count: 1,
        sellingPrice: price,
      })
      localStorage.setItem('cart_list', JSON.stringify(cartList))
    }

    // ???????????????????????????
    let isRenderCartExit = renderCartList.find(
      (product) => product.productId === productId
    )
    if (isRenderCartExit) {
      return
    } else {
      // ????????????
      renderCartList.push({
        productId: productId,
        name: name,
        count: 1,
        sellingPrice: price,
      })
      localStorage.setItem('render_cart_list', JSON.stringify(renderCartList))
    }

    let calculatePrice = cartList.reduce(
      (acc, product) => acc + product.count * product.sellingPrice,
      0
    )
    localStorage.setItem('total_price', calculatePrice)
    setTotalPriceForRender(calculatePrice)
  }

  // ???????????????????????????
  const modifyHandler = async () => {
    dispatch(posActions.setIsLoadingModalOpen(true))
    try {
      if (total !== totalPriceForRender) {
        let data = cartList
        dispatch(customerOrderApi({ order_id, data, page: 'admin_order' }))
        setTotal(totalPriceForRender)
        let newOrderInfoPrice = {
          ...orderInfo,
          totalPrice: totalPriceForRender,
        }
        localStorage.setItem('order_info', JSON.stringify(newOrderInfoPrice))
      }
      if (
        adultCountForCompare !== adultNum ||
        childrenCountForCompare !== childrenNum
      ) {
        dispatch(modifyHeadcountApi({ table_id, adultNum, childrenNum }))
        let newHeadcount = {
          ...orderInfo,
          adultNum: adultNum,
          childrenNum: childrenNum,
        }
        localStorage.setItem('order_info', JSON.stringify(newHeadcount))
        setAdultCountForCompare(adultNum)
        setChildrenCountForCompare(childrenNum)
      }
      dispatch(posActions.setIsLoadingModalOpen(false))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '??????????????????',
        showConfirmButton: false,
        timer: 2000,
      })
    } catch (error) {
      console.error(error)
    }
  }

  // ????????????
  const checkoutHandler = () => {
    if (realTotalPrice < minCharge * adultNum) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '????????????',
        showConfirmButton: false,
        timer: 2000,
      })
      return
    } else {
      dispatch(posActions.setIsCheckoutModalOpen(true))
      dispatch(getTablesApi())
    }
  }

  //  ?????????????????????
  const orderList = renderCartList.map((data) => (
    <OrderItem
      data={data}
      key={data.productId}
      addProductHandler={addProductHandler}
      minusProductHandler={minusProductHandler}
    />
  ))

  // ????????????
  const categoryList = allCategoryData.map((data) => (
    <OrderCategory
      data={data}
      key={data.id}
      onClick={(id) => productsHandler(id)}
    />
  ))

  // ????????????
  const productList = products.map((data) => (
    <MenuItem
      data={data}
      key={data.id}
      addMenuItemHandler={addMenuItemHandler}
    />
  ))

  // ??????????????????
  const returnHandler = () => {
    localStorage.setItem('render_cart_list', JSON.stringify([]))
    navigate('/order/table')
  }

  return (
    <div className='main__container'>
      <CheckoutModal />
      <LoadingModal title='???????????????...' />
      <div className={styles.left__side__container}>
        <div className={styles.table__name__container}>
          <p className={StyleSheet.table__name}>{tableName}</p>
        </div>
        <div className={styles.order__list}>{orderList}</div>
        <div className={styles.control__container}>
          <div className={styles.adult__container}>
            <div className={styles.subtitle}>??????</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerMinusIcon
                  className={styles.icon}
                  onClick={() => {
                    if (adultNum > 0) {
                      setAdultNum((adultNum) => adultNum - 1)
                    }
                  }}
                />
              </div>
              <p className={styles.count}>{adultNum}</p>
              <div className={styles.icon__container}>
                <CustomerPlusIcon
                  className={styles.icon}
                  onClick={() => {
                    setAdultNum((adultNum) => adultNum + 1)
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.children__container}>
            <div className={styles.subtitle}>??????</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerMinusIcon
                  className={styles.icon}
                  onClick={() => {
                    if (childrenNum > 0) {
                      setChildrenNum((childrenNum) => childrenNum - 1)
                    }
                  }}
                />
              </div>
              <p className={styles.count}>{childrenNum}</p>
              <div className={styles.icon__container}>
                <CustomerPlusIcon
                  className={styles.icon}
                  onClick={() => {
                    setChildrenNum((childrenNum) => childrenNum + 1)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right__side__container}>
        <div className={styles.classification__container}>{categoryList}</div>
        <div className={styles.menu__container}>{productList}</div>
        <div className={styles.button__container}>
          <button className={styles.return__button} onClick={returnHandler}>
            ??????
          </button>
          {total === totalPriceForRender &&
            adultCountForCompare === adultNum &&
            childrenCountForCompare === childrenNum &&
            totalPrice < minCharge * adultNum && (
              <button className={styles.unreached__button}>
                ????????????
                <br />
                <p className={styles.price}>
                  ?????????${minCharge * adultNum - totalPrice}
                </p>
              </button>
            )}
          {total === totalPriceForRender &&
            adultCountForCompare === adultNum &&
            childrenCountForCompare === childrenNum &&
            totalPrice >= minCharge * adultNum && (
              <button
                className={styles.checkout__button}
                onClick={checkoutHandler}
              >
                ??????
                <br />
                <p className={styles.price}>???????????????${totalPriceForRender}</p>
              </button>
            )}
          {(total !== totalPriceForRender ||
            adultCountForCompare !== adultNum ||
            childrenCountForCompare !== childrenNum) && (
            <button className={styles.modify__button} onClick={modifyHandler}>
              ????????????
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderSystemPage
