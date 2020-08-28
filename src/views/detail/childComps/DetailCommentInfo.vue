<template>
  <div id="detail_comment" v-if="Object.keys(commentInfo).length != 0">
    <div class="comment_title">
      <span class="comment_name">用户评价</span>
      <span class="comment_more">更多</span>
    </div>
    <div class="comment_info">
      <div class="u_info">
        <img :src="commentInfo.user.avatar" alt="" />
        <span>{{ commentInfo.user.uname }}</span>
      </div>
      <div class="comment_content">
        <div class="content">{{ commentInfo.content }}</div>
        <p class="content_info">
          {{ commentInfo.created | dateShow }} {{ commentInfo.style }}
        </p>
      </div>
    </div>
    <div class="shop_reply" v-if="commentInfo.explain != null">
      {{ commentInfo.explain }}
    </div>
    <div class="comment_img" v-if="commentInfo.images != null">
      <img
        :src="item"
        alt=""
        v-for="(item, index) in commentInfo.images"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
import { formatDate } from "common/utils.js";
export default {
	name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    dateShow(value) {
      const date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>
<style scoped>
#detail_comment {
  font-size: 15px;
  padding: 10px 8px;
}
.comment_title {
  padding: 10px 0;
  padding-bottom: 19px;
  border-bottom: 2px solid rgba(128, 128, 128, 0.3);
  position: relative;
}

.comment_more {
  position: absolute;
  right: 0;
}
.comment_more :after {
  content: "";
  background: url("~assets/imgs/detail/right_arrow.svg") 0 0/25px 25px;
  display: inline-block;
  position: relative;
  top: 6px;
  width: 25px;
  height: 25px;
}

.u_info {
  padding: 10px 0;
  line-height: 42px;
  display: flex;
}
.u_info img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(128, 128, 128, 0.3);
}
.u_info span {
  margin-left: 10px;
}

.content {
  line-height: 24px;
  color: #666;
}
.content_info {
  color: #999;
  padding: 7px 0;
}

.shop_reply {
  border-top: 1px solid rgba(128, 128, 128, 0.4);
  padding: 12px 0;
  color: gray;
  line-height: 19px;
}

.comment_img img {
  margin-right: 5px;
  width: auto;
  height: 100px;
}
</style>
