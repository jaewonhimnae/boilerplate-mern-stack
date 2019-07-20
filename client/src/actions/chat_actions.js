import axios from 'axios';
import {
    GET_CHATS,
    AFTER_POST_MESSAGE
} from './types';

import { CHAT_SERVER } from '../components/utils/misc.js';

export function getChats(){
    const request = axios.get(`${CHAT_SERVER}/getChats`)
                     .then(response => response.data);

    return {
        type: GET_CHATS,
        payload: request
    }
}

export function afterPostMessage(variables){
    return {
        type: AFTER_POST_MESSAGE,
        payload: variables
    }
}

