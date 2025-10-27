import Http from '../http';

export const api_getIndicatorTree = function() {
    return Http.get('/tsm/indicator/getIndicatorTree')
}
export const api_saveOrUpdate = function(indicator:any) {
    return Http.post('/tsm/indicator/saveOrUpdate',indicator)
}
export const api_delete = function(id:any) {
    return Http.delete('/tsm/indicator/delete',{id:id})
}
