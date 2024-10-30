const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map' // 或者 'cheap-source-map', 'eval-source-map' 等
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://1.117.69.195:9999', // 后端服务的地址
        changeOrigin: true, // 是否改变源
        pathRewrite: { '^/api': '/api' }, // 路径重写规则
      },
    },
  },
})
