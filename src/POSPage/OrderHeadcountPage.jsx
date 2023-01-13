import React from 'react'
import Swal from 'sweetalert2'
// hook
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// icon
import { ReactComponent as CustomerPlusIcon } from '../POSComponents/assets/icon/customer_plus.svg'
import { ReactComponent as CustomerMinusIcon } from '../POSComponents/assets/icon/customer_minus.svg'
// api
import { addHeadcountApi } from '../api/posApi'
// store
import { informationActions } from '../store/information-slice'
// SCSS
import styles from './OrderHeadcountPage.module.scss'

const OrderCustomerPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // useState
  const [adultCount, setAdultCount] = useState(0)
  const [childrenCount, setChildrenCount] = useState(0)
  // useSelector
  const tableId = useSelector((state) => state.information.tableInfo.id)

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])
  console.log(tableId)

  // 開桌
  const submitHandler = async () => {
    try {
      const res = await addHeadcountApi(tableId, adultCount, childrenCount)
      await dispatch(informationActions.setHeadcountInfo(res.data))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '成功開桌，正在導向點餐頁面。',
        showConfirmButton: false,
        timer: 2000,
      })
      navigate('/order/system')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.page__container}>
      <div className={styles.content__container}>
        <div className={styles.title}>請先選擇用餐人數再進行點餐！</div>
        <div className={styles.control__container}>
          <div className={styles.adult__container}>
            <div className={styles.subtitle}>大人</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerMinusIcon
                  className={styles.icon}
                  onClick={() => {
                    if (adultCount !== 0) {
                      setAdultCount((adultCount) => adultCount - 1)
                    }
                  }}
                />
              </div>
              <p className={styles.count}>{adultCount}</p>
              <div className={styles.icon__container}>
                <CustomerPlusIcon
                  className={styles.icon}
                  onClick={() => {
                    setAdultCount((adultCount) => adultCount + 1)
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.children__container}>
            <div className={styles.subtitle}>小孩</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerMinusIcon
                  className={styles.icon}
                  onClick={() => {
                    if (childrenCount !== 0) {
                      setChildrenCount((childrenCount) => childrenCount - 1)
                    }
                  }}
                />
              </div>
              <p className={styles.count}>{childrenCount}</p>
              <div className={styles.icon__container}>
                <CustomerPlusIcon
                  className={styles.icon}
                  onClick={() => {
                    setChildrenCount((childrenCount) => childrenCount + 1)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.button__container}>
          <button className={styles.open__button} onClick={submitHandler}>
            開桌
          </button>
          <Link to='/order/table'>
            <button className={styles.return__button}>返回</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderCustomerPage
