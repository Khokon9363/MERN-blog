// External dependencies
const { check, validationResult } = require("express-validator")
const createHttpError = require("http-errors")
const { unlink } = require('fs')

const sliderValidator = [
    check('name').isLength({min: 1})
                 .withMessage('Name is required .')
                 .isLength({max: 100})
                 .withMessage('Name can not contain higher than 100 character')
                 .trim(),
    check('title').isLength({min: 1})
                  .withMessage('Title is required .')
                  .isLength({max: 100})
                  .withMessage('Title can not contain higher than 100 character')
                  .trim(),
    check('description').isLength({min: 1})
                        .withMessage('Description is required .')
                        .isLength({max: 200})
                        .withMessage('Description can not contain higher than 200 character')
                        .trim(),
    check('status').isBoolean()
                   .withMessage('Status should be boolean'),
    check('image').custom(async (value, {req}) => {
                        try {
                            if(!req.body._id && req.files.length <= 0){
                                throw createHttpError("Image field is required !")
                            }
                        } catch (err) {
                            throw createHttpError(err.message)
                        }
                    }),
]

function sliderValidatorChecker(req, res, next) {
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()
    if(Object.keys(mappedErrors).length === 0){
        next()
    }else{
        // remove uploaded files
        if (req.files && req.files.length > 0) {
            const { filename } = req.files[0]
            unlink(`./public/storage/sliders/${filename}`, (err) => {
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
    sliderValidator,
    sliderValidatorChecker
}