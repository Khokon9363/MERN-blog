// External dependencies
const { check, validationResult } = require("express-validator")

const loginValidator = [
    check('phoneOrEmail').isLength({min: 1})
                         .withMessage('Email or phone field is required .')
                         .isLength({max: 100})
                         .withMessage('Email or phone field can not container higher than 100 letter')
                         .trim(),
    check("password").isLength({min: 1})
                     .withMessage('Password field is required .')
                     .isLength({min: 8})
                     .withMessage('Password field can not contain lower than 8 character.')
                     .isLength({max: 32})
                     .withMessage('Password field can not contain higher than 32 character.')
                     .trim()
]

function loginValidatorChecker(req, res, next) {
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()
    
    if(Object.keys(mappedErrors).length === 0){
        next()
    }else{
        
        // return the mapped errors as response
        // delete password and passwordConfirmation from req.body
        data = req.body
            delete data.password

        res.status(500).json({
            data,
            errors: mappedErrors
        })
    }
}

module.exports = {
    loginValidator,
    loginValidatorChecker
}