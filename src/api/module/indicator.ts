import Http from '../http';

export const api_getIndicatorTree = function() {
    debugger
    return Http.get('/tsm/indicator/getIndicatorTree')
}