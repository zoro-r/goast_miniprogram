const words = [
  '操作越多,失败越多',
  '要反着人性去操作',
  '你现在是贪婪还是恐惧?',
  '勿忘初心',
];

function getWord(wordList: string[]): string {
  const index = Math.floor(Math.random() * 100);
  if (wordList[index]) {
    return words[index];
  }
  return getWord(wordList);
}

Component({
  data: {
    word: '',
  },
  ready() {
    const db = wx.cloud.database();
    db.collection('waring').get({
      success: (res) => {
        this.setData({
          word: getWord(res.data.map((item: any) => item.text)),
        });
      },
    });
  }
})
