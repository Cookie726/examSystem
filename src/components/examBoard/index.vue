<template>
  <div class="exam-board-container">
    <div class="nav">
      <ul class="menu-items">
        <li class="menu-item">
          <div class="item-label">姓名</div>
          <div class="item-data">潘炳名</div>
        </li>
        <li class="menu-item">
          <div class="item-label">考试成绩</div>
          <div class="item-data">10.0</div>
        </li>
      </ul>
    </div>
    <div class="nav">
      <ul class="menu-items">
        <li class="menu-item menu-item-time">
          <div class="item-label">剩余时间</div>
          <div class="item-data">00:59:22</div>
        </li>
        <li class="menu-item menu-item-process">
          <div class="item-label">当前进度</div>
          <div class="item-data">
            <span id="commitCount">0</span>/<span id="totalCount">8</span>
          </div>
          <div class="item-process">
            <div
              class="item-process-bar"
              id="commitProcess"
              style="width: 12.5px;"
            ></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="btn btn-primary btn-nav">关闭</div>
    <div class="nav nav-bottom">
      <ul class="menu-items">
        <li class="menu-item disabled">
          <span class="item-label">上一人</span>
        </li>
        <li class="menu-item"><span class="item-label">下一人</span></li>
      </ul>
    </div>
    <button
      type="button"
      class="btn btn-primary btn-nav btn-bottom position-left-0"
    >
      保存
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.exam-board-container {
  height: 80%;
  font-weight: 400;
  position: fixed;
  top: 0;
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