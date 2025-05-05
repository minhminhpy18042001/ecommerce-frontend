import axios from "axios";

const server = "https://ecommerce-v1-wswg.onrender.com/api/v1";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "fetchProductsRequest" });

    const { data } = await axios.get(`${server}/product/get-all`);

    dispatch({ type: "fetchProductsSuccess", payload: data.products });
  } catch (error) {
    dispatch({
      type: "fetchProductsFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "fetchProductByIdRequest" });

    const { data } = await axios.get(`${server}/product/${id}`);

    dispatch({ type: "fetchProductByIdSuccess", payload: data.product });
  } catch (error) {
    dispatch({
      type: "fetchProductByIdFail",
      payload: error.response?.data?.message || error.message,
    });
  }
}


export const clearError = () => (dispatch) => {
  dispatch({ type: "clearError" });
};

export const clearMessage = () => (dispatch) => {
  dispatch({ type: "clearMessage" });
};