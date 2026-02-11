import { JWT_SECRET } from "../../config/config.js";
import jwt from 'jsonwebtoken'
import { userModel } from "../DB/models/userModel.js";
export const auth = async (req, res, next) => {
    const authorization = req.headers.authorization
    var decoded

    decoded = jwt.verify(authorization, JWT_SECRET);
    const email = decoded.email
    const user = await userModel.findById(decoded.id)
    if (!user) throw new Error("user not found", { cause: { status: 404 } })
        req.user=user
        next()

}
