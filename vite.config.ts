import { join, resolve } from 'path'
import {
	defineConfig,
	normalizePath,
	mergeConfig,
	UserConfig,
	loadEnv
} from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint' // eslint
import svgr from 'vite-plugin-svgr' // svg组件化
import autoprefixer from 'autoprefixer'
import pxToRem from 'postcss-pxtorem'

import prodConfig from './config/prod.config'
import devConfig from './config/dev.config'

const transformNormalizePath = (fn, ...val) => {
	return normalizePath(fn(...val))
}

export default defineConfig((props) => {
	const { mode } = props
	const isProd = mode === 'production'
	const root = process.cwd()
	const env = loadEnv(mode, root)
	const baseConfig: UserConfig = {
		root,
		mode,
		base: '',
		envDir: transformNormalizePath(resolve, __dirname, './config'), // .env 文件的位置
		resolve: {
			alias: {
				'@': transformNormalizePath(join, __dirname, './src')
			}
		},
		publicDir: transformNormalizePath(join, __dirname, './public'),
		server: {
			port: 8000
		},
		css: {
			postcss: {
				plugins: [
					autoprefixer({
						overrideBrowserslist: ['>1%', 'not dead'],
						grid: true
					}),
					pxToRem({
						rootValue: env.VITE_PX_TO_REM,
						// 需要转换的CSS属性,转换src下全部
						propList: ['@/**'],
						mediaQuery: false, // 禁止媒体查询转换px
						minPixelValue: 0.5 // 最小转换数值
					})
				]
			}
		},
		optimizeDeps: {
			// 强制进行预构建
			include: ['react', 'react-dom', 'antd-mobile']
		},
		build: {
			target: 'es6',
			reportCompressedSize: false, // 禁用 gzip 压缩大小报告
			cssTarget: 'chrome61' // 兼容安卓端微信的 webview,防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式，出现样式问题。
		},
		preview: {
			port: 8040
		},
		plugins: [
			react({
				babel: {
					plugins: [
						// 适配 styled-component
						'babel-plugin-styled-components'
					]
				}
			}),
			viteEslint(),
			svgr()
		]
	}
	return mergeConfig(
		baseConfig,
		isProd ? prodConfig(props) : devConfig(props),
		false
	)
})
