'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = defaultSettings.title || 'Vue shendy'

module.exports = {
    lintOnSave: false,
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    // lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
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



