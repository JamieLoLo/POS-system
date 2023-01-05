import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
} from './POSPage/index'
// SCSS
import './reset.module.scss'
import './base.module.scss'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/setting/classification'
            element={<ClassificationSettingPage />}
          />
          <Route path='/setting/dish' element={<DishSettingPage />} />
          <Route path='/setting/table' element={<TableSettingPage />} />
          <Route path='/setting/minimum' element={<MinimumSettingPage />} />
          <Route path='/' element={<AdminLoginPage />} />
          <Route path='/forms/revenue' element={<MonthlyRevenuePage />} />
          <Route path='/forms/rank' element={<RankPage />} />
          <Route path='/order/table' element={<OrderTablePage />} />
          <Route path='/order/system' element={<OrderSystemPage />} />
          <Route path='/order/customer' element={<OrderCustomerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
