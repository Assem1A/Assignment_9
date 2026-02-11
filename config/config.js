import { resolve } from 'node:path'
import { config } from 'dotenv'

export const NODE_ENV = process.env.NODE_ENV




config({ path: resolve(`./config/.env`) })


export const port = process.env.PORT ?? 7000
export const DB_URI = process.env.DB_URI
export const SALT_ROUND=process.env.SALT_ROUND
export const JWT_EXPIRES=process.env.JWT_EXPIRES
export const JWT_SECRET=process.env.JWT_SECRET
