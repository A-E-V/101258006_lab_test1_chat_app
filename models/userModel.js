// Adrian Vargas - 101258006
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
   username: {
    type: String,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    trim:true
  },
  created: { 
    type: Date,
    default: Date.now
  },
  updatedAt: { 
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.validatePassword = function(pwd) {
  return (pwd === this.password)? true : false;
}

UserSchema.methods.getFullName = function () {
  return `${this.firstName} ${this.lastName}`
}

UserSchema.pre('save', (next) => {
    let now = Date.now()

    this.updatedAt = now

    if (!this.created) {
        this.created = now
    }
    next()
});

UserSchema.pre('findUserAndUpdate', (next) => {
    this.updatedAt = now
    next()
});

const User = mongoose.model("User", UserSchema);
module.exports = User;