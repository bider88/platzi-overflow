import Debug from 'debug'

const debug = new Debug('platzi-overflow:utils')

export const handleError = (error, res) => {
    debug(error)
    res.status(500).json({
        message: 'An error ocurred',
        error
    })
}