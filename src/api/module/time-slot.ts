import Http from '../http';

export const api_getTimeSlotListByPage = function(param:any) {
    return Http.get('/tsm/timeSlot/getTimeSlotListByPage',param)
}
export const api_saveOrUpdate = function(indicator:any) {
    return Http.post('/tsm/timeSlot/saveOrUpdate',indicator)
}
export const api_delete = function(id:any) {
    return Http.delete('/tsm/indicator/delete',{id:id})
}