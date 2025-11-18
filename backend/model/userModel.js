const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator= require('validator')




const userSchema = new mongoose.Schema({
  
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    
});

//static signup method

userSchema.statics.signup = async function (username, password) {

// Validation
if (!username || !password) {
  throw new Error('All fields must be filled');
}

if (!validator.isStrongPassword(password)) {
  throw new Error('Use atleast a capital letter, symbol and number lenght must be atleat 8 character');
}
 

const usernameExists = await this.findOne({ username });
    if (usernameExists) {
        throw Error('Username already taken');
    }
    
    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({username,password: hash })

    return user
}
//static login method
userSchema.statics.login = async function(username, password){
  if (!username || !password) {
    throw new Error('All fields must be filled');
  }



  const user = await this.findOne({ username });
    if (!user) {
        throw Error('Incorrect username');
    }

    const match= await bcrypt.compare(password, user.password)

    if(!match){
      throw Error('Incorrect Password')
    }
    return user
}

module.exports = mongoose.model('User', userSchema);
