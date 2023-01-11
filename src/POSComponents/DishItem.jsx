import React from 'react'
// hook
import { useDispatch, useSelector } from 'react-redux'
// store
import { modalActions } from '../store/modal-slice'
import { informationActions } from '../store/information-slice'
// SCSS
import styles from './DishItem.module.scss'

const DishItem = ({ data }) => {
  const dispatch = useDispatch()

  // useSelector
  const modifyHandler = () => {
    dispatch(informationActions.setProductInfo(data))
    dispatch(modalActions.setIsModifyProductModalOpen(true))
  }

  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>{data.name}</div>
      <div className={styles.list__item}>{data.Category.name}</div>
      <div className={styles.button__container}>
        <button className={styles.modify__button} onClick={modifyHandler}>
          修改
        </button>
      </div>
    </div>
  )
}

export default DishItem
