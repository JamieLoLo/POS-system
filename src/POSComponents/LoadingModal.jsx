import React from 'react'
// hook
import { useSelector } from 'react-redux'
// icon
import { ReactComponent as LoadingIcon } from './assets/icon/loading.svg'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './LoadingModal.module.scss'

const LoadingModal = () => {
  // useSelector
  const isLoadingModalOpen = useSelector(
    (state) => state.modal.isLoadingModalOpen
  )
  return isLoadingModalOpen ? (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.modal__container}>
        <div className={styles.title}>資料上傳中...</div>
        <div className={styles.icon__container}>
          <LoadingIcon className={styles.icon} />
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default LoadingModal
