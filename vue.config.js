const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true
})
/*
module.exports = { 
  devServer: {
    proxy: {
      '/gallery/listform': { 
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: false,
      }, 
    },
  },
};
*/