import { GET_ERROR, CLEAR_ERROR } from '../actions/types';

const InitState = {
    msg: {},
    status: null,
    id: null
}

export default function (state = InitState, action) {
    switch (action.type) {
        case GET_ERROR: {
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            }
        }
        case CLEAR_ERROR: {
            return {
                msg: {},
                status: null,
                id: null
            }
        }

        default:
            return state;
    }
} 