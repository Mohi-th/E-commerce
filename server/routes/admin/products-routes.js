const express = require('express')

const { handleImageUpload, addProducts, editProduct, deleteProduct, fetchAlltheproducts } = require('../../controllers/Admin/products-controller');

const { upload } = require('../../helpers/cloudinary')

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);
router.post('/add', addProducts);
router.put('/edit/:id', editProduct);
router.put('/delete/:id', deleteProduct);
router.get('/get', fetchAlltheproducts);

module.exports = router