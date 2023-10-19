import { Skeleton } from 'antd-mobile'

const LoadSkeleton = () => {
	return (
		<div>
			<Skeleton.Title animated />
			<Skeleton.Paragraph lineCount={5} animated />
			<br />
			<br />
			<br />
			<Skeleton.Title animated />
			<Skeleton.Paragraph lineCount={5} animated />
		</div>
	)
}

export default LoadSkeleton
