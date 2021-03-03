import createError from 'http-errors'

export const hasPermission = (req, res, next, allowUser) => {
    if (allowUser || req.user?.type === 'admin') {
        next()
    }
    else {
        next(createError(403))
    }
}
