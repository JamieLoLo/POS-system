import React from 'react'
import clsx from 'clsx'
// hook
import { useDispatch } from 'react-redux'
// store
import { modalActions } from '../store/modal-slice'
import { informationActions } from '../store/information-slice'
// SCSS
import styles from './TableItem.module.scss'

const TableItem = ({ data }) => {
  const dispatch = useDispatch()

  const modalHandler = () => {
    dispatch(modalActions.setIsTableSettingModalOpen(true))
    dispatch(informationActions.setTableID(data.id))
    dispatch(informationActions.setTableName(data.name))
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
