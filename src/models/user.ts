import mongoose from 'mongoose';
import { usernameRegex, hashRegex } from '../utils/regex';
import { getRegex } from '../utils/misc';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        validate: getRegex(usernameRegex),
    },

    password: {
        type: String,
        required: true,
        validation: getRegex(hashRegex),
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
