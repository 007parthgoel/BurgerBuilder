import axios from 'axios';

const intance=axios.create({
    baseURL: 'https://react-my-burger-f3957.firebaseio.com/'
})

export default intance;