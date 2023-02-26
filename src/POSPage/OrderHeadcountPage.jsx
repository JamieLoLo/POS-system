import React from 'react'
// hook
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// icon
import { ReactComponent as CustomerPlusIcon } from '../POSComponents/assets/icon/customer_plus.svg'
import { ReactComponent as CustomerMinusIcon } from '../POSComponents/assets/icon/customer_minus.svg'
// slice
import { addHeadcountApi, getTablesApi } from '../store/pos-slice'
// SCSS
import styles from './OrderHeadcountPage.module.scss'

const OrderCustomerPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // useState
  const [adultNum, setAdultNum] = useState(0)
  const [childrenNum, setChildrenNum] = useState(0)
  // localStorage
  const table_id = localStorage.getItem('table_id')

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  // 開桌
  const submitHandler = async () => {
    try {
      await dispatch(addHeadcountApi({ table_id, adultNum, childrenNum }))
      await dispatch(getTablesApi())
      navigate('/order/table')
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
                    if (adultNum !== 0) {
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
            <div className={styles.subtitle}>小孩</div>
            <div className={styles.count__container}>
              <div className={styles.icon__container}>
                <CustomerMinusIcon
                  className={styles.icon}
                  onClick={() => {
                    if (childrenNum !== 0) {
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
