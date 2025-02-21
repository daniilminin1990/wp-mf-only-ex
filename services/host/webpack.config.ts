import webpack from "webpack"

// import {buildWebpack} from "./config/build/buildWebpack";
// import {BuildMode, BuildPaths, BuildPlatform} from "./config/build/types/types";
import {BuildMode, BuildPaths, BuildPlatform, buildWebpack} from "@packages/build-config";
import packageJson from './package.json'

import path from "path";


interface EnvVariables {
	mode?: BuildMode,
	port?: number,
	analyzer?: boolean,
	platform?: BuildPlatform,
	SHOP_REMOTE_URL?: string,
	ADMIN_REMOTE_URL?: string
}

export default (env: EnvVariables) => {

	// const isDev = env.mode === 'development'
	const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001'
	const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002'

	const paths: BuildPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public')
	}

	const config : webpack.Configuration = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? 'development',
		paths,
		analyzer: env.analyzer,
		platform: env.platform ?? 'desktop'
	})

	config.plugins.push(new webpack.container.ModuleFederationPlugin({
		name: 'host', // Соответственно host
		filename: 'remoteEntry.js',
		// exposes: {
		// 	// './App': path.resolve(paths.src, 'components', 'App.tsx', 'Router.tsx'),
		// 	// './Router': './src/components/App.tsx/Router.tsx',
		// 	'./Router': './src/router/Router.tsx',
		// },
		remotes: {
			shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
			admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
		},
		shared: {
			...packageJson.dependencies,
			react: {
				eager: true,
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