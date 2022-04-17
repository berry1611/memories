import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducers = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      console.log(state);
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};

export default authReducers;
