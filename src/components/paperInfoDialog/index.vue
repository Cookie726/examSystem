<template>
  <el-dialog
    width="1100px"
    :before-close="handleBeforeClose"
    title="编辑试卷"
    center
    :visible="showPaperInfoDialog"
  >
    <paper-info
      :handleSubmit="handleSubmit"
      :paperInfo="paperInfo"
      :changeData="changeData"
    ></paper-info>
  </el-dialog>
</template>

<script>
import PaperInfo from "@/components/paperInfo";
import { validateUpdatePaperInfo } from "@/utils/validate";
import { updatePaper } from "@/api/paperQuestionManage";
export default {
  props: {
    showPaperInfoDialog: {
      default: false,
      type: Boolean,
    },
    id: Number,
    paperInfo: Object,
    changeData: Function,
  },
  methods: {
    handleBeforeClose(done) {
      this.$emit("update:showPaperInfoDialog", false);
      done();
    },
    handleSubmit() {
      const data = {
        paper: {
          title: this.paperInfo.title,
          classify: this.paperInfo.classify,
          startTime: this.paperInfo.startTime,
          endTime: this.paperInfo.endTime,
          timeLimit: this.paperInfo.timeLimit,
        },
        studentIdList: this.paperInfo.studentIdList,
      };
      if (validateUpdatePaperInfo(data)) {
        updatePaper(this.paperInfo.id, data).then((res) => {
          if (res.code === 0) {
            window.ELEMENT.Message.success("更新成功");
            this.$emit("update:showPaperInfoDialog", false);
          } else {
            window.ELEMENT.Message.error("更新失败");
          }
        });
      } else {
        window.ELEMENT.Message.warning("请填写完整的信息");
      }
    },
  },
  components: {
    PaperInfo,
  },
};
</script>

<style></style>
