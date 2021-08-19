const mongoose = require('mongoose')

const SliderSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 100
        },
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
            min: 10,
            max: 199
        },
        description: {
            type: String,
            required: true,
            trim: true,
            min: 50
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const Slider = mongoose.model("Slider", SliderSchema)

module.exports = Slider