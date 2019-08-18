import axios from 'axios'
export default function ajax(url='',data={},type='GET'){
    if(type==='GET'){
        let paramStr=''
        Object.keys(data).forEach(key=>{
            paramStr+=key+'='+data[key]+'&'
        })
        if(paramStr){
            paramStr=paramStr.substring(0,paramStr.lastIndexOf('&'))
        }
        url+='?'+paramStr
        return axios.get(url)
    }else{
        return axios.post(url,data)
    }
}