import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect("mongodb+srv://ypakistan19:8tFG9ECOStEG7LB3@cluster0.g3nryay.mongodb.net/users?retryWrites=true&w=majority");
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}