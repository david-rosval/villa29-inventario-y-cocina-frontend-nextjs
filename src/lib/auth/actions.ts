/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const client = axios.create({
  baseURL: process.env.SERVER_URL,
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
  redirect('/auth/login')
}

export async function getUser() {
  try {
    const response: AxiosResponse = await client.get('/auth/profile', {
      headers: { 'authorization': cookies().get('token')?.value } 
    })
    return response.data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.log({ error: 'Error obteniendo perfil del usuario' })
  }
}