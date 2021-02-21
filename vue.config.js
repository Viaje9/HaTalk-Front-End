module.exports = {
  devServer: {
    // proxy: 'http://localhost:8080',
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
           @import "@/assets/sass/main.scss";
        `,
      },
    },
  },
};
