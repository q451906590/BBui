var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const cssloader = {
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
}
const sassloader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  }
}
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true
  }
}
module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'test.min.js',
    library: 'uitest',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [cssloader,postcssLoader],
              fallback: 'vue-style-loader'
            }),
            scss: ExtractTextPlugin.extract({
              use: [cssloader, sassloader, postcssLoader],
              fallback: 'vue-style-loader'
            }),
            postcss: ExtractTextPlugin.extract({
              use: [cssloader, postcssLoader],
              fallback: 'vue-style-loader'
            })
          },
          cssSourceMap: true,
          cacheBusting: true,
          transformToRequire: {
            img: 'src',
            image: 'xlink:href',
            source: 'src'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('./', 'img/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),
    new ExtractTextPlugin({
      filename: path.posix.join('./', 'css/test.main.css'),
      allChunks: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: { inline: false }
      }
    })
  ]
}