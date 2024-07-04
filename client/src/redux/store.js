import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlices';

const persistantMiddleWare = reduxStore => next => action => {
    const result = next(action);
    const user_data = reduxStore.getState().user;
    localStorage.setItem('current_user', JSON.stringify(user_data));
    return result;
}

const persistedUserData = localStorage.getItem('current_user') ? JSON.parse(localStorage.getItem('current_user')) : {};

export const store = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: persistedUserData },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(persistantMiddleWare)
});