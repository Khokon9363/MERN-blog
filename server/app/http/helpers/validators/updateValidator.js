// External dependencies
const { check, validationResult } = require("express-validator")
const { unlink } = require('fs')

const updateValidator = [
    check('name').isLength({min: 1})
                 .withMessage('Name field is required .')
                 .isLength({max: 100})
                 .withMessage('Name field can not container higher than 100 letter')
                 .isAlpha("en-US", {ignore: " -"})
                 .withMessage("Name must not contain anything other than alphabet")
                 .trim(),
    check("email").isLength({min: 1})
                  .withMessage('Email field is required .')
                  .isLength({min: 10})
                  .withMessage('Email field can not contain lower than 10 character.')
                  .isLength({max: 100})
                  .withMessage('Email field can not contain higher than 100 character')
                  .isEmail()
                  .withMessage("Email should be a valid email")
                  .toLowerCase()
                  .trim(),
    check("phone").isLength({min: 1})
                  .withMessage('Phone field is required .')
                  .isLength({min: 11})
                  .withMessage('Phone field can not contain lower than 11 character.')
                  .isLength({max: 14})
                  .withMessage('Phone field can not contain higher than 14 character.')
            /* Uncomment those 4 lines if you need a bangladeshi real phone number validation
                  .isMobilePhone("bn-BD", {
                          strictMode: true,
                      })
                  .withMessage("Mobile number must be a valid Bangladeshi mobile number")
            */
                  .trim()
]

function updateValidatorChecker(req, res, next) {
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()

    if(Object.keys(mappedErrors).length === 0){
        // remove uploaded files
        if (req.files.length > 0) {
            const filename = req.user.avatar
            unlink(`./${filename}`, (err) => {
                    if (err) console.log(err)
                }
            )
        }
        next()
    }else{
        // remove uploaded files
        if (req.files.length > 0) {
            const { filename } = req.files[0]
            unlink(`./public/storage/avatars/${filename}`, (err) => {
                    if (err) console.log(err)
                }
            )
        }
        // return the mapped errors as response
        res.status(500).json({
            data: req.body,
            errors: mappedErrors
        })
    }
}

module.exports = {
    updateValidator,
    updateValidatorChecker
}