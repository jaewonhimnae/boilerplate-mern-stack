import {
    GET_CHATS,
    AFTER_POST_MESSAGE
} from '../actions/types';
 
export default function(state={},action){
    switch(action.type){
        case GET_CHATS:
           return {...state, chats: action.payload }
        case AFTER_POST_MESSAGE:
           return {
              ...state,
              chats: state.chats.concat(action.payload) 
            };
        default:
            return state;
    }
}