import React from 'react'
// hook
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
// UI
import { PosMainGridSystem } from '../POSLayout/GridSystem'
import { FormSwitchButton, AccountClosingModal } from '../POSComponents/index'
// api
import { getUnsettledRevenueApi } from '../api/posApi'
// store
import { modalActions } from '../store/modal-slice'
import { informationActions } from '../store/information-slice'
// SCSS
import styles from './AccountClosingPage.module.scss'

const AccountClosingPage = () => {
  const pathname = useLocation().pathname
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // useSelector
  const isAccountClosingModalOpen = useSelector(
    (state) => state.modal.isAccountClosingModalOpen
  )
  // useState
  const [twoThousand, setTwoThousand] = useState(0)
  const [oneThousand, setOneThousand] = useState(0)
  const [fiveHundred, setFiveHundred] = useState(0)
  const [twoHundred, setTwoHundred] = useState(0)
  const [oneHundred, setOneHundred] = useState(0)
  const [fifty, setFifty] = useState(0)
  const [ten, setTen] = useState(0)
  const [five, setFive] = useState(0)
  const [one, setOne] = useState(0)

  // 確認登入狀態
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/admin/login')
    }
  }, [navigate])

  // 取得未結帳營收
  useEffect(() => {
    const getUnsettledRevenue = async () => {
      const res = await getUnsettledRevenueApi()
      dispatch(informationActions.setUnSettledRevenue(res.data))
    }
    getUnsettledRevenue()
  }, [dispatch])

  // 計算金額加總
  const startCalculateHandler = () => {
    dispatch(
      informationActions.setAccountClosingCalculate(
        2000 * twoThousand +
          1000 * oneThousand +
          500 * fiveHundred +
          200 * twoHundred +
          100 * oneHundred +
          50 * fifty +
          10 * ten +
          5 * five +
          1 * one
      )
    )
    dispatch(modalActions.setIsAccountClosingModalOpen(true))
  }

  return (
    <div className='main__container'>
      <AccountClosingModal trigger={isAccountClosingModalOpen} />
      <PosMainGridSystem pathname={pathname}>
        <div className={styles.container__height}>
          <FormSwitchButton page='account' />
          <div className={styles.content__container}>
            <form className={styles.calculate__wrapper}>
              <table>
                <thead>
                  <tr>
                    <th className={styles.left__top}>金額</th>
                    <th className={styles.right__top}>數量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label className={styles.label} htmlFor='two__thousand'>
                        $2000
                      </label>
                    </td>
                    <td>
                      <input
                        className={styles.input}
                        type='number'
                        id='two__thousand'
                        onChange={(e) => setTwoThousand(e.target.value)}
                        autoComplete='off'
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
                        type='number'
                        id='one__thousand'
                        onChange={(e) => setOneThousand(e.target.value)}
                        autoComplete='off'
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
                        type='number'
                        id='five__hundred'
                        onChange={(e) => setFiveHundred(e.target.value)}
                        autoComplete='off'
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
                      <input
                        className={styles.input}
                        type='number'
                        id='two__hundred'
                        onChange={(e) => setTwoHundred(e.target.value)}
                        autoComplete='off'
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
                        type='number'
                        id='one__hundred'
                        onChange={(e) => setOneHundred(e.target.value)}
                        autoComplete='off'
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
                      <input
                        className={styles.input}
                        type='number'
                        id='fifty'
                        onChange={(e) => setFifty(e.target.value)}
                        autoComplete='off'
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className={styles.label} htmlFor='ten'>
                        $10
                      </label>
                    </td>
                    <td>
                      <input
                        className={styles.input}
                        type='number'
                        id='ten'
                        onChange={(e) => setTen(e.target.value)}
                        autoComplete='off'
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className={styles.label} htmlFor='five'>
                        $5
                      </label>
                    </td>
                    <td>
                      <input
                        className={styles.input}
                        type='number'
                        id='five'
                        onChange={(e) => setFive(e.target.value)}
                        autoComplete='off'
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.left__bottom}>
                      <label className={styles.label} htmlFor='one'>
                        $1
                      </label>
                    </td>
                    <td className={styles.right__bottom}>
                      <input
                        className={styles.input}
                        type='number'
                        id='one'
                        onChange={(e) => setOne(e.target.value)}
                        autoComplete='off'
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <div className={styles.button__container}>
            <button
              className={styles.submit__button}
              onClick={startCalculateHandler}
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
