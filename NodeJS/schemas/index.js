const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://3.37.221.165:9004/clone_jb', error => {
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

module.exports = connect;
