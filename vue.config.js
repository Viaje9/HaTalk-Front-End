console.log(process.env);
module.exports = {
  publicPath: process.env.NODE_ENV === '/',
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
