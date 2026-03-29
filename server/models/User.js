import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email']
    },
   role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    phone:{
        type: String,
        default:"",
        trim: true,
        match: [/^[6-9]\d{9}$/, 'Please use a valid Indian phone number']
    },
    address: {
        type: String,
        default:""
    },
    
},{
    timestamps: true
});

export default mongoose.model('User', userSchema);