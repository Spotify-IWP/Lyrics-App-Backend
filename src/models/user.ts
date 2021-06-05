import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    searchHistory: [{
        artist: {
            type: String,
            required: true,
        },
        song: {
            type: String,
            required: true,
        },
    }],
});

const User = mongoose.model('User', userSchema);

export default User;
