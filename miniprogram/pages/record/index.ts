const OPTION_NUM = 'option_key';

Page({
  data: {
    num: 6,
  },
  // 进行操作
  makeOption() {
    const { num } = this.data;
    if (num <= 0) {
      return
    }

    wx.showModal({
      title: '提示',
      content: '你确定要进行操作吗? 操作的越多,失误的概率就越大哟~',
      success: (res) => {
        if (res.confirm) {
          const optNum = num - 1;
          // 进行数据操作
          this.setData({
            num: optNum,
          });
          wx.setStorageSync(OPTION_NUM, optNum);
        }
      }
    });
  },

  onShow() {
    const currentNum = wx.getStorageSync(OPTION_NUM);
    if (currentNum || currentNum === 0) {
      // wx.setStorageSync(OPTION_NUM, currentNum);
      this.setData({
        num: +currentNum,
      });
    }
  }
})