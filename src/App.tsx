import { Suspense, useLayoutEffect, useState } from 'react'
import { RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd-mobile'
import zhCN from 'antd-mobile/es/locales/zh-CN'

import { deepClone } from './utils'

import { baseRoute, staticRoutes } from './router'
import store from './store'

import GlobalStyle from './style'
import LoadSkeleton from './components/LoadSkeleton'

const App = () => {
	const [ruotes, setRoutes] = useState(baseRoute)
	useLayoutEffect(() => {
		// 鉴权结束后，router为筛选后的可用路由，随后在baseRouter内进行赋值
		setFilterRoutes('/', staticRoutes)
	}, [])

	const setFilterRoutes = (base: string, routes: RouteObject[]) => {
		const findIndex = baseRoute.findIndex((r) => r.path === base)
		const cloneRoutes = deepClone(baseRoute)
		if (findIndex >= 0) {
			cloneRoutes[findIndex].children = routes
		}

		setRoutes(cloneRoutes)
	}

	return (
		<>
			<Provider store={store}>
				{/* 国际化，默认中简 */}
				<ConfigProvider locale={zhCN}>
					<GlobalStyle />
					<Suspense fallback={<LoadSkeleton />}>
						{/* 避免重复渲染 */}
						{ruotes[0].children ? (
							<RouterProvider router={createHashRouter(ruotes)} />
						) : null}
					</Suspense>
				</ConfigProvider>
			</Provider>
		</>
	)
}

export default App
