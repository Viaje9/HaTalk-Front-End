module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/HaTalk/' : '/',
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
