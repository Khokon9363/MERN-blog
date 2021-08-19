// External dependencies
const { check, validationResult } = require("express-validator")
const createHttpError = require("http-errors")

const passwordValidator = [
    check('oldPassword').isLength({min: 1})
                        .withMessage('Old password is required .')
                        .isLength({min: 8})
                        .withMessage('Old password can not contain lower than 8 character')
                        .isLength({max: 32})
                        .withMessage('Old password can not contain higher than 32 character')
                        .trim(),
    check('newPassword').isLength({min: 1})
                        .withMessage('New password is required .')
                        .isLength({min: 8})
                        .withMessage('New password can not contain lower than 8 character')
                        .isLength({max: 32})
                        .withMessage('New password can not contain higher than 32 character')
                        .trim()
                        .custom(async (value, {req}) => {
                            try {
                                if(!req.body.confirmPassword){

                                }
                                if(req.body.confirmPassword.trim() !== value){
                                    throw createHttpError("New password & confirm password does not match !")
                                }
                            } catch (err) {
                                throw createHttpError(err.message)
                            }
                        }),
    check('confirmPassword').isLength({min: 1})
                            .withMessage('Confirm password is required .')
                            .trim(),
]

function passwordValidatorChecker(req, res, next) {
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()

    if(Object.keys(mappedErrors).length === 0){
        next()
    }else{
        // return the mapped errors as response
        res.status(500).json({
            data: req.body,
            errors: mappedErrors
        })
    }
}

module.exports = {
    passwordValidator,
    passwordValidatorChecker
}