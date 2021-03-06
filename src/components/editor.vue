<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
      <div v-show="showSavaBtn" @click="save" class="toolbar-btn">保存</div>
    </div>
    <div ref="editor" class="text"></div>
  </div>
</template>

<script>
import E from "wangeditor";
import { baseURL } from "@/utils/request";
import "wangeditor/release/wangEditor.min.css";
export default {
  name: "editoritem",
  data() {
    return {
      // uploadPath,
      showSavaBtn: false,
      editor: null,
      info_: null,
    };
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    hasSaveBtn: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    isClear: {
      type: Boolean,
      default: false,
    },
    configMenus: {
      default: () => {
        return [
          "bold", // 粗体
          "italic", // 斜体
          "underline", // 下划线
          "fontSize", // 字号
          "fontName", // 字体
          "strikeThrough", // 删除线
          "foreColor", // 文字颜色
          "backColor", // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          "quote", // 引用
          "emoticon", // 表情
          "image", // 插入图片
          "table", // 表格
          "video", // 插入视频
          "code", // 插入代码
          "fullscreen", // 全屏
        ];
      },
      type: Array,
    },
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    },
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
  },
  methods: {
    async seteditor() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      this.editor.customConfig.uploadImgShowBase64 = false; // base 64 存储图片
      this.editor.customConfig.uploadImgServer = `${baseURL}/upload/pic`; // 填写配置服务器端地址
      this.editor.customConfig.uploadImgHeaders = {
        Accept: "application/json, text/plain, */*",
      }; // 自定义 header
      this.editor.customConfig.uploadFileName = "pic"; // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgParams = {
        // 如果版本 <=v3.1.0 ，属性值会自动进行 encode ，此处无需 encode
        // 如果版本 >=v3.1.1 ，属性值不会自动 encode ，如有需要自己手动 encode
        // file_type: "img",
      };
      this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 6 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间

      // 配置菜单
      this.editor.customConfig.menus = this.configMenus;

      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          console.log(xhr, editor, result);
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          console.log(xhr, editor, result);
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          console.log(xhr, editor);
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          console.log(xhr, editor);
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          console.log(result, editor);
          // 图片上传成功，插入图片的回调
          //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          // console.log(result.data[0].url)
          //insertImg()为插入图片的函数
          //循环插入图片
          // for (let i = 0; i < 1; i++) {
          if (result.code == 0) {
            let url = result.data;
            JSON.stringify(url);
            insertImg(url);
          } else {
            this.$Message.error(result.msg);
          }
          // }
        },
      };
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html; // 绑定当前逐渐地值
        this.$emit("update:value", this.info_); // 将内容同步到父组件中
      };
      this.editor.customConfig.onblur = (html) => {
        if (this.hasSaveBtn) {
          this.showSavaBtn = false;
        }
        this.info_ = html; // 绑定当前逐渐地值
        this.$emit("update:value", this.info_);
        this.$emit("save");
      };
      this.editor.customConfig.onfocus = () => {
        if (this.hasSaveBtn) {
          this.showSavaBtn = true;
        }
      };
      // 创建富文本编辑器
      this.editor.create();
    },
    save() {
      this.editor.onblur();
    },
  },
};
</script>

<style>
.editor {
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
  z-index: 0;
}
.toolbar {
  border: 1px solid #ccc;
  position: relative;
}
.text {
  border: 1px solid #ccc;
  min-height: 0;
}
.w-e-toolbar {
  flex-wrap: wrap;
}
.toolbar-btn {
  z-index: -1;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 0 8px;
  text-align: center;
  border-radius: 2px;
  width: 44px;
  height: 24px;
  line-height: 24px;
  background-color: #1a8cef;
  color: #fff;
  font-size: 12px;
}
</style>
