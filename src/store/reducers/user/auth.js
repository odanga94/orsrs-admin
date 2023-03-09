import { LOGIN, LOGOUT } from '../../actions/user/auth';

const initialState = {
    userId: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return initialState;
        case LOGIN:
            return {
                userId: action.userId
            }
        default:
            return state;
    }
}

export default authReducer;