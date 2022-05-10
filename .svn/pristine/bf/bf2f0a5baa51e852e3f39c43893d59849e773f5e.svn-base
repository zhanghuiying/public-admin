module.exports = {
    lintOnSave: false,
    devServer: {
    proxy: {
        '/api': {
            // target: 'http://218.77.106.71:2403',
            target: 'http://192.168.2.230:2303',
            pathRewrite: { '^/api':''},
            //ws: true,  // 用于支持websocket
            changeOrigin: true, // 伪装同源
            }
        }
    }
}



