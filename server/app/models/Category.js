const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema(
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
        blogs: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Blog"
            }
        ],
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model("Category", CategorySchema)

module.exports = Category