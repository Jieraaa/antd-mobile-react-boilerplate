import React from 'react';
import Header from './Header';
import TabBar from './TabBar';

export default class LayoutBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

	static propTypes = {
		children: React.PropTypes.node,
	};

	render() {
		return (
			<div>
				<Header/>
				<TabBar/>
				<div>
					{React.Children.toArray(this.props.children)}
				</div>
			</div>
		);
	}
}
