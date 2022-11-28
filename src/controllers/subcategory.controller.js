import { read, write } from "../utils/model.js"

let subcategoryController = {
    GET: (req, res) => {

        let subCategories = read('subcategories')
        let products = read('products')
    
        subCategories.map(subCategory => {
            subCategory.products = products.filter(product => {
                if (product.sub_category_id == subCategory.sub_category_id) {
                    delete product.sub_category_id
                    return product
                }
            })
            delete subCategories.category_id
        })
    
        res.json(subCategories)
    },


    POST: (req, res) => {
        let subCategories = read('subCategories')
        let { category_id, sub_category_name } = req.body

        let newSubCategory = { sub_category_id: subCategories.at(-1)?.sub_category_id + 1 || 1, category_id, sub_category_name }

        subCategories.push(newSubCategory)
        write('subcategories', subCategories)
        return res.status(201).json({status: 201, message: "subcategory added successfully", data: newSubCategory})
    }
}

export default subcategoryController