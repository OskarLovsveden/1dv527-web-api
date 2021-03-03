// Inspired by - https://gitlab.lnu.se/1dv026/content/examples/example-restful-tasks-with-jwt/-/tree/master/

import createError from 'http-errors'

export const hasPermission = (req, res, next, allowUser) => {
    if (allowUser || req.user?.type === 'admin') {
        next()
    }
    else {
        next(createError(403))
    }
}
