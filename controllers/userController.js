
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
// const dotenv = require('dotenv')
const Product =require("../models/product")
require("dotenv").config();
exports.registration = async (req, res) => {
    try {

        const { name, email, password, role } = req.body
        let errors = []
        if (!name) {
            errors.push({ name: "name is required!" })
        }

        if (!email) {
            errors.push({ email: "Email is required!" })
        }

        if (!role) {
            errors.push({ role: "role is required!" })
        }
        if (!password) {
            errors.push({ password: "Password is required!" })
        }

        if (errors.length > 0) {
            return res.status(422).json({ errors: errors, status: 422 })
        }
        const convertpass = await bcrypt.hash(password, 10)
        const creatUser = await User.create({ name: name, email: email, password: convertpass, role: role })
        if (creatUser) {

            // const getUserdatas = await User.findOne({ email: email })
            // if (getUserdatas !== null) {
            //     let dbpassword = getUserdatas.password
            //     if (await bcrypt.compare(password, dbpassword)) {
            //         jwt.sign({ _id: getUserdatas._id }, process.env.SECRET_KEY, async (err, token) => {
                        return res.status(200).json({ message: "user created successfully", status: 200 })
            //         })
            //     }
            // }


        }
    } catch (error) {
        return res.status(500).json({ message: 'internel server error', error })
    }
}

exports.login = async (req, res) => {
    // try {

        const { email, password } = req.body
        let errors = []

        if (!email) {
            errors.push({ email: "Email is required!" })
        }

        if (!password) {
            errors.push({ password: "Password is required!" })
        }

        if (errors.length > 0) {
            return res.status(422).json({ errors: errors, status: 422 })
        }
                   const getUserdatas = await User.findOne({ email: email })
            if (getUserdatas !== null) {
                let dbpassword = getUserdatas.password
                if (await bcrypt.compare(password, dbpassword)) {
                    jwt.sign({ _id: getUserdatas._id }, process.env.SECRET_KEY, async (err, token) => {
                        if(err){
                            console.log(err)
                        }

                        return res.status(200).json({ message: "user login successfully", userrecord: getUserdatas, token, status: 200 })
                    })
                }
            }else{
                return res.status(400).json({ message: "wrong criadiandial",  status: 400 })

            }

    // } catch (error) {
    //     return res.status(500).json({ message: 'internel server error', error })
    // }
}

//product methods

exports.createNewprduct = async (req, res) => {
    try {
        const token = req.headers.authorization;
        console.log(token,"token")
        if (!token) {
            return res.status(401).json({ message: 'unauthraized' })
        }
            const asd = token.split(' ');
            const asd1 = asd[1];

            const user_id = jwt.verify(asd1, process.env.SECRET_KEY, (err, decoded) => {
                if (err instanceof jwt.JsonWebTokenError) {
                    return res.status(401).json({ message: 'Invalid token' });
                } else {
                    return decoded._id;
                }
            });
        const {product_name,price,type} =req.body;

        const createProduct = await Product.create({user_id:user_id,product_name:product_name,price:price,type:type})
        if(createProduct){
            return res.status(200).json({ message: 'create product successfuly',createProduct })
        }
        
    } catch (error) {
        return res.status(500).json({ message: 'internel server error', error })
    }
}

// exports.updateProduct = async (req, res) => {
//     try {
//         const token = req.headers.authorization;
//         if (!token) {
//             return res.status(401).json({ message: 'unauthraized' })
//         }
//             const asd = token.split(' ');
//             const asd1 = asd[1];

//             const user_id = jwt.verify(asd1, process.env.SECRET_KEY, (err, decoded) => {
//                 if (err instanceof jwt.JsonWebTokenError) {
//                     return res.status(401).json({ message: 'Invalid token' });
//                 } else {
//                     return decoded._id;
//                 }
//             });
//         const {product_name,price,type} =req.body;
//        const product_id = req.params.id
//         const createProduct = await Product.updateOne({_id:product_id},{$set:{product_name,price,type}})
//         if(createProduct){
//             return res.status(200).json({ message: 'create product successfuly' })
//         }
        
//     } catch (error) {
//         return res.status(500).json({ message: 'internel server error', error })
//     }
// }

exports.updateProduct = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'unauthraized' })
        }
            const asd = token.split(' ');
            const asd1 = asd[1];

            const user_id = jwt.verify(asd1, process.env.SECRET_KEY, (err, decoded) => {
                if (err instanceof jwt.JsonWebTokenError) {
                    return res.status(401).json({ message: 'Invalid token' });
                } else {
                    return decoded._id;
                }
            });
        const {product_name,price,type} =req.body;
       const product_id = req.params.id
        const createProduct = await Product.updateOne({_id:product_id},{$set:{product_name,price,type}})
        if(createProduct){
            return res.status(200).json({ message: 'upadate product successfuly' })
        }
        
    } catch (error) {
        return res.status(500).json({ message: 'internel server error', error })
    }
}

exports.getAllproduct = async (req, res) => {
    try {
       
        const getdataproduct = await Product.find()
        if(getdataproduct){
            return res.status(200).json({ message: 'getdata product successfuly',getdataproduct })
        }
        
    } catch (error) {
        return res.status(500).json({ message: 'internel server error', error })
    }
}

exports.deletProduct = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'unauthraized' })
        }
            const asd = token.split(' ');
            const asd1 = asd[1];

            const user_id = jwt.verify(asd1, process.env.SECRET_KEY, (err, decoded) => {
                if (err instanceof jwt.JsonWebTokenError) {
                    return res.status(401).json({ message: 'Invalid token' });
                } else {
                    return decoded._id;
                }
            });
       
       const product_id = req.params.id
        const createProduct = await Product.deleteOne({_id:product_id,user_id:user_id})
        if(createProduct){
            return res.status(200).json({ message: 'delete product successfuly' })
        }
        
    } catch (error) {
        return res.status(500).json({ message: 'internel server error', error })
    }
}
exports.getproductdata = async (req, res) => {
    try {
      
       
       const product_id = req.params.id
        const getproduct = await Product.findOne({_id:product_id})
        if(getproduct){
            return res.status(200).json({ message: 'get product successfuly',data:getproduct })
        }else{
            return res.status(400).json({ message: 'something went wrong' })
        }
        
    } catch (error) {
        return res.status(500).json({ message: 'internel server error', error })
    }
}