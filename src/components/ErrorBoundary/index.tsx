import styled from 'styled-components'
import { copyToClipboard } from 'zzy-javascript-devtools'
import { ErrorBlock } from 'antd-mobile'
import globalSty from '@/utils/global-style'

const ErrorBoundary = () => {
	const copyLink = () => {
		copyToClipboard(window.location.href)
	}
	return (
		<ErrorSty className="ErrorBoundary_Component">
			<ErrorBlock status="default" fullPage>
				{import.meta.env.MODE === 'development' ? (
					<span className="click" onClick={copyLink}>
						点击复制当前地址
					</span>
				) : null}
			</ErrorBlock>
		</ErrorSty>
	)
}

export default ErrorBoundary

const ErrorSty = styled.div`
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	.adm-error-block {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.click {
		${globalSty.extendClick()};
		font-size: 13px;
		color: #d10303;
	}
`
