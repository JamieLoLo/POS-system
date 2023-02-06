import React from 'react'
import clsx from 'clsx'
// hook
import { useDispatch } from 'react-redux'
// slice
import { posActions } from '../store/pos-slice'
// SCSS
import styles from './TableItem.module.scss'

const TableItem = ({ data }) => {
  const dispatch = useDispatch()

  const modalHandler = () => {
    dispatch(posActions.setIsTableSettingModalOpen(true))
    dispatch(posActions.setTableID(data.id))
    dispatch(posActions.setTableName(data.name))
  }

  return (
    <div
      className={clsx('', {
        [styles.table]: data.isValid === 0,
        [styles.table__active]: data.isValid !== 0,
      })}
      onClick={modalHandler}
    >
      {data.name}
    </div>
  )
}

export default TableItem
