<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="total === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list" v-if="total > 0">
            <ul class="of">
              <li v-for="teacher in this.list" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/' + teacher.id" :title="teacher.name" target="_blank">
                      <img :src="teacher.avatar" :alt="teacher.name">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/' + teacher.id" :title="teacher.name" target="_blank" class="fsize18 c-666">{{ teacher.name }}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{ teacher.intro }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ teacher.career }}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear"></div>
          </article>

          <!-- 分页 -->
          <el-pagination
            :current-page="page"
            :page-size="limit"
            :total="total"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="getList"
          />

        </div>
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
import teacherApi from '@/api/teacher'
export default {
  data() { // 定义变量和初始值
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 8, // 每页记录数
      total: 0, // 总记录数
      teacherQuery: {} // 条件封装对象
    }
  },
  created() { // 页面渲染之前执行，一般调用methods定义的方法
    this.getList()
  },
  methods: { // 创建具体的方法，调用teacher.js定义的方法
    // 讲师列表的方法
    getList(page = 1) {
      this.page = page
      teacherApi.getTeacherList(this.page, this.limit, this.teacherQuery)
        .then(response => {
          this.list = response.data.data.page.records
          this.total = response.data.data.page.total
        }) //  请求成功
        .catch(error => {
          console.log(error)
        }) // 请求失败
    }
  }
};
</script>
