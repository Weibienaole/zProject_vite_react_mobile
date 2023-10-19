import { Button, ErrorBlock } from 'antd-mobile'

import { ReactComponent as NotFoundSvg } from '@/assets/404.svg'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate()
	return (
		<NotFoundSty>
			<ErrorBlock
				image={<NotFoundSvg className="svg" />}
				fullPage
				title="页面丢失"
				description={<span>没有找到您需要的页面</span>}
			>
				<Button
					style={{ fontSize: '2rem' }}
					color="primary"
					shape="rounded"
					onClick={() => navigate(-1)}
				>
					回到上一页
				</Button>
			</ErrorBlock>
		</NotFoundSty>
	)
}

export default NotFound

const NotFoundSty = styled.div`
	.svg {
		width: 60%;
		margin: 0 auto;
	}
	.adm-error-block-description {
		margin-top: 0;
	}
`
