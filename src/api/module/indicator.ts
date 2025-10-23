import Http from '../http';

export const getIndicatorTree = function() {
    debugger
    return Http.get('/tsm/indicator/getIndicatorTree')
}