import mongoose from "mongoose";
// import brcypt from 'bcryptjs'

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

// UserSchema.pre('save', async function(next) {
//     if(!this.isModidifed('password')) {
//         next()
//     }

//     const salt = await brcypt.genSalt(10)
//     this.password = await brcypt.hash(this.password, salt)
// })

// UserSchema.methods.matchPassword = async function(enteredPassword) {
//     return await brcypt.compare(enteredPassword, this.password)
// }

const UserModel = mongoose.model('User', UserSchema)

export default UserModel;