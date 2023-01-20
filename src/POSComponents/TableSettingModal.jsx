import React from 'react'
import Swal from 'sweetalert2'
// icon
import { ReactComponent as DeleteIcon } from './assets/icon/delete.svg'
// hook
import { useSelector, useDispatch } from 'react-redux'
// store
import { modalActions } from '../store/modal-slice'
import { informationActions } from '../store/information-slice'
import { updateActions } from '../store/update-slice'
// api
import { modifyTableApi } from '../api/posApi'
// SCSS
import styles from './TableSettingModal.module.scss'

const TableSettingModal = () => {
  const dispatch = useDispatch()
  // useSelector
  const isTableSettingModalOpen = useSelector(
    (state) => state.modal.isTableSettingModalOpen
  )
  const tableName = useSelector((state) => state.information.tableName)
  const tableID = useSelector((state) => state.information.tableID)

  // 修改桌號
  const modifyTableHandler = async () => {
    try {
      const res = await modifyTableApi(tableID, tableName, 'true')
      if (!res) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '桌號不可重複',
          showConfirmButton: false,
          timer: 2000,
        })
        return
      }
      dispatch(updateActions.setIsTableUpdate())
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '桌號修改成功',
        showConfirmButton: false,
        timer: 2000,
      })
      dispatch(modalActions.setIsTableSettingModalOpen(false))
    } catch (error) {
      console.error(error)
    }
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
        await modifyTableApi(tableID, tableName, 'false')
        dispatch(updateActions.setIsTableUpdate())
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '刪除成功',
          showConfirmButton: false,
          timer: 2000,
        })
        dispatch(modalActions.setIsTableSettingModalOpen(false))
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
          dispatch(modalActions.setIsTableSettingModalOpen(false))
        }}
      ></div>
      <div className={styles.modal__container}>
        <div className={styles.delete__button__container}>
          <DeleteIcon
            className={styles.delete__button}
            onClick={() => {
              dispatch(modalActions.setIsTableSettingModalOpen(false))
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
              defaultValue={tableName}
              onChange={(e) =>
                dispatch(informationActions.setTableName(e.target.value))
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
