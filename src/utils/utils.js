export default {
  install (Vue, options) {
    Vue.prototype.toUnicode = function (str) {
      var res = []
      for (var i = 0; i < str.length; i++) {
        res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4)
      }
      return '\\u' + res.join('\\u')
    }
    Vue.prototype.text2 = function () {
      // 全局函数2
      alert('执行成功2')
    }
  }
}
