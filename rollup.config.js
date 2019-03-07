import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import image from 'rollup-plugin-img'; import json from 'rollup-plugin-json'
import pkg from './package.json'

export default {
  input: 'src/lib/index.js',
  output: [
    {
      file: pkg.main,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    json({
      exclude: ['node_modules/foo/**', 'node_modules/bar/**'],
      preferConst: true,
      indent: '  ',
      compact: true,
      namedExports: true,
    }),
    postcss({
      plugins: [],
      minimize: true,
      sourceMap: 'inline',
    }),
    external({
      includeDependencies: false,
    }),
    url(),
    svgr(),
    image({
      extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
      exclude: 'node_modules/**',
    }),
    resolve(),
    babel({
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        'transform-react-remove-prop-types',
      ],
      exclude: 'node_modules/**',
    }),
    commonjs(),
  ],
}
