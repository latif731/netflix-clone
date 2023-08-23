import Axios from "./Axios"

// Get all categories API function
const getCategoriesServices = async() => {
    const {data} = await Axios.get("/categories");
    return data
}


// ******************* ADMIN APIs ******************


// create new category API function
const createCategoryServices = async (title, token) => {
    const { data } = await Axios.post("/categories", title, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

// delete category API function
const deleteCategoryServices = async (id ,token) => {
    const { data } = await Axios.delete(`/categories/${id}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

// update category API function
const updateCategoryServices = async( id, title, token)=> {
    const { data } = await Axios.put(`/categories/${id}`,title, {
        headers :{
            Authorization: `Bearer ${token}`,
        }
    })
    return data
}

 
export {
    getCategoriesServices,
    createCategoryServices,
    deleteCategoryServices,
    updateCategoryServices
}