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
		port: env.port ?? 3001,
		mode: env.mode ?? 'development',
		paths,
		analyzer: env.analyzer,
		platform: env.platform ?? 'desktop'
	})

	config.plugins.push(new webpack.container.ModuleFederationPlugin({
		name: 'shop', // Название самого микрофронта (модуля)
		filename: 'remoteEntry.js', // Название файла, которое будет удаленно подключаться к хост контейнеру. Обычно его по умолчанию называют remoteEntry.js
		exposes: { // Самая важная опция -- тут указываем что мы хотим предоставить приложению-контейнеру (хосту)
			// './App': path.resolve(paths.src, 'components', 'App.tsx', 'Router.tsx'),
			// './Router': './src/components/App.tsx/Router.tsx',
			'./Router': './src/router/Router.tsx', // В данном случае наружу предоставляем Router -- это та часть приложения, которую мы будем внедрять в контейнер.
		},
		// Этот объект shared тоже можно было бы вынести в отдельную переменную, но это уже в этом примере лишнее. Просто знаем об этом
		shared: { // Указываем какие библиотеки будут общими между микрофронтом и хостом и какие будут шариться. Тут также можно указать требуемую версию
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