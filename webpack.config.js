const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const dotenv = require("dotenv");

module.exports = async (env, args) => {
  let isDevelopment = true;

  let envPath = "";
  switch (env.flavor) {
    case "DEV":
      envPath = "./envs/dev.env";
      break;
    case "UAT":
      isDevelopment = false;
      envPath = "./envs/uat.env";
      break;
    case "PROD":
      isDevelopment = false;
      envPath = "./envs/prod.env";
      break;
  }
  // console.log(".env path:", envPath);

  const dotEnvConfig = dotenv.config({
    path: envPath,
  });

  return {
    mode: isDevelopment ? "development" : "production",
    entry: ["./app/index.tsx", "./app/index.css"],
    devtool: "source-map",
    devServer: {
      static: "./build",
      port: dotEnvConfig.parsed.PORT,
      open: [`http://localhost:${dotEnvConfig.parsed.PORT}`],
    },
    output: {
      clean: true,
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, `./build`),
    },
    resolve: {
      extensions: [".ts", ".js", ".tsx"],
      // fallback: { crypto: false },
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = module
                .identifier()
                .split("/")
                .reduceRight((item) => item);
              const allChunksNames = chunks.map((item) => item.name).join("~");
              return `vendors/${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            },
            chunks: "all",
          },
        },
      },
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./app/index.html",
        favicon: "./app/assets/favicon.png",
      }),
      new Dotenv({
        path: envPath,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
            },
          },
        },
        { test: /\.tsx?$/, use: "ts-loader" },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            // "sass-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: { outputPath: "images" },
            },
          ],
        },
      ],
    },
  };
};
