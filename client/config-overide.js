// config-overrides.js
config.module.rules.forEach((item) => {
  if (item.oneOf) {
    item.oneOf.forEach((item) => {
      item.use?.forEach((item) => {
        if (
          item.loader?.includes("postcss-loader") &&
          !item?.options?.postcssOptions
        ) {
          const postcssOptions = item.options;
          item.options = { postcssOptions };
        }
      });
    });
  }
});
