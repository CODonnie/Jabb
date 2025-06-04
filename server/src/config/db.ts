import mongoose from 'mongoose';

const DBConnect = async () => {
    try {
        const mongoUri = process.env.NODE_ENV === "test" 
        ? process.env.MONGO_TEST_URI as string 
        : process.env.MONGO_URI as string
        
        const conn = await mongoose.connect(mongoUri);
        console.log(`database connected - ${conn.connection.host}`);
    } catch (error) {
        console.error(`database connection error - ${error}`);
    }
}

export default DBConnect;