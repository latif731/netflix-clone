import Categories from "../models/CategoriesModel.js";
import asyncHandler from "express-async-handler"

// @desc get all categories
// @route GET /api/categories
// @access Public

const getCategories = asyncHandler(async(req, res) => {
    try {
        // find all categories in database
        const categories = await Categories.find({})
        // send all categories to the client
        res.json(categories)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

// **************** ADMIN CONTROLLERS *******************

// @desc create new category
// @route POST /api/categories
// @access Private/Admin

const createCategory = asyncHandler(async(req, res) => {
    try{
        // get title from request body
        const { title } = req.body
        // create new category
        const category = await new Categories({
            title,
        });
        const createCategory = await category.save();
        // send new category to the client
        res.status(201).json(createCategory) 
    }catch(error){
        res.status({ message: error.message })
    }
})

// @desc update category
// @route PUT /api/category/:id
// @access Private/Admin

const   updateCategory = asyncHandler(async(req, res) => {
    try{

        // get category id from request params
        const category = await Categories.findById(req.params.id)
        if(category){
            // update category title
            category.title = req.body.title || category.title
            // save the update category to the database
            const updatedCategory = await category.save()
            // send the update category to the client
            res.json(updatedCategory);
    }
    else{
        res.status(404).json({ message: "Category not found"})
    }
} catch(error){
    res.status(400).json({message: error.message})
}

})

// @desc delete category
// @route DELETE /api/categories/:id
// @access Private/Admin

const deleteCategory = asyncHandler(async(req, res) => {
    try{
        // get category id from request params
        const category =  await Categories.findById(req.params.id )
        
        if(category){
            // delete the category from database
            await category.deleteOne();
            // send success message to the client
            res.json({ message: "Category removed"})
        }else{
            res.status(404).json({message: "Category not found"})
        }
    
    }catch(error){
        res.status(404).json({ message: error.message })
    }
})

export { getCategories, createCategory, updateCategory, deleteCategory}