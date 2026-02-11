import { userModel } from "../../DB/models/userModel.js"
import { hash, compare } from "bcrypt";
import CryptoJS from "crypto-js";
import { JWT_EXPIRES, JWT_SECRET, SALT_ROUND } from "../../../config/config.js";
import jwt from "jsonwebtoken";

export const signup = async (body) => {
    const { name, email, password, phone, age } = body

    const exist = await (userModel.findOne({ email }))
    if (exist) throw new Error("dublicated", { cause: { status: 409 } })
    console.log(SALT_ROUND);

    const hashed = await hash(password, +(SALT_ROUND))
    const cipherText = CryptoJS.AES.encrypt(phone, "1").toString()
    const user = await userModel.create({ name, email, password: hashed, phone: cipherText, age })
  

    return { user }
}
export const login = async (email, password) => {

    const user = await userModel.findOne({ email })
    if (!user) throw new Error("enta meeen ya 3m", { cause: { status: 404 } });
    const wrongPassword=!await compare(password,user.password)
    if(wrongPassword)throw new Error("enta meeen ya 3m", { cause: { status: 404 } });

    const token = jwt.sign(
        { id: user._id, email },
       JWT_SECRET,
        { expiresIn: JWT_EXPIRES }
    );

    return token
}
