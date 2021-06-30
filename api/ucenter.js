import request from '@/utils/request'
export default {
  getUcenterInfo(){
    return request({
      url: `/educenter/member/getUcenterInfo`,
      method: 'get'
    })
  },
  updateUcenterInfo(userInfo) {
    return request({
      url: `/educenter/member/updateUcenterInfo`,
      method: 'post',
      data: userInfo
    })
  },
  updateUserPassword(newInfo){
    return request({
      url: `/educenter/member/updatePassword`,
      method: 'post',
      data: newInfo
    })
  }
}
