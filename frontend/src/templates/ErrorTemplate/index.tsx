import React from 'react';
import { useHistory } from 'react-router';
import { Layout, Title, SubTitle, Text, Button } from './style';

const ErrorTemplate: React.FC = () => {
	const history = useHistory();
	const handleClick = () => history.goBack();

	return (
		<Layout>
			<img src='/logo.png' alt='logo' />
			<Title>404</Title>
			<SubTitle>페이지가 존재하지 않습니다</SubTitle>
			<Text>주소를 잘못 입력하셨거나 요청하신 페이지가 삭제 / 이동되었을 수 있습니다</Text>
			<Button type='button' onClick={handleClick}>
				돌아가기
			</Button>
		</Layout>
	);
};

export default ErrorTemplate;
