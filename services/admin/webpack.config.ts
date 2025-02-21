import webpack from "webpack"

// import {buildWebpack} from "./config/build/buildWebpack";
// import {BuildMode, BuildPaths, BuildPlatform} from "./config/build/types/types";
import {BuildMode, BuildPaths, BuildPlatform, buildWebpack} from "@packages/build-config";

import path from "path";
import packageJson from './package.json'

interface EnvVariables {
	mode?: BuildMode,
	port?: number,
	analyzer?: boolean,
	platform?: BuildPlatform
}

export default (env: EnvVariables) => {

	// const isDev = env.mode === 'development'

	const paths: BuildPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public')
	}

	const config : webpack.Configuration = buildWebpack({
		port: env.port ?? 3002,
		mode: env.mode ?? 'development',
		paths,
		analyzer: env.analyzer,
		platform: env.platform ?? 'desktop'
	})

	config.plugins.push(new webpack.container.ModuleFederationPlugin({
		name: 'admin', // Меняем имя на admin
		filename: 'remoteEntry.js',
		exposes: {
			// './Router': './src/components/App.tsx/Router.tsx',
			'./Router': './src/router/Router.tsx', // Путь до роутера такой же. Если бы он был какой-то другой, или мы бы хотели другой файл наружу отдать, то здесь необходимо было бы поменять, но Router у нас в обоих приложениях сделан по одинаковому принципу, поэтому так
		},
		shared: {
			...packageJson.dependencies,
			react: {
				eager: true, // Помним что это противоположность lazy = подгружается сразу
				requiredVersion: packageJson.dependencies['react'],
			},
			'react-router-dom': {
				eager: true,
				requiredVersion: packageJson.dependencies['react-router-dom'],
			},
			'react-dom': {
				eager: true,
				requiredVersion: packageJson.dependencies['react-dom'],
			}
		}
	}))

	return config
}