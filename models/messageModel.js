// Adrian Vargas - 101258006
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        trim: true
    },message: {
        type: String,
        required: true,
        trim: true
    },

    created: { 
        type: Date,
        default: Date.now
    },
    room: {
        type: String,
        required: true,
        trim: true
    },
    
    updatedAt: { 
        type: Date,
        default: Date.now
    },
});

MessageSchema.query.sortByCreatedDate = function(flag) {
  let sortOrder = 0
  if (flag === "ASC") sortOrder = 1
  if (flag === "DESC") sortOrder = -1
  return this.sort({'created': sortOrder})
}

MessageSchema.pre('save', (next) => {
    let now = Date.now()

    this.updatedAt = now

    if (!this.created) {
        this.created = now
    }
    next()
});

MessageSchema.pre('findUserAndUpdate', (next) => {
    this.updatedAt = now
    next()
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;