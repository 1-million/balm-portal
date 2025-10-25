import Http from '../http';

export const api_getIndicatorTree = function() {
    return Http.get('/tsm/indicator/getIndicatorTree')
}
export const api_saveOrUpdate = function(indicator:any) {
    return Http.post('/tsm/indicator/saveOrUpdate',indicator)
}
