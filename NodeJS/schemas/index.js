import mongoose from 'mongoose';

export const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://13.125.207.95:9004/clone_jb', {}, error => {
        if (error) {
            console.log('DB Connection is Error', error);
        } else {
            console.log('DB Connection is Successful!');
        }
    });
};

mongoose.connection.on('error', error => {
    console.error('DB Error', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('DB is Disconnected! Retry to Connect DB!');
});
