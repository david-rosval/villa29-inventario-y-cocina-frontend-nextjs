import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    await (await mongoose.connect(process.env.MONGODB_URI ?? ''))
    console.log('MongoDB connected')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error)
  }
}

export default connectDb