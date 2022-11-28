import express from "express"
import { read, write } from "./utils/model.js"
import subcategoryController from "./controllers/subcategory.controller.js"
import categoryController from "./controllers/category.controller.js"
import productController from "./controllers/products.controller.js"

const app = express()

app.use(express.json())

app.get('/products/:id', (req, res) => {
    let products = read('products')
    let { id } = req.params
    let newProduct = products.find(product => product.product_id == id)
    res.send(newProduct)
})

app.get('/products', productController.GET)

app.get('/subcategories', subcategoryController.GET)

app.get('/categories', categoryController.GET)

app.post('/categories', categoryController.POST)

app.post('/subcategories', subcategoryController.POST)

app.post('/products', productController.POST)





app.listen(5000, ()=> {console.log('working on http://localhost:5000')})