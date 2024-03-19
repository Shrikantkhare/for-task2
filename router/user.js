const router = require('express').Router();

const { registration,login,createNewprduct,updateProduct,deletProduct,
    getAllproduct,getproductdata} = require('../controllers/userController')
router.post("/registration", registration);
router.post("/login", login);
router.post("/createNewprduct", createNewprduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deletProduct/:id", deletProduct);
router.get("/getAllproduct", getAllproduct);
router.get("/getproductdata/:id", getproductdata);


//product routes

module.exports = router;