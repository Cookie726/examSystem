<template>
  <div class="exam-board-container">
    <div class="nav" v-if="pageName === 'examRecordDetail'">
      <ul class="menu-items">
        <li class="menu-item">
          <div class="item-label">姓名</div>
          <div class="item-data">{{ userName }}</div>
        </li>
        <li class="menu-item">
          <div class="item-label">考试成绩</div>
          <div class="item-data">{{ studentScore }}</div>
        </li>
      </ul>
    </div>
    <div
      class="nav"
      v-if="pageName === 'examStart' || pageName === 'paperPreview'"
    >
      <ul class="menu-items">
        <li class="menu-item menu-item-time">
          <div class="item-label">剩余时间</div>
          <div class="item-data">{{ countDownTime }}</div>
        </li>
        <li class="menu-item menu-item-process">
          <div class="item-label">当前进度</div>
          <div class="item-data">
            <span id="commitCount">{{ process }}</span
            >/<span id="totalCount">{{ done.length }}</span>
          </div>
          <div class="item-process">
            <div
              class="item-process-bar"
              id="commitProcess"
              :style="'width:' + (process * 100) / done.length + 'px;'"
            ></div>
          </div>
        </li>
      </ul>
    </div>
    <button
      v-if="pageName === 'markExam'"
      type="button"
      class="btn btn-primary btn-nav btn-bottom position-left-0"
      @click="handleMarkPaper"
    >
      保存
    </button>
    <button
      v-if="pageName === 'paperPreview' || pageName === 'examStart'"
      type="button"
      @click="handleSubmitAnswer"
      class="btn btn-primary btn-nav btn-bottom position-left-0"
    >
      提交
    </button>
  </div>
</template>

<script>
import { submitAnswer } from "@/api/paperHome";
export default {
  props: {
    isAnswer: {
      type: Boolean,
      default: true,
    },
    paperId: Number,
    timeLimit: Number,
    pageName: String,
    studentScore: Number,
    userName: String,
  },
  mounted() {
    setInterval(() => {
      this.timeLimit--;
    }, 1000);
  },
  methods: {
    handleMarkPaper() {
      this.$store
        .dispatch("markPaper/SUBMIT")
        .then((res) => {
          if (res.code === 0) {
            window.ELEMENT.Message.success("批改成功");
          } else {
            window.ELEMENT.Message.error(res.msg);
          }
        })
        .catch((e) => {
          window.ELEMENT.Message.error(e);
        });
    },
    async handleSubmitAnswer() {
      if (this.pageName === "examStart") {
        if (new Date() < new Date(this.startTime).getTime()) {
          window.ELEMENT.Notification.error({
            title: "错误",
            message: "考试还未开始不能提交",
          });
          return;
        } else if (new Date() > new Date(this.endTime).getTime()) {
          window.ELEMENT.Notification.error({
            title: "错误",
            message: "考试已经结束不能提交",
          });
          return;
        } else {
          try {
            const res = await submitAnswer(this.paperId);
            if (res.code !== 0) {
              window.ELEMENT.Message.error(res.msg);
            } else {
              window.ELEMENT.Message.success("提交成功");
              this.$router.replace({ path: "/" });
            }
          } catch (e) {
            throw new Error(e);
          }
        }
      } else if (this.pageName === "paperPreview") {
        window.ELEMENT.Message.error("不能提交试卷");
      }
    },
  },
  computed: {
    done() {
      return this.$store.state.exercise.done;
    },
    process() {
      return this.done.filter((status) => status).length;
    },
    countDownTime() {
      let h = Math.floor(this.timeLimit / 60 / 60);
      if (h < 10) {
        h = "0" + h;
      }
      let m = Math.floor((this.timeLimit - h * 60 * 60) / 60);
      if (m < 10) {
        m = "0" + m;
      }
      let s = this.timeLimit - h * 60 * 60 - m * 60;
      if (s < 10) {
        s = "0" + s;
      }
      return `${h}:${m}:${s}`;
    },
  },
};
</script>

<style lang="less" scoped>
.exam-board-container {
  height: 80%;
  font-weight: 400;
  position: fixed;
  width: 120px;
  right: 90px;
  .nav {
    color: #27274a;
    line-height: 20px;
    width: 100%;
    padding: 0 10px;
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-bottom: 10px;
    text-align: center;
    list-style: none;
    .menu-item {
      list-style: none;
      padding: 12px 0;
      &:nth-child(n + 2) {
        border-top: 1px solid #dedede;
      }
      &.disabled {
        color: #c1c1cb;
        cursor: not-allowed;
      }
      .item-label {
        margin-bottom: 3px;
      }
      .item-data {
        font-size: 14px;
        line-height: 22px;
        color: #1a8cfe;
        font-weight: 400;
      }
    }
    .menu-item-time {
      .item-data {
        font-size: 18px;
        line-height: 22px;
        color: #ff0000;
      }
    }
    .menu-item-process {
      .item-data {
        color: #27274a;
        line-height: 17px;
        margin-bottom: 7px;
      }
      .item-process {
        height: 4px;
        width: 100%;
        border-radius: 2px;
        background: #f1f3f8;
        position: relative;
      }
      .item-process-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 4px;
        width: 0;
        border-radius: 2px;
        background: #1a8cfe;
      }
    }
  }
  .nav-bottom {
    position: absolute;
    bottom: 44px;
  }
  .btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    user-select: none;
  }
  .btn-nav {
    width: 100%;
    margin-bottom: 10px;
  }
  .btn-primary {
    color: #fff;
    background-color: #1a8cfe;
    border-color: #1a8cfe;
    &:hover {
      color: #fff;
      background-color: #2064b7;
      border-color: #1a5399;
    }
  }
  .btn-bottom {
    position: absolute;
    bottom: 0;
    margin: 0;
  }
  .position-left-0 {
    left: 0;
  }
}
</style>
