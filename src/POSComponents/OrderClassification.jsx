import clsx from 'clsx'
import React, { useState } from 'react'

// SCSS
import styles from './OrderClassification.module.scss'
// 現在的變色問題出在於沒有重新渲染，所以狀態沒有更新，可以之後打API的時候用useEffect
const OrderClassification = ({ classification }) => {
  const [target, setTarget] = useState('')
  const targetHandler = (e) => {
    setTarget(e.target.innerText)
  }

  return (
    <div
      className={clsx('', {
        [styles.active]: classification === target,
        [styles.item]: classification !== target,
      })}
      onClick={(e) => {
        targetHandler(e)
        console.log(classification)
      }}
    >
      {classification}
    </div>
  )
}

export default OrderClassification
