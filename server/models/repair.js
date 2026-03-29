import mongoose from 'mongoose';

const repairSchema = new mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    device: {
        type: String,
        enum:['Laptop','Desktop','Parts'],
        required: true
    },
    deviceBrand: {
        type: String,
        required: true
    },
    deviceModel: {
        type: String,
        required: true
    },
    issue:{
        type: String,
        required: true
    },
    images: [{
        type: String,
    }],
    price:{
        type:Number,
        default: 0
    },
    repairStatus: {
        type: String,
        enum: ['pending', 'accepted','in-progress', 'completed','delivered'],
        default: 'pending'
    },
   
},{
    timestamps: true
});

export default mongoose.models.Repair || mongoose.model("Repair", repairSchema);

    