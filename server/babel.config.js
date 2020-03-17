/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = api => {
  api.cache(true);

  return {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.json'],
          root: ['./src'],
          alias: {
            '*': './src/*',
          },
        },
      ],
      ['@babel/plugin-proposal-class-properties', { spec: true }],
    ],
  };
};
