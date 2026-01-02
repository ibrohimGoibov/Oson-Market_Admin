import axios from 'axios'
import { create } from 'zustand'
import { message } from 'antd'

interface LoginData {
  userName: string
  password: string
}

interface RegisterData {
  userName: string
  password: string
  confirmPassword: string
}

interface User {
  id: string
  name: string
  email: string
  [key: string]: any
}

interface RegisterStore {
  loading: boolean
  error: string | null
  postRegister: (data: RegisterData) => Promise<void>
  postAccountLogin: (data: LoginData) => Promise<User | null>
}

const URL = import.meta.env.VITE_API_URL;

export const useRegisterStore = create<RegisterStore>((set) => ({
  loading: false,
  error: null,

  postRegister: async (data) => {
    try {
      set({ loading: true, error: null })
      await axios.post(`${URL}/Account/register`, data)
      message.success('Registered successfully')
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Register error'
      set({ error: errorMessage })
      message.error(errorMessage)
    } finally {
      set({ loading: false })
    }
  },

  postAccountLogin: async (data) => {
    try {
      set({ loading: true, error: null })
      const res = await axios.post(`${URL}/Account/login`, data)
      const token = res.data?.data

   
      const payload = JSON.parse(atob(token.split('.')[1]))
      const user: User = {
        id: payload.sid,
        name: payload.name,
        email: payload.email,
      }
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      message.success('Login successful')
      window.location.href = "/home"
      return user
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Login error'
      set({ error: errorMessage })
      message.error(errorMessage)
      return null
    } finally {
      set({ loading: false })
    }
  },
}))
