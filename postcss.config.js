/* CRA يحقن tailwindcss + postcss-preset-env داخل webpack ويتجاهل هذا الملف عادةً؛
   يبقى صحيحاً لأدوات أخرى وللمستقبل. */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
