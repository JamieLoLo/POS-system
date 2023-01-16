import React from 'react'
import Swal from 'sweetalert2'
// icon
import { ReactComponent as DeleteIcon } from './assets/icon/delete.svg'
import { ReactComponent as CalculatorDeleteIcon } from './assets/icon/calculator_delete.svg'
// hook
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// store
import { modalActions } from '../store/modal-slice'
// api
import { checkoutApi } from '../api/posApi'
// SCSS
import styles from './CheckoutModal.module.scss'

const CheckoutModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // localStorage
  const orderId = JSON.parse(localStorage.getItem('order_info')).id
  const total = Number(
    JSON.parse(localStorage.getItem('order_info')).totalPrice
  )

  // useSelector
  const isCheckoutModalOpen = useSelector(
    (state) => state.modal.isCheckoutModalOpen
  )
  // useState
  const [receive, setReceive] = useState('')
  const [change, setChange] = useState(0)

  // 計算記得數字用字串先相加
  const addHandler = (addCount) => {
    setReceive((receive) => receive + addCount)
  }
  // 計算機的扣除功能
  const minusHandler = () => {
    let newString = receive.substring(0, receive.length - 1)
    setReceive(newString)
  }
  // 計算找零
  const calculateHandler = () => {
    setChange(Number(receive) - total)
  }
  // 結帳
  const checkoutHandle = async () => {
    try {
      await checkoutApi(orderId)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '結帳成功',
        showConfirmButton: false,
        timer: 2000,
      })
      dispatch(modalActions.setIsCheckoutModalOpen(false))
      navigate('/order/table')
    } catch (error) {
      console.error(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '結帳失敗，請重新操作。',
        showConfirmButton: false,
        timer: 2000,
      })
    }
  }

  return isCheckoutModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => {
          dispatch(modalActions.setIsCheckoutModalOpen(false))
          setReceive('')
          setChange('')
        }}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.delete__button__container}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() => {
              dispatch(modalActions.setIsCheckoutModalOpen(false))
              setReceive('')
              setChange('')
            }}
          />
        </div>
        <div className={styles.list__container}>
          <div className={styles.input__container}>
            <p>收取金額</p>
            <p>$ {receive}</p>
          </div>
          <div className={styles.input__container}>
            <p>應收金額</p>
            <p>$ {total}</p>
          </div>
          <div className={styles.input__container}>
            <p>找零</p>
            <p>$ {change}</p>
          </div>
        </div>
        <div className={styles.calculator__container}>
          <div className={styles.one} onClick={() => addHandler('1')}>
            1
          </div>
          <div className={styles.two} onClick={() => addHandler('2')}>
            2
          </div>
          <div className={styles.three} onClick={() => addHandler('3')}>
            3
          </div>
          <div className={styles.four} onClick={() => addHandler('4')}>
            4
          </div>
          <div className={styles.five} onClick={() => addHandler('5')}>
            5
          </div>
          <div className={styles.six} onClick={() => addHandler('6')}>
            6
          </div>
          <div className={styles.seven} onClick={() => addHandler('7')}>
            7
          </div>
          <div className={styles.eight} onClick={() => addHandler('8')}>
            8
          </div>
          <div className={styles.nine} onClick={() => addHandler('9')}>
            9
          </div>
          <div className={styles.return} onClick={minusHandler}>
            <div className={styles.calculator__icon__container}>
              <CalculatorDeleteIcon
                className={styles.calculator__delete__icon}
              />
            </div>
          </div>
          <div className={styles.zero} onClick={() => addHandler('0')}>
            0
          </div>
          <div className={styles.calculate} onClick={calculateHandler}>
            計算
          </div>
          <div className={styles.checkout} onClick={checkoutHandle}>
            確認結帳
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default CheckoutModal
