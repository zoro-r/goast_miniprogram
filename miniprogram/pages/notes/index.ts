import dayjs from 'dayjs';

const db = wx.cloud.database();

function saveRecord(record: string, option?: any) {
  db.collection('note').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      record: record,
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
    success: function(res) {
      console.log(res)
    },
    ...option,
  })
}

Page({
  data: {
    notes: [] as string[],
    textValue: '',
  },

  onInput(e: any) {
    this.setData({
      textValue: e.detail.value,
    });
  },

  onRecord() {
    const { textValue, notes = [] } = this.data;
    if (textValue) {

      saveRecord(textValue, {
        success: () => {
          notes.unshift(textValue);
          this.setData({
            notes: [...notes],
            // 清空记录的数据 
            textValue: '',
          });
        },
      });
    }
  },
  onCopy(e: any) {
    wx.setClipboardData({
      data: e.target.dataset.item,
    });
  },
  onParse() {
    wx.getClipboardData({
      success: (res) => {
        this.setData({
          textValue: res.data,
        });
      }
    });
  },
  onReady() {
    db.collection('note').get({
      success: (res) => {
        const notes = res.data.map((item: any) => item.record);
        this.setData({
          notes,
        });
      }
    });
  }
})