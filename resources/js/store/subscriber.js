/*
 * --------------------
 * Author Name: Eoan O'Dea
 * Author Email: eoan@wspace.ie
 * Date Created: Wednesday January 15th 2020 12:36:07 pm
 * --------------------
 * Project Name: IADTY3PPClientMangementSystem
 * Version: 1.0.0
 * --------------------
 * File Name: subscriber.js
 * Last Modified: Wednesday January 15th 2020 12:49:25 pm
 * --------------------
 * Copyright (c) 2020 WebSpace
 * --------------------
 */


import store from './index'
import axios from 'axios'

store.subscribe((mutation) => {
    switch(mutation.type) {
        case 'auth/SET_TOKEN':
            if(mutation.payload) {
                axios.defaults.headers.common['Authorization'] = `${mutation.payload.token_type} ${mutation.payload.access_token}`
            } else axios.defaults.headers.common['Authorization'] = null
            break;

    }
})