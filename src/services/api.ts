import axios from 'axios';

const API = axios.create ({
    baseURL: 'https://discord.com/api'
})

export { API }