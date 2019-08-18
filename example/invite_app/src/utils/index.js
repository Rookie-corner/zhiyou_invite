export function getRedirectTo(type,header){
    let path=''
    // if(type==='求职者'){
    //     path='/hunter'
    // }else{
    //     path='/recruiter'
    // }
    path += type==='求职者' ? '/hunter' : '/recruiter'
    if(!header){
        path+='info'
    }
    return path
}