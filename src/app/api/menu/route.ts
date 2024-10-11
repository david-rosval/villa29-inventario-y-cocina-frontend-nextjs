import connectDb from "@/lib/db/mongodb";
import {MenuItem} from "@/models/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb()
    const menuQuery = MenuItem.find() 
    const menu = await menuQuery.exec()
    console.log(menu);
    return NextResponse.json(menu)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log('error obteniendo el menu', error)
  }
}