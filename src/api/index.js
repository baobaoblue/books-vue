import axios from 'axios';
//axios.defaults.baseURL = 'http://localhost:3000'; //增加默认请求路径
axios.interceptors.response.use((res)=>{
    return res.data;
})
//获取轮播图数据
export let getSliders = () => {
    return axios.get('http://localhost:3000/sliders')
}

//获取图书列表数据
export let getHotBooks = ()=> {
    return axios.get('http://localhost:3000/hot')
}

//获取全部图书
export let getBooks = () => {
    return axios.get('http://localhost:3000/book')
}

//删除某一本图书
export let removeBook = (id) =>{
    return axios.delete(`http://localhost:3000/book?id=${id}`)
}

//获取某一本书
export let findOneBook = (id) => {
    return axios.get(`http://localhost:3000/book?id=${id}`)
}

//修改图书内容
export let updateBook = (id,data) => {
    return axios.put(`http://localhost:3000/book?id=${id}`,data)
}

//添加图书
export let addBook = (data) =>{
    return axios.post('http://localhost:3000/book',data)
}

//获取全部
export let getAll = () => {
    return axios.all([getSliders(),getHotBooks()])
}

//下拉刷新
export let pagination = (offset) => {
    return axios.get(`http://localhost:3000/page?offset=${offset}`)
}