import React from 'react'
// hook
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import { FormSwitchButton, AccountClosingModal } from '../POSComponents/index'
// store
import { modalActions } from '../store/modal-slice'
// SCSS
import styles from './AccountClosingPage.module.scss'

const AccountClosingPage = () => {
  const pathname = useLocation().pathname
  const dispatch = useDispatch()
  return (
    <div className='main__container'>
      <AccountClosingModal />
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <FormSwitchButton page='account' />
          <div className={styles.content__container}>
            <form className={styles.calculate__wrapper}>
              <table>
                <tr>
                  <th className={styles.left__top}>金額</th>
                  <th className={styles.right__top}>數量</th>
                </tr>
                <tr>
                  <td>
                    <label className={styles.label} htmlFor='two__thousand'>
                      $2000
                    </label>
                  </td>
                  <td>
                    <input
                      className={styles.input}
                      type='text'
                      id='two__thousand'
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className={styles.label} htmlFor='one__thousand'>
                      $1000
                    </label>
                  </td>
                  <td>
                    <input
                      className={styles.input}
                      type='text'
                      id='one__thousand'
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className={styles.label} htmlFor='five__hundred'>
                      $500
                    </label>
                  </td>
                  <td>
                    <input
                      className={styles.input}
                      type='text'
                      id='five__hundred'
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className={styles.label} htmlFor='two__hundred'>
                      $200
                    </label>
                  </td>
                  <td>
                    {' '}
                    <input
                      className={styles.input}
                      type='text'
                      id='two__hundred'
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className={styles.label} htmlFor='one__hundred'>
                      $100
                    </label>
                  </td>
                  <td>
                    <input
                      className={styles.input}
                      type='text'
                      id='one__hundred'
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className={styles.label} htmlFor='fifty'>
                      $50
                    </label>
                  </td>
                  <td>
                    <input className={styles.input} type='text' id='fifty' />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className={styles.label} htmlFor='ten'>
                      $10
                    </label>
                  </td>
                  <td>
                    <input className={styles.input} type='text' id='ten' />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className={styles.label} htmlFor='five'>
                      $5
                    </label>
                  </td>
                  <td>
                    <input className={styles.input} type='text' id='five' />
                  </td>
                </tr>
                <tr>
                  <td className={styles.left__bottom}>
                    <label className={styles.label} htmlFor='one'>
                      $1
                    </label>
                  </td>
                  <td className={styles.right__bottom}>
                    <input className={styles.input} type='text' id='one' />
                  </td>
                </tr>
              </table>
            </form>
          </div>
          <div className={styles.button__container}>
            <button
              className={styles.submit__button}
              onClick={() => {
                dispatch(modalActions.setIsAccountClosingModalOpen(true))
              }}
            >
              開始結算
            </button>
          </div>
        </div>
      </PosMainGridSystem>
    </div>
  )
}

export default AccountClosingPage
