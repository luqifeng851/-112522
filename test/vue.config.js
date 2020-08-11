module.exports = {
  lintOnSave: false,
  //配置代理服务器
  devServer: {
    proxy: {
      //接口暗号
      '/hehe': {
        target: "http://ustbhuangyi.com", //要转发的目标网址
        changeOrigin: true,
        pathRewrite: {
          "^/hehe": ''
        }
      }
    }
  }
}
