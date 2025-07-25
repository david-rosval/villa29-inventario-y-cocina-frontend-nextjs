/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { User } from '../types/user';

const {
  MODE,
  SERVER_URL_PROD,
  SERVER_URL_DEV,
} = process.env;

const baseUrl = (MODE && MODE === 'dev') ? SERVER_URL_DEV : SERVER_URL_PROD;

const client = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

export async function authenticate(values: { email: string, password: string }) {
  try {
    const response: AxiosResponse = await client.post('/auth/login', values)
    const obtainedCookies = await cookies()
    obtainedCookies.set('token', response.data.token)
    return { success: true, message: 'Inicio de sesión exitoso' }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.log("Error de axios",error.response?.data)
      return { success: false, message: error.response?.data?.error || 'Error al iniciar sesión' }
    } else {
      console.error('Error inesperado:', error)
      return { success: false, message: 'Error inesperado al iniciar sesión' }
    }
  }
}

export async function logout() {
  (await cookies()).delete('token')
  redirect('/')
}

export async function getUser(): Promise<User | undefined>  {
  const token = (await cookies()).get('token')?.value;
  try {
    const response: AxiosResponse = await client.get('/auth/profile', {
      headers: { 'authorization': token } 
    })
    const user: User = response.data
    return user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.log('Error obteniendo perfil del usuario', error)
  }
}