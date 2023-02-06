import axios from 'axios'

const posURL = 'https://pacific-woodland-57366.herokuapp.com/api/pos'

// login
export const posLoginApi = async (payload) => {
  const { account, password } = payload
  try {
    const res = await axios.post(`${posURL}/login`, {
      account,
      password,
    })
    return res
  } catch (error) {
    console.error('[POS Login Failed]: ', error)
    return error
  }
}
