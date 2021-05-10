const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersBL = require('../BL/usersBL');
const bcrypt = require('bcryptjs');

const verifyJWT = (req, res, next) => {

    const token = req.headers.authorization;
    console.log(token);
    if (token.length > 50) {

        jwt.verify(token, "secret", function (err, decoded) {
            console.log(decoded);
            if (err) {

                res.json({ auth: false, message: "falied to autonticate" })

            } else {
                req.userId = decoded.id
                next()
            }
        })
    }
    else {
        res.send("no token provided")


    }

}



router.route('/login')
    .post(async function (req, res) {
        try {
            let { email, password } = req.body;

            const user = await usersBL.getuserbyemail(email)

            if (user) {
                bcrypt.compare(password, user.Password)
                    .then(isMatch => {

                        if (isMatch) {
                            jwt.sign({ id: user._id }, "secret", { expiresIn: 3600 }, (err, token) => {
                                console.log(token);

                                res.json({
                                    success: true,
                                    token: token,
                                    user
                                })
                            });
                        } else {
                            return res.status(400);
                        }
                    })
            }
            else {
                return res.status(203).send("Incorrect");
            }

        } catch (error) {
            console.log(error);
        }


    })
router.route('/signup')
    .post(async function (req, res) {
        let obj = req.body;
        const user = await usersBL.getuserbyemail(obj.email)

        try {
            if (!user) {

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(obj.password, salt, async (err, hash) => {
                        if (err) throw err;
                        obj.password = hash;
                        let status = await usersBL.addUser(obj)
                        return res.json(status);
                    });
                });

            }
            else {
                res.status(203).send("user exist");
            }

        } catch (error) {
            console.log(error);
        }


    })

router.route('/update')
    .put(verifyJWT, async function (req, res) {
        try {
            console.log(req.userId);
            const { user } = req.body

            const id = user.id
            const order = {
                Email: user.Email,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Address: {
                    City: user.City,
                    Country: user.Country,
                    PostalCode: user.PostalCode
                }
            }
            let status = await usersBL.updateUser(id, order)
            return res.json(status);
        }
        catch (error) {
            console.log(error);
        }
    })






module.exports = router;