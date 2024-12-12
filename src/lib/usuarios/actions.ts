/* eslint-disable @typescript-eslint/no-unused-vars */

"use server"

import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { User } from '../types/user';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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


export async function getAllUsers(): Promise<Array<User> | undefined> {
  try {
    const response: AxiosResponse = await client.get('/usuarios', {
      headers: { 'authorization': cookies().get('token')?.value } 
    })
    console.log("Todos los usuarios obtenidos")
    const users: Array<User> = response.data
    return users
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log({ error: error })
  }
}

export async function getUserById({ id }: { id: string }) {
  try {
    const response: AxiosResponse = await client.get(`/usuarios/${id}`, {
      headers: { 'authorization': cookies().get('token')?.value } 
    })
    const user: User = response.data
    return user
  } catch (error) {
    console.log({ error: 'Error obteniendo usuario' })
  }
}

export async function registerUser({ 
  newUser 
}: { newUser: Omit<User, 'id_usuario'> & { password: string } }) {
  try {
    const response: AxiosResponse = await client.post(`/usuarios`, newUser, {
      headers: { 'authorization': cookies().get('token')?.value } 
    })
    const user: User = response.data
    return user
  } catch (error) {
    console.log({ error: 'Error registrando un nuevo usuario' })
  }
}

export async function updateUser({ id, updatedUser }: { id: string, updatedUser: Omit<User, 'id_usuario'> }) {
  try {
    const response: AxiosResponse = await client.put(`/usuarios/${id}`, updatedUser, {
      headers: { 'authorization': cookies().get('token')?.value } 
    })
    const user: User = response.data
    return user
  } catch (error) {
    console.log({ error: 'Error actualizando usuario' })
  }
}

export async function updateUserPassword({ id, password, newPassword }: { id: string, password: string, newPassword: string }) {
  try {
    const response: AxiosResponse = await client.put(`/usuarios/new-password/${id}`, { password, newPassword }, {
      headers: { 'authorization': cookies().get('token')?.value } 
    })
    const user: User = response.data
    return user
  } catch (error) {
    console.log({ error: 'Error actualizando contraseña de usuario' })
  }
}

export async function deleteUser({ ids }: { ids: Array<string> }) {
  try {
    const response: AxiosResponse = await client.post(`/usuarios/delete`, { ids: ids }, {
      headers: { 'authorization': cookies().get('token')?.value } 
    })
    const { message } = response.data
    if (message) {
      return true
    } else return false 
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error: error.message });
    } else {
      console.log({ error: String(error) });
    }
    return false
  }
}

export async function revalidateAndRedirect() {
  revalidatePath("/panel-de-control/usuarios")
  redirect("/panel-de-control/usuarios")
}