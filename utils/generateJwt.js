import jwt from 'jsonwebtoken'

const generateJwt = (res, userId) => {
    const token = jwt.sign(
        {
            userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )

    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 1000
    })
}

export default generateJwt;