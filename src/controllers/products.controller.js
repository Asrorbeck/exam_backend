import { read, write } from "../utils/model.js"

let productController = {
    GET: (req,res) => {
        let products = read('products')
        let { sub_category_id } = req.query
        let filteredId = products.filter(product => product.sub_category_id == sub_category_id)
        if (filteredId.length) {
            res.send(filteredId)
        }else {
            res.send(products)
        }
        
    },

    POST: (req, res) => {
        let products = read('products')
        let { sub_category_id, model, product_name, price, color } = req.body

        let newProduct = { product_id: products.at(-1)?.product_id + 1 || 1, sub_category_id, model, product_name, price, color }

        products.push(newProduct)
        write('products', products)
        return res.status(201).json({status: 201, message: "product added successfully", data: newProduct})
    }


}

export default productController