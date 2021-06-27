import request from '@/utils/request'

export default {
  //根据邮箱号发验证码
  sendCode(email) {
    return request({
      url: `/edumsm/mail/send/${email}`,
      method: 'get'
    })
  },

  //注册的方法
  registerMember(formItem) {
    return request({
      url: `/educenter/member/register`,
      method: 'post',
      data: formItem
    })
  }

}
