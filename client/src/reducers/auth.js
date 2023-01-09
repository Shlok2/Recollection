import { AUTH,LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null },action) => {
    switch (action.type) {
        case AUTH:
            // Send all the data like name , profilephoto, etc. to local storage.
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state,authData: action?.data };

        case LOGOUT:
            // Clear the localstorage as if user log out then there
            // should be no name, profilephoto, etc of that user.
            localStorage.clear();
            return { ...state,authData: null };

        default:
            return state;
    }
}

export default authReducer;