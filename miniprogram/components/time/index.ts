import dayjs from 'dayjs';

//YYYY年MM月DD日
const format = 'HH:mm:ss';

Component({
  data: {
    time: dayjs().format(format),
  },

  // 计算时间
  ready() {
    setInterval(() => {
      this.setData({
        time: dayjs().format(format),
      });
    }, 200);
  }
})
