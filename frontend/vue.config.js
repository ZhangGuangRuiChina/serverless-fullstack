module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        ENV: require('path').resolve(__dirname, 'env.js'),
      },
    },
    externals: {
      env: 'env'
    },
    plugins: [],
  },
  // webpack-dev-server 相关配置
  devServer: {
    // open: process.platform === 'darwin',
    //将服务启动后默认打开浏览器
    open: true,
    host: 'localhost',
    port: 8888,
    https: false,
    hotOnly: false,
    proxy: {// 设置代理
        '/sls': {
            target: 'https://service-nagusheq-1306209038.gz.apigw.tencentcs.com/release',
            changeOrigin: true,
            pathRewrite: {
                '^/sls': '/'
            }
        }
    },
    before: () => {}
  },
};
