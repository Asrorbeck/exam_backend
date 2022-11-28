import { read, write } from "../utils/model.js"

let categoryController = {
    GET: (req, res) => {

        let categories = read('categories')
        let subCategories = read('subcategories')
    
        categories.map(category => {
            category.subCategory = subCategories.filter(subCategory => {
                if (subCategory.category_id == category.category_id) {
                    delete subCategory.category_id
                    return subCategory
                }
            })
        })
    
        res.json(categories)
    
    },

    POST: (req, res) => {
        let categories = read('categories')
        let { category_name } = req.body 
        let newCategory = { category_id: categories.at(-1)?.category_id + 1 || 1, category_name }
        categories.push(newCategory)
        write('categories', categories)
        return res.status(201).json({status: 201, message: "category added successfully", data: newCategory})
    }
}

export default categoryController