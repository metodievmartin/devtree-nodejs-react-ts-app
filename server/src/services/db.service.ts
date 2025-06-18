import mongoose from 'mongoose';
import colors from 'colors';

export async function connectDB(dbUrl: string) {
  try {
    const { connection } = await mongoose.connect(dbUrl);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.cyan.bold(`MongoDB successfully connected to ${url}`));
  } catch (error) {
    console.log(colors.bgRed.white.bold(error.message));
    process.exit(1);
  }
}
