// Internal dependencies
const singleFileUploader = require("../singleFileUploader")

function sliderImageUpload(req, res, next) {
    const upload = singleFileUploader('sliders', ["image/jpg", "image/jpeg", "image/png"], 1000000, '"Only jpg, png & jpeg format allowed !"')

    // call the default function of a multer upload object any()
    upload.any()(req, res, (err) => {
        if(err){
            res.status(500).json({
                errors: {
                    image: {
                        message: err.message
                    }
                }
            })
        }else{
            next()
        }
    })
}

module.exports = sliderImageUpload