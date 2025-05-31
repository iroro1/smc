export const API_BASE_URL = "https://dev2.optimusai.ai/api/v1/";

// AUTH
export const SIGNUP = API_BASE_URL + "customer/auth/signup";
export const LOGIN = API_BASE_URL + "customer/auth/login";
export const FORGOT_PASSWORD = API_BASE_URL + "customer/auth/forgot-password";
export const CONFIRM_TOKEN = API_BASE_URL + "customer/auth/confirm-token";
export const RESET_PASSWORD = API_BASE_URL + "customer/auth/reset-password";
export const VERIFY_CODE = API_BASE_URL + "customer/auth/confirm-token";
export const CHANGE_PASSWORD = API_BASE_URL + "customer/auth/change-password/2";
export const DELETE_ACCOUNT = API_BASE_URL + "customer/auth/delete-account";
export const LOGOUT = API_BASE_URL + "customer/auth/logout";
export const VIEW_PROFILE = API_BASE_URL + "customer/auth/view-profile";
export const UPDATE_PROFILE = API_BASE_URL + "customer/auth/update-profile";

// ADDRESS
export const ADD_ADDRESS = API_BASE_URL + "customer/address/create";
export const VIEW_ALL_ADDRESS = API_BASE_URL + "customer/address/get-all";
export const VIEW_ADDRESS = API_BASE_URL + "customer/address/get";
export const UPDATE_ADDRESS = API_BASE_URL + "customer/address/update/";
export const DELETE_ADDRESS = API_BASE_URL + "customer/address/delete/";

// RESTURANTS
export const VIEW_ALL_RESTAURANTS =
  API_BASE_URL + "restaurants/available-restaurants";
export const VIEW_TABLES_BY_RESTAURANT =
  API_BASE_URL + "restaurants/all-tables/";
export const VIEW_RESTAURANTS_BY_BRANCH =
  API_BASE_URL + "restaurants/get-branch/";

// MENU
export const VIEW_MENU_CATEGORY_BY_RESTAURANT =
  API_BASE_URL + "menus/categories/all/";
export const VIEW_MENU_CUSTOMER = API_BASE_URL + "menus/category/";
export const SEARCH_MENU_CUSTOMER =
  API_BASE_URL + "category/search/1?name=rice";
export const GET_MENU_ITEM_BY_ID = API_BASE_URL + "menus/";
export const GET_MENU_ITEM_BY_ID_MOBILE = API_BASE_URL + "menus/mobile/";

// ORDER PLACEMENT
