import React, { PropTypes } from 'react'
const axios = require('axios');



axios.defaults.baseURL = 'http://localhost:8080/dataexchange'
axios.defaults.headers = { Authorization:"Basic YWRtaW46YWRtaW4xMjNwYXNzNDU2"}
// alert(JSON.stringify(axios.defaults.headers.Authorization))
// console.log(JSON.stringify(axios.defaults.headers))
//let baseUrl = axios.defaults.baseURL;

//alert(baseUrl)
