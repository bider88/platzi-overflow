import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { key } from '../config'
import { User }  from '../models'
import { 
    hashSync as hash,
    compareSync as comparePassword
 } from 'bcryptjs'

const app = express.Router()
const debug = Debug('platzi-overflow:auth')

app.post('/signin', async (req, res, next) => {
    const { email, password } = req.fields
    const user = await User.findOne({ email })

    if (!user) {
        debug(`User with email ${email} not found`)
        return handleLoginFailed(res, 'El correo y la contraseña no coinciden')
    }

    if (!comparePassword(password, user.password)) {
        debug(`Password do not match: ${password} !== ${user.password}`)
        return handleLoginFailed(res)
    }

    const token = createToken(user)

    res.status(200).json({
        message: 'Login succeded',
        token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })

})

app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.fields
    const u = new User ({
        firstName,
        lastName,
        email,
        password: hash(password, 10)
    })
    debug(`Creating new user: ${u}`)
    const user = await u.save()
    const token = createToken(user)
    res.status(201).json({
        message: 'User saved',
        token,
        firstName,
        lastName,
        email
    })
})

const createToken = (user) => jwt.sign({ user }, key, { expiresIn: 86400 })

function handleLoginFailed(res, message) {
    return res.status(401).json({
        message: 'Login failed',
        error: message || 'Email and password don\'t match'
    })
}

export default app