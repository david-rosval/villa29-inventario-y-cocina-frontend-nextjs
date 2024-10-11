"use server"

import axios, { AxiosResponse } from 'axios';



export async function getMenu() {
  try {
    const response: AxiosResponse = await axios.get('/api/menu')
    console.log(response)
    return response.data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.log(error.response)
  }
}