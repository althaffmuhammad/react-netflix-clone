import mongoose from 'mongoose';

const userShema = new mongoose.Schema ({
  email: {
    type: String,
    require: true,
    unique: true,
    max: 50,
  },
  likedMovies: Array,
});

const User = mongoose.model ('users', userShema);
export default User;
