import React from 'react'
import clsx from 'clsx'
// SCSS
import styles from './OrderTableItem.module.scss'

const OrderTableItem = ({ data }) => {
  return (
    <div
      className={clsx('', {
        [styles.table]: data.name !== '0',
        [styles.table__d__none]: data.name === '0',
      })}
    >
      {data.name}
    </div>
  )
}

export default OrderTableItem
