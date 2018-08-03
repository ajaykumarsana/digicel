const fs = require('fs-extra');
const path = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const licensePlugin = require('license-webpack-plugin').LicenseWebpackPlugin;
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');

const { NoEmitOnErrorsPlugin, EnvironmentPlugin, HashedModuleIdsPlugin } = require('webpack');
const { GlobCopyWebpackPlugin, BaseHrefWebpackPlugin, SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin, ModuleConcatenationPlugin, UglifyJsPlugin } = require('webpack').optimize;
const { AngularCompilerPlugin } = require ('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline", "polyfills", "sw-register", "scripts", "styles", "vendor", "main"];
const deployUrl = "";

module.exports = function (env) {
  const baseHref = (env && env.baseHref) || '/';
  const provider = (env && env.provider);
  // Only minimizeCss in single provider builds
  // minification silently breaks the styles when bundling >7 providers
  const minimizeCss = !!provider;
  const buildTime = new Date();
  const version = JSON.parse(fs.readFileSync('package.json')).version;
  const postcssPlugins = function () {
    // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
    const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
    const minimizeOptions = {
      autoprefixer: false,
      safe: true,
      mergeLonghand: false,
      discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
    };
    return [
      postcssUrl({
        url: (URL) => {
          // Only convert root relative URLs, which CSS-Loader won't process into require().
          if (!URL.startsWith('/') || URL.startsWith('//')) {
            return URL;
          }
          if (deployUrl.match(/:\/\//)) {
            // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
            return `${deployUrl.replace(/\/$/, '')}${URL}`;
          }
          else if (baseHref.match(/:\/\//)) {
            // If baseHref contains a scheme, include it as is.
            return baseHref.replace(/\/$/, '') +
              `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
          }
          else {
            // Join together base-href, deploy-url and the original URL.
            // Also dedupe multiple slashes into single ones.
            return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
          }
        }
      }),
      autoprefixer(),
    ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
  };

  const webpackConfig = {
    "resolve": {
      "extensions": [
        ".ts",
        ".js"
      ],
      "modules": [
        "./node_modules",
        "./node_modules"
      ],
      "symlinks": true
    },
    "resolveLoader": {
      "modules": [
        "./node_modules",
        "./node_modules"
      ]
    },
    "entry": {
      "main": [
        "./src/main.ts"
      ],
      "polyfills": [
        "./src/polyfills.ts"
      ],
      "scripts": [
        "script-loader!./src/vendor/exsip-1.5.908.min.js"
      ],
      "styles": [
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./src/styles/app.scss"
      ]
    },
    "output": {
      "path": path.join(process.cwd(), "dist"),
      "filename": "[name].[chunkhash:20].bundle.js",
      "chunkFilename": "[id].[chunkhash:20].chunk.js"
    },
    "module": {
      "rules": [
        {
          "enforce": "pre",
          "test": /\.js$/,
          "loader": "source-map-loader",
          "exclude": [
            /\.ngfactory\.js$/, /\.ngstyle\.js$/
          ]
        },
        {
          "test": /\.html$/,
          "loader": "raw-loader"
        },
        {
          "test": /\.(eot|svg|cur)$/,
          "loader": "file-loader?name=[name].[hash:20].[ext]"
        },
        {
          "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
          "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
        },
        {
          "exclude": [
            path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
            path.join(process.cwd(), "src/styles/app.scss")
          ],
          "test": /\.css$/,
          "use": [
            "exports-loader?module.exports.toString()",
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            }
          ]
        },
        {
          "exclude": [
            path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
            path.join(process.cwd(), "src/styles/app.scss")
          ],
          "test": /\.scss$|\.sass$/,
          "use": [
            "exports-loader?module.exports.toString()",
            {
              "loader": "css-loader",
              "options": {
                "sourceMap": false,
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            },
            {
              "loader": "sass-loader",
              "options": {
                "sourceMap": false,
                "precision": 8,
                "includePaths": [
                  path.join(process.cwd(), "src/styles")
                ]
              }
            }
          ]
        },
        {
          "include": [
            path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
            path.join(process.cwd(), "src/styles/app.scss")
          ],
          "test": /\.css$/,
          "loaders": ExtractTextPlugin.extract({
            "use": [
              {
                "loader": "css-loader",
                "options": {
                  "sourceMap": false,
                  "importLoaders": 1
                }
              },
              {
                "loader": "postcss-loader",
                "options": {
                  "ident": "postcss",
                  "plugins": postcssPlugins
                }
              }
            ],
            "publicPath": ""
          })
        },
        {
          "include": [
            path.join(process.cwd(), "node_modules/bootstrap/dist/css/bootstrap.min.css"),
            path.join(process.cwd(), "src/styles/app.scss")
          ],
          "test": /\.scss$|\.sass$/,
          "loaders": ExtractTextPlugin.extract({
            "use": [
              {
                "loader": "css-loader",
                "options": {
                  "sourceMap": false,
                  "importLoaders": 1
                }
              },
              {
                "loader": "postcss-loader",
                "options": {
                  "ident": "postcss",
                  "plugins": postcssPlugins
                }
              },
              {
                "loader": "sass-loader",
                "options": {
                  "sourceMap": false,
                  "precision": 8,
                  "includePaths": [
                    path.join(process.cwd(), "src/styles")
                  ]
                }
              }
            ],
            "publicPath": ""
          })
        },
        {
          "test": /\.ts$/,
          "use": [
            "@ngtools/webpack"
          ]
        }
      ]
    },
    "plugins": [
      new NoEmitOnErrorsPlugin(),
      new GlobCopyWebpackPlugin({
        "patterns": [
          "assets",
          "favicon.ico",
          "images"
        ],
        "globOptions": {
          "cwd": path.join(process.cwd(), "src"),
          "dot": true,
          "ignore": "**/.gitkeep"
        }
      }),
      new ProgressPlugin(),
      new CircularDependencyPlugin({
        "exclude": /(\\|\/)node_modules(\\|\/)/,
        "failOnError": false
      }),
      new HtmlWebpackPlugin({
        "template": "!!ejs-loader!./src/index.html",
        "filename": "./index.html",
        "comment": `Version ${version}. Built ${buildTime} for ${provider ? provider : 'all providers'}`,
        "hash": false,
        "inject": true,
        "compile": true,
        "favicon": false,
        "minify": {
          "caseSensitive": true,
          "collapseWhitespace": true,
          "keepClosingSlash": true
        },
        "cache": true,
        "showErrors": true,
        "chunks": "all",
        "excludeChunks": [],
        "title": "Webpack App",
        "xhtml": true,
        "chunksSortMode": function sort(left, right) {
          let leftIndex = entryPoints.indexOf(left.names[0]);
          let rightindex = entryPoints.indexOf(right.names[0]);
          if (leftIndex > rightindex) {
            return 1;
          }
          else if (leftIndex < rightindex) {
            return -1;
          }
          else {
            return 0;
          }
        }
      }),
      new BaseHrefWebpackPlugin({
        "baseHref": baseHref
      }),
      new CommonsChunkPlugin({
        "name": [
          "inline"
        ],
        "minChunks": null
      }),
      new CommonsChunkPlugin({
        "name": [
          "vendor"
        ],
        "minChunks": (module) => {
          return module.resource
            && (module.resource.startsWith(nodeModules)
              || module.resource.startsWith(genDirNodeModules)
              || module.resource.startsWith(realNodeModules));
        },
        "chunks": [
          "main"
        ]
      }),
      new CommonsChunkPlugin({
        "name": [
          "main"
        ],
        "minChunks": 2,
        "async": "common"
      }),
      new ExtractTextPlugin({
        "filename": "[name].[contenthash:20].bundle.css"
      }),
      new SuppressExtractedTextChunksWebpackPlugin(),
      new licensePlugin({
        "pattern": /^(MIT|ISC|BSD.*)$/
      }),
      new EnvironmentPlugin({
        "NODE_ENV": "production"
      }),
      new HashedModuleIdsPlugin({
        "hashFunction": "md5",
        "hashDigest": "base64",
        "hashDigestLength": 4
      }),
      new ModuleConcatenationPlugin({}),
      new UglifyJsPlugin({
        "mangle": {
          "screw_ie8": true
        },
        "compress": {
          "screw_ie8": true,
          "warnings": false
        },
        "output": {
          "ascii_only": true
        },
        "sourceMap": false,
        "comments": false
      }),
      new AngularCompilerPlugin({
        "mainPath": "main.ts",
        "replaceExport": false,
        "hostReplacementPaths": {
          "environments/environment.ts": "environments/environment.prod.ts"
        },
        "exclude": [],
        "tsConfigPath": "src/tsconfig.app.json"
      })
    ],
    "node": {
      "fs": "empty",
      "global": true,
      "crypto": "empty",
      "tls": "empty",
      "net": "empty",
      "process": true,
      "module": false,
      "clearImmediate": false,
      "setImmediate": false
    },
    "devServer": {
      "historyApiFallback": true
    }
  };

  if (provider) {
    console.log('Building for ', provider);
    const mixins = path.join(process.cwd(), "src/styles/_mixins.scss");
    fs.copySync(mixins,
      path.join(process.cwd(), "src/styles/_mixins-backup.scss")
    );
    const mixinsData = fs.readFileSync(mixins, 'utf8');

    fs.writeFileSync(
      mixins,
      mixinsData.replace(/\$themes: \(.*/, `$themes: ("${provider}": $${provider});`),
      'utf8');

    const providerExports = path.join(process.cwd(), "src/styles/_provider-exports.scss");
    fs.copySync(providerExports,
      path.join(process.cwd(), "src/styles/_provider-exports-backup.scss")
    );
    const providerExportsData = fs.readFileSync(providerExports, 'utf8');

    fs.writeFileSync(
      providerExports,
      providerExportsData.replace(/(.*\n?){1,}/, `@import '${provider}/exports';`),
      'utf8');

    webpackConfig['module']['rules'].unshift(
      {
        "enforce": "pre",
        "test": /providers\/index\.ts$/,
        "loader": "string-replace-loader",
        "query": {
          "search": "(.*\n?){1,}",
          "flags": "",
          "replace": `export * from './${provider}';`,
          "strict": true
        }
      },
      {
        "enforce": "pre",
        "test": /cms\.service\.ts$/,
        "loader": "string-replace-loader",
        "query": {
          "search": "private providers.*",
          "flags": "",
          "replace": `private providers = ['${provider}'];`,
          "strict": true
        }
      }
    );
  }

  return webpackConfig;
}