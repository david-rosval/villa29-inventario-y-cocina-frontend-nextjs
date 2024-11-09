/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import axios, { AxiosResponse } from 'axios';
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
    //console.log(response.data)
    cookies().set('token', response.data.token)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.log(error)
  } finally{
    redirect('/ordenes')
  }
}

export async function logout() {
  cookies().delete('token')
  redirect('/')
}

export async function getUser(): Promise<User | undefined>  {
  try {
    const response: AxiosResponse = await client.get('/auth/profile', {
      headers: { 'authorization': cookies().get('token')?.value } 
    })
    const user: User = response.data
    return user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.log({ error: 'Error obteniendo perfil del usuario' })
  }
}