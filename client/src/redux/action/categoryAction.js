import * as CategoriesConstant from "../constans/CategoryConstant"
import * as categoriesApis from "../Apis/CategoryService";
import toast from "react-hot-toast"
import { ErrorsAction, tokenProtection } from "../protections";

// Get all Categories action
export const getAllCategoriesAction = () => async(dispatch) => {
    try{
        dispatch({ type: CategoriesConstant.CREATE_CATEGORIES_REQUEST });
        const data = await categoriesApis.getCategoriesServices();
        dispatch({ type: CategoriesConstant.GET_ALL_CATEGORIES_SUCCESS, payload: data})
    }catch (error){
        // dispatch({ type: CategoriesConstant.GET_ALL_CATEGORIES_FAIL, payload: error.message })
        ErrorsAction(error, dispatch, CategoriesConstant.GET_ALL_CATEGORIES_FAIL)
    }
}


// Create CATEGORIES action
export const createCategoriesAction = (title) => async (dispatch, getState) =>{
    try{
        dispatch({ type: CategoriesConstant.CREATE_CATEGORIES_REQUEST});
        await categoriesApis.createCategoryServices(title, tokenProtection(getState))
        dispatch({ type: CategoriesConstant.CREATE_CATEGORIES_SUCCESS })
        toast.success("Category created successfully")
        dispatch(getAllCategoriesAction())
    }catch(error){
        ErrorsAction(error, dispatch, CategoriesConstant.CREATE_CATEGORIES_FAIL)
    }
}

// Update CATEGORIES action
export const updateCategoriesAction = (id , title) => async (dispatch, getState) => {
    try{
        dispatch({type :  CategoriesConstant.UPDATE_CATEGORIES_REQUEST});
        await categoriesApis.updateCategoryServices(
            id,
            title,
            tokenProtection(getState)
        )
        toast.success("Category updated successfully")
        dispatch({ type: CategoriesConstant.UPDATE_CATEGORIES_SUCCESS })
    }catch(error){
        ErrorsAction(error, dispatch, CategoriesConstant.UPDATE_CATEGORIES_FAIL);
    }
}

// Delete CATEGORIES action
export const deleteCategoriesAction = (id) => async (dispatch, getState) => {
    try{
        dispatch({ type: CategoriesConstant.DELETE_CATEGORIES_REQUEST });
        await categoriesApis.deleteCategoryServices(id, tokenProtection(getState));
        dispatch({ type: CategoriesConstant.DELETE_CATEGORIES_SUCCESS });
        toast.success('Category deleted Successfully')
    }catch(error){
        ErrorsAction(error, dispatch, CategoriesConstant.DELETE_CATEGORIES_FAIL );
    }
}

