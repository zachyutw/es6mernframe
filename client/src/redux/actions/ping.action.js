import { createAsyncAction } from 'redux-action-tools';
import axios from 'axios';
export const PING = 'PING';
export const PONG = 'PONG';
export const pingChat = createAsyncAction('ADD', () =>
    axios.get('http://localhost:5000/api/user/item/5c0f242f8783d7b89e70d129')
);
export const ping = () => {
    return {
        type: PING
    };
};
