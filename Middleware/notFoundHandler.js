import createError from 'http-errors'

const notFoundHandler = (req, res, next) => {
    const err = createError(404, 'Not Found')
    next(err)
}
export default notFoundHandler