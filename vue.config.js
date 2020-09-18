const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  publicPath: '/web/',
  outputDir:'../../web',
  // assetsDir:'../Public/web',
  devServer : {
    proxy:{
      '/Home':{
        // target : 'http://192.168.20.19:82',
        target : 'http://debugfront.weizaojiao.cn',
        // target : 'http://front.weizaojiao.cn',
        changeOrigin:true,
        pathRewrite:{
          '^/Home': '/Home'
        }
      },
    },
    host:'0.0.0.0',
    disableHostCheck: true,
    // port:8080,
    open:true,
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            browsersList: ['Android >= 4.0', 'iOS >= 10']
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
          })
        ]
      },
      less: {
        // modifyVars: {
        //   hack:`true:@import "./src/static/css/resetvant.less"`
        // }
        modifyVars: {
          blue:'#03a9f4'
        }
      }
    }
  },
}