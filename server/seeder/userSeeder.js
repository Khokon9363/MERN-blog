// External dependencies
const bcrypt = require('bcrypt')

// Internal dependencies
const People = require('../app/models/People')

async function admin(req, res, next) {
    console.log("Admin seeding !!")
    try {
        await People.deleteMany({
            role: 'Admin'
        })
        const admin = new People({
            name: 'Super admin',
            email: 'admin@admin.com',
            phone: '01310000000',
            password: await bcrypt.hash('12345678', 10),
            role: 'Admin'
        })
        await admin.save()
        console.log("Admin seeded successfully !!")
    } catch (err) {
        console.log(err.message)
    }
}

async function user(req, res, next) {
    console.log("User seeding !!")
    try {
        await People.deleteMany({
            role: 'User'
        })
        let shouldInsert = 10
        let inserted = 0
        while (inserted < shouldInsert ) {
            const user = new People({
                name: `User ${inserted}`,
                email: `${inserted}@user.com`,
                phone: `0191000000${inserted}`,
                password: await bcrypt.hash('12345678', 10),
                role: 'User'
            })
            await user.save()
            console.log(`Inserted user no : ${inserted}`)
            inserted++
        }
        console.log("User seeded successfully !!")
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    admin,
    user
}