import _ from 'lodash';
import axios from 'axios'

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
};