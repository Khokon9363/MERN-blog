// Internal dependencies
const Slider = require('./../../../models/Slider')

async function index(req, res, next){
    try {
        const { page, limit, search = '' } = req.params
        
        if(!page) page = 1
        if(!limit) limit = 3

        const skip = (Number(page) - 1) * Number(limit)
        const take = Number(limit)

        const data = await Slider.find({
            name: {
                $regex: new RegExp(search)
            }
        }).skip(skip).limit(take).sort({updatedAt: -1})
        res.status(200).json({
            data,
            page,
            limit,
            message: 'Sliders fetched successfully !'
        })
    } catch (err) {
        res.status(500).json({
            errors: {
                common: err.message
            }
        })
    }
}

async function store(req, res, next) {
    try {
        const slider = await Slider.create({...req.body, image: req.files[0].path})
        res.status(200).json({
            data: slider,
            message: 'Slider saved successfully !'
        })
    } catch (err) {
        res.status(500).json({
            errors: {
                common: err.message
            }
        })
    }
}

async function updateStatus(req, res, next) {
    try {
        const { id } = req.body
        const data = await Slider.findOne({_id: id})
        await Slider.updateOne({_id: id}, {status: !data.status})
        res.status(200).json({
            data,
            message: "Slider updated successfully !"
        })
    } catch (err) {
        res.status(500).json({
            errors: {
                common: err.message
            }
        })
    }
}

async function update(req, res, next) {
    try {
        const { _id, status, name, title, description } = req.body
        
        const newData = { name, status, title, description }
        
        if(req.files && req.files.length > 0){
            /* 
                Here we can remove the previous image via Model.find() method using _id
                Then update with new image via update() method using _id
            */
            newData.image = req.files[0].path
        }

        const data = await Slider.findOneAndUpdate({ _id }, newData, {new: true})

        res.status(200).json({
            data,
            message: "Slider updated successfully !"
        })
    } catch (err) {
        res.status(500).json({
            errors: {
                common: err.message
            }
        })
    }
}

async function destroy(req, res, next) {
    try {
        const { id } = req.params
        const data = await Slider.deleteOne({_id: id})
        res.status(200).json({
            data,
            message: "Slider deleted successfully !"
        })
    } catch (err) {
        res.status(500).json({
            errors: {
                common: err.message
            }
        })
    }
}

async function find(req, res, next){
    try {
        const data = await Slider.findOne({ _id: req.params.id })
        res.status(200).json({
            data,
            message: "Slider find successfully !"
        })
    } catch (err) {
        res.status(500).json({
            errors: {
                common: err.message
            }
        })
    }
}

module.exports = {
    index,
    store,
    updateStatus,
    update,
    destroy,
    find
}