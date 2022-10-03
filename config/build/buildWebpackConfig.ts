import {BuildOptions} from "./types/config";
import webpack from "webpack";
import {buildResolvers} from "./buildResolvers";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildDevServer} from "./buildDevServer";


export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {

    const {paths, mode, isDev} = options;

    return {
        mode: mode,
        entry: paths.entry,
        output: {
            path: paths.build,
            filename: "[name].[contenthash].js",
            clean: true
        },
        resolve: buildResolvers(),
        module: {
            rules: buildLoaders(),
        },
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}