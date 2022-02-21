import _ from 'lodash';
import axios from 'axios'
import { LoginForm } from '../types'

const apiUrl = "https://biz1pos.azurewebsites.net"
const conveyor = "https://biz1posapi-rv7.conveyor.cloud"

const execute = async (url: string, method = 'GET', { params = {}, queries = {}, payloads = {}, headers = {} } = {}) => {
    const base = url.replace(/\/$/, '');
    const api_url = url
    const options: any = { method, headers };

    if (method === 'POST' || method === 'PATCH') {
        options.data = JSON.stringify(payloads);
    }

    if (queries) {
        options.params = queries;
    }

    options.url = api_url;
    options.baseURL = base;
    // console.log("Request", options)
    return await axios(options);
};

const login = (form: LoginForm) => {
    const formData = `EmailId=${form.emailId}&Password=${form.password}`
    // console.log(axios.post(apiUrl + "/api/LogIn/WebLogIn", formData))
    return axios.post(apiUrl + "/api/LogIn/WebLogIn", formData, {
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        timeout: 1000,
    })
}

const kotGroups = (companyId: number) => {
    return axios.get(apiUrl + "/api/KOTGroup/GetIndex?CompanyId=" + companyId)
}

const getdineindata = (url: string) => {
    return axios.post(url, ["diningarea", "diningtable"])
}

const getproducts = (url: string) => {
    return axios.post(url, ["product", "category"])
}

const getkots = (url: string, KOTGroupId: number) => {
    return axios.post(url, { KOTGroupId })
}

const getkotgroups = (url: string) => {
    return axios.post(url, ["printersettings"])
}

const checkserverstatus = (url: string) => {
    return axios.get(url)
}

const getdata = (url: string, options: any) => {
    return axios.post(url, options)
}

const clearorder = (url: string, options: any) => {
    return axios.post(url, options)
}

const getqrurl = (url: string, options: any) => {
    return axios.post(url, options)
}

export default {
    get: (url: string, options: { params?: {} | undefined; queries?: {} | undefined; payloads?: {} | undefined; headers?: {} | undefined; } | undefined) => execute(url, 'GET', options),
    post: (url: string, options: { params?: {} | undefined; queries?: {} | undefined; payloads?: {} | undefined; headers?: {} | undefined; } | undefined) => execute(url, 'POST', options),
    patch: (url: string, options: { params?: {} | undefined; queries?: {} | undefined; payloads?: {} | undefined; headers?: {} | undefined; } | undefined) => execute(url, 'PATCH', options),
    delete: (url: string, options: { params?: {} | undefined; queries?: {} | undefined; payloads?: {} | undefined; headers?: {} | undefined; } | undefined) => execute(url, 'DELETE', options),
    getdata: (url: string, options: any) => getdata(url, options),
    getkots: (url: string, KOTGroupId: number) => getkots(url, KOTGroupId),
    getqrurl: (url: string, options: any) => getqrurl(url, options),
    clearorder: (url: string, options: any) => clearorder(url, options),
    getproducts: (url: string) => getproducts(url),
    getkotgroups: (url: string) => getkotgroups(url),
    getdineindata: (url: string) => getdineindata(url),
    checkserverstatus: (url: string) => checkserverstatus(url),
    login: (form: LoginForm) => login(form),
    kotGroups: (companyId: number) => kotGroups(companyId),
};