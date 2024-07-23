import instance from './index';

export const getUserDetails = async (payload) => {
    console.log(payload,'mutate')
    return await instance.post('/login', payload)
}