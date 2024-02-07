// Adrian Vargas - 101258006
import mongoose from 'mongoose';

const DMSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    created: { 
        type: Date,
        default: Date.now
    },
    receiver: {
        type: String,
        required: true,
        trim: true
    },
    updatedAt: { 
        type: Date,
        default: Date.now
    }
});

DMSchema.query.sortByCreatedDate = function(flag) {
  let sortOrder = 0
  if (flag === "ASC") sortOrder = 1
  if (flag === "DESC") sortOrder = -1
  return this.sort({'created': sortOrder})
}

DMSchema.pre('save', (next) => {
    let now = Date.now()

    this.updatedAt = now

    if (!this.created) {
        this.created = now
    }
    next()
});

DMSchema.pre('findUserAndUpdate', (next) => {
    this.updatedAt = now
    next()
});

const DM = mongoose.model("DM", DMSchema);
module.exports = DM;