// import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toast } from 'antd-mobile'
import { JSB_init } from 'zzy-javascript-devtools'

import App from './App.tsx'
import '@/utils/rem.ts'

//基本配置
Toast.config({
	duration: import.meta.env.VITE_REQ_TIMEOUT,
	maskClickable: false
})

// JSbridge 初始化
JSB_init()

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<App />
	// </React.StrictMode>
)
