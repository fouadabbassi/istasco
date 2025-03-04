import {
    CREATE_MESSAGE_FAILURE,
    CREATE_MESSAGE_REQUEST,
    CREATE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_FAILURE,
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
} from "./messageAction";

const initialState = {
    messages: [],
    loading: false,
    error: null,
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
        case CREATE_MESSAGE_REQUEST:
        case DELETE_MESSAGE_REQUEST:
            return { ...state, loading: true };

        case FETCH_MESSAGES_SUCCESS:
            return { ...state, messages: action.payload, loading: false };

        case CREATE_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, action.payload],
                loading: false,
            };

        case DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: state.messages.filter(
                    (message) => message._id !== action.payload._id
                ),
                loading: false,
            };

        case FETCH_MESSAGES_FAILURE:
        case CREATE_MESSAGE_FAILURE:
        case DELETE_MESSAGE_FAILURE:
            return { ...state, error: action.payload, loading: false };

        default:
            return state;
    }
};
