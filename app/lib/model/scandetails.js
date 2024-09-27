import mongoose from 'mongoose';

const scanDetailSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true  },
    title: { type: String  },
    desc: { type: String },
    model: { type: String  },
    prices: { type: Number, default: null },
    images: { type: [String]  },
    identifier: { type: Number },
    quantity : { type: Number },
});

const ScanDetail = mongoose.models.ScanDetail || mongoose.model('ScanDetail', scanDetailSchema);

export default ScanDetail;
