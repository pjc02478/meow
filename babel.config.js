module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv', {
        'moduleName': 'react-native-dotenv',
      }
    ],
    [
      'module-resolver',
      {
        root: ['./src', '.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          assets: './assets',
          atom: './src/atom',
          component: './src/component',
          content: './src/content',
          context: './src/context',
          model: './src/model',
          styled: './src/styled',
          util: './src/util',
          page: './src/page',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-runtime',
        'react-native-paper/babel',
      ],
    },
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};