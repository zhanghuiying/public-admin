module.exports = {
    lintOnSave: false,
    // publicPath: '/',
    // outputDir: 'dist',
    // assetsDir: 'static',
    // configureWebpack: {
    // // provide the app's title in webpack's name field, so that
    // // it can be accessed in index.html to inject the correct title.
    // // name: name,
    // // resolve: {
    // //   alias: {
    // //     '@': resolve('src')
    // //   }
    // // }
    // },
    devServer: {
    proxy: {
        '/api': {
            target: 'http://218.77.106.71:2403',
            // 匹配所有的以/api开头的换成 ''
            pathRewrite: { '^/api':''},
            //ws: true,  // 用于支持websocket
            changeOrigin: true, // 伪装同源
            }
        }
    }
}



