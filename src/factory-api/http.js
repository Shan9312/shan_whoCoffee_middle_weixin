/**
 * Created by caoshi on 2018/3/1.
 */

import axios from 'axios';
import AppConfig from '../appConfig';
import store from '../store/store'
//baseUrl
axios.defaults.baseURL =AppConfig.API.BASE_URL;
//timeout
axios.defaults.timeout = 5000;
export default axios;
