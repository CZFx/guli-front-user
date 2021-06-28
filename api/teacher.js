import request from '@/utils/request'
export default {
  getTeacherList(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontList/${current}/${limit}`,
      method: 'post',
      data:teacherQuery
    })
  },
  //讲师详情的方法
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontInfo/${id}`,
      method: 'get'
    })
  }
}
