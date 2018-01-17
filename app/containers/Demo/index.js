import React from 'react';
import Api from './../../utils/Api';

export default class HomePage extends React.PureComponent {

	handleClick() {
		const username = 'merrier';
		const path = Api.assemblePath(Api.path.getUserRepo, username);
		const data = { type: 'all', sort: 'updated' };
		const url = Api.assembleUrl(Api.host.main, path, data);
		Api.request(url, (res) => {
			console.info(res);
		});
	}

	render() {
		return (
			<div>
				this is Demo
				<input type="button" onClick={() => this.handleClick()} value="点我可以发请求，打开console查看详情" />
			</div>
		);
	}

}
