const UserModel = require('../models/usersModel');

const getAllUsers = function () {
    return new Promise((resolve, reject) => {
        UserModel.find({}, function (err, users) {
            if (err) {
                reject(err);
            }
            else {
                resolve(users);
            }
        })
    })
}

const getuserbyid = function (id) {
    return new Promise((resolve, reject) => {
        UserModel.findById(id, function (err, user) {
            console.log(user);
            if (err) {
                reject(err);
            }
            else {
                resolve(user);
            }
        })
    })
}
const getuserbyemail = function (email) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ Email: email }, function (err, user) {
            if (err) {
                reject(err);
            }
            else {
                resolve(user);
            }
        })
    })
}
const addUser = function (user) {
    return new Promise((resolve, reject) => {
        const User = new UserModel({
            Email: user.email,
            Password: user.password,
            FirstName: user.firstname,
            LastName: user.lastname,
            Address: {
                City: user.address.city,
                Country: user.address.country,
                PostalCode: user.address.postalcode
            }



        });

        User.save(function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Created');
            }
        })
    })
}

const updateUser = function (id, user) {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndUpdate(id, user, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Updated');
            }
        })
    })
}

const deleteUser = function (id) {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Deleted');
            }
        })
    })
}

module.exports = { getAllUsers, getuserbyid, getuserbyemail, addUser, updateUser, deleteUser }