const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema(
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
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category"
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

const Blog = mongoose.model("Blog", BlogSchema)

module.exports = Blog