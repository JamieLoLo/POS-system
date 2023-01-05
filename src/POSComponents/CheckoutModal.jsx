import React from 'react'
// icon
import { ReactComponent as DeleteIcon } from './assets/icon/delete.svg'
import { ReactComponent as CalculatorDeleteIcon } from './assets/icon/calculator_delete.svg'
// hook
import { useSelector, useDispatch } from 'react-redux'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './CheckoutModal.module.scss'

const CheckoutModal = () => {
  const dispatch = useDispatch()
  // useSelector
  const isCheckoutModalOpen = useSelector(
    (state) => state.modal.isCheckoutModalOpen
  )
  return isCheckoutModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => dispatch(modalActions.setIsCheckoutModalOpen(false))}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.delete__button__container}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() => dispatch(modalActions.setIsCheckoutModalOpen(false))}
          />
        </div>
        <div className={styles.list__container}>
          <div className={styles.input__container}>
            <p>收取金額</p>
            <p>$0</p>
          </div>
          <div className={styles.input__container}>
            <p>應收金額</p>
            <p>$1200</p>
          </div>
          <div className={styles.input__container}>
            <p>找零</p>
            <p>$0</p>
          </div>
        </div>
        <div className={styles.calculator__container}>
          <div className={styles.one}>1</div>
          <div className={styles.two}>2</div>
          <div className={styles.three}>3</div>
          <div className={styles.four}>4</div>
          <div className={styles.five}>5</div>
          <div className={styles.six}>6</div>
          <div className={styles.seven}>7</div>
          <div className={styles.eight}>8</div>
          <div className={styles.nine}>9</div>
          <div className={styles.return}>
            <div className={styles.calculator__icon__container}>
              <CalculatorDeleteIcon
                className={styles.calculator__delete__icon}
              />
            </div>
          </div>
          <div className={styles.zero}>0</div>
          <div className={styles.calculate}>計算</div>
          <div className={styles.checkout}>確認結帳</div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default CheckoutModal
