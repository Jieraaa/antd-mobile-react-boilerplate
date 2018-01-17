import React from 'react';
import { Badge } from 'antd-mobile';
import { browserHistory } from 'react-router';
import './Header.css';
import Const from './../../utils/Const';
import eventProxy from './../../utils/eventProxy';
const menu = Const.menu;

export default class LayoutBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

	static propTypes = {
		children: React.PropTypes.node,
	};

	constructor() {
		super();
		this.state = {
			menuList: [],
			tabs: [],
			currentMenuIndex: 0, // 当前一级索引
			currentPath: [], // 二级地址
			tabIndexArr: [], // 当前二级地址索引数组
		};
	}

	componentWillMount() {
		const pathname = browserHistory.getCurrentLocation().pathname;
		const pathArr = pathname.split('/');
		const menuList = [];
		let activeMenuIndex = 0;
		if (pathArr.length === 3) {
			const menuPath = pathArr[1];// 一级目录
			const activeMenu = menu.filter(item => item.path === menuPath)[0];
			activeMenuIndex = activeMenu ? activeMenu.key : 0;
		}
		for (let i = 0; i < menu.length; i++) {
			menuList.push({
				title: menu[i].title,
				active: i === activeMenuIndex,
			});
		}
		this.setState({ menuList });
	}

	handleClick = (key) => {
		const { menuList } = this.state;
		const newMenuList = Object.create(menuList);
		for (let i = 0; i < newMenuList.length; i++) {
			newMenuList[i].active = key === i;
		}
		this.setState({menuList: newMenuList}, () => {
			eventProxy.trigger('menu', key);
		});
	}

	render() {
		const { menuList } = this.state;
		return (
			<div>
				<div className="header-box">
					<div className="header-left">
						<div className="header-avatar">
							<Badge dot>
								<img src="http://oss-cn-hangzhou.aliyuncs.com/public-cli/free/f1b2ac45727b7282ceda47bdabf2319d1516082764.jpg" alt="user avatar"/>
							</Badge>
						</div>
						<div className="header-name">青聪岁悦</div>
					</div>
					<div className="header-right">
						{
							menuList.map((item, key) =>
								<div
									className={`header-menu ${item.active ? 'active' : ''}`} key={key}
									onClick={() => this.handleClick(key)}
								>
									<div className="header-menu-name">{item.title}</div>
									{item.active ? <div className="triangleUp"/> : <div className="triangleUpTransparent"/>}
								</div>
							)
						}
					</div>
				</div>
			</div>
		);
	}
}
