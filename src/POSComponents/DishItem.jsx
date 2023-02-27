import React from 'react'
// hook
import { useDispatch } from 'react-redux'
// icon
import { ReactComponent as EditIcon } from '../POSComponents/assets/icon/edit.svg'
// store
import { posActions } from '../store/pos-slice'
// SCSS
import styles from './DishItem.module.scss'

const DishItem = ({ data }) => {
  const dispatch = useDispatch()

  // 點擊修改按鈕
  const modifyHandler = () => {
    dispatch(posActions.setProductInfo(data))
    dispatch(posActions.setIsModifyProductModalOpen(true))
  }

  return (
    <div className={styles.list__container}>
      <div className={styles.list__item}>{data.name}</div>
      <div className={styles.list__item}>{data.Category.name}</div>
      <div className={styles.button__container}>
        <button className={styles.modify__button} onClick={modifyHandler}>
          <EditIcon className={styles.icon} />
        </button>
      </div>
    </div>
  )
}

export default DishItem
