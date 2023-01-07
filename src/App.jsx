import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'
// UI
import {
  ClassificationSettingPage,
  DishSettingPage,
  TableSettingPage,
  MinimumSettingPage,
  AdminLoginPage,
  MonthlyRevenuePage,
  RankPage,
  OrderTablePage,
  OrderSystemPage,
  OrderCustomerPage,
  HomePage,
} from './POSPage/index'
import { OrderPage, CartPage } from './CustomerPage'
// SCSS
import './reset.module.scss'
import './base.module.scss'

const basename = process.env.PUBLIC_URL

function App() {
  return (
    <div className='App' basename={basename}>
      Hello world !!!
      <HashRouter>
        <Routes>
          <Route
            path='/setting/classification'
            element={<ClassificationSettingPage />}
          />
          <Route path='/setting/dish' element={<DishSettingPage />} />
          <Route path='/setting/table' element={<TableSettingPage />} />
          <Route path='/setting/minimum' element={<MinimumSettingPage />} />
          <Route path='/admin/login' element={<AdminLoginPage />} />
          <Route path='/forms/revenue' element={<MonthlyRevenuePage />} />
          <Route path='/forms/rank' element={<RankPage />} />
          <Route path='/order/table' element={<OrderTablePage />} />
          <Route path='/order/system' element={<OrderSystemPage />} />
          <Route path='/order/customer' element={<OrderCustomerPage />} />
          <Route path='/customer/main' element={<OrderPage />} />
          <Route path='/customer/cart' element={<CartPage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App