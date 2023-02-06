import React from 'react'
import Swal from 'sweetalert2'
// icon
import { ReactComponent as DeleteIcon } from './assets/icon/delete.svg'
// hook
import { useSelector, useDispatch } from 'react-redux'
// slice
import { posActions } from '../store/pos-slice'
// slice
import { modifyTableApi } from '../store/pos-slice'
// SCSS
import styles from './TableSettingModal.module.scss'

const TableSettingModal = () => {
  const dispatch = useDispatch()
  // useSelector
  const isTableSettingModalOpen = useSelector(
    (state) => state.pos.isTableSettingModalOpen
  )
  const name = useSelector((state) => state.pos.tableName)
  const id = useSelector((state) => state.pos.tableID)

  // 修改桌號
  const modifyTableHandler = () => {
    dispatch(modifyTableApi({ id, name, isValid: 'true' }))
  }

  // 刪除桌子
  const deleteTableHandler = async () => {
    try {
      let result = await Swal.fire({
        title: '確定要刪除此桌嗎？',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '刪除',
      })
      if (result.isConfirmed) {
        dispatch(modifyTableApi({ id, name, isValid: 'false' }))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return isTableSettingModalOpen ? (
    <div className={styles.modal}>
      <div
        className={styles.backdrop}
        onClick={() => {
          dispatch(posActions.setIsTableSettingModalOpen(false))
        }}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.delete__button__container}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() => {
              dispatch(posActions.setIsTableSettingModalOpen(false))
            }}
          />
        </div>
        <div className={styles.list__container}>
          <div className={styles.input__container}>
            <label htmlFor='chinese__name'>桌號</label>
            <input
              type='text'
              id='chinese__name'
              autoComplete='off'
              defaultValue={name}
              onChange={(e) =>
                dispatch(posActions.setTableName(e.target.value))
              }
            />
          </div>
        </div>
        <div className={styles.button__container}>
          <button
            className={styles.table__delete__button}
            onClick={deleteTableHandler}
          >
            刪除此桌
          </button>
          <button
            className={styles.table__confirm__button}
            onClick={modifyTableHandler}
          >
            修改桌號
          </button>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default TableSettingModal
