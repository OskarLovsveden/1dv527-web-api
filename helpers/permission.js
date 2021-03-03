import createError from 'http-errors'

export const PermissionLevels = Object.freeze({
    CREATE: ['admin'],
    READ: ['admin', 'user'],
    UPDATE: ['admin'],
    DELETE: ['admin'],
    ADMIN: ['admin']
})

export const hasPermission = (req, res, next, permissionLevel) => {
    if (permissionLevel.includes(req.user?.type)) {
        next()
    }
    else {
        next(createError(403))
    }
}
