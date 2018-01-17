import React from 'react';
import { Tabs } from 'antd-mobile';
import { browserHistory } from 'react-router';
import Const from './../../utils/Const';
import eventProxy from './../../utils/eventProxy';
import './TabBar.css';
const menu = Const.menu;

export default class TabBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

	static propTypes = {
		children: React.PropTypes.node,
	};

	constructor() {
		super();
		this.state = {
			tabs: [],
			currentMenuIndex: 0, // 当前一级索引
			currentPath: [], // 二级地址
			tabIndexArr: [], // 当前二级地址索引数组
		};
	}

	componentWillMount() {
		const pathname = browserHistory.getCurrentLocation().pathname;
		const pathArr = pathname.split('/');
		const tabs = [];
		const tabIndexArr = [];
		for (let i = 0; i < menu.length; i++) {
			tabs.push(menu[i].subMenu);
			tabIndexArr.push(0);
		}
		let currentMenuIndex = 0; // 一级目录索引
		if (pathArr.length === 3) {
			const menuPath = pathArr[1];// 一级目录
			const tabPath = pathArr[2];// 二级目录
			try {
				const filterTabs = menu.filter(item => item.path === menuPath)[0];
				const filterTab = filterTabs.subMenu.filter(item => item.path === tabPath)[0];
				currentMenuIndex = filterTabs.key;
				tabIndexArr[currentMenuIndex] = filterTab.key;
			} catch (e) {
				// browserHistory.push(`/${menu[0].path}/${menu[0].subMenu[0].path}`);
			}
		} else {
			// browserHistory.push(`/${menu[0].path}/${menu[0].subMenu[0].path}`);
		}
		this.setState({ tabs, currentMenuIndex, tabIndexArr, children: this.props.children });
	}

	componentDidMount() {
		const that = this;
		// TODO： 切换一级标签 事件推送 建议改为Redux
		eventProxy.on('menu', (currentMenuIndex) => {
			that.setState({ currentMenuIndex }, () => {
				const { tabIndexArr } = that.state;
				const currentMenu = menu[currentMenuIndex];
				const currentTabIndex = tabIndexArr[currentMenuIndex];
				const currentTabs = currentMenu.subMenu;
				browserHistory.push(`/${currentMenu.path}/${currentTabs[currentTabIndex].path}`);
			});
		});
	}

	handleChange = (tabItem, index) => {
		// 切换二级标签
		const { currentMenuIndex, tabIndexArr } = this.state;
		const newTabIndexArr = [];
		for (let i = 0; i < tabIndexArr.length; i++) {
			if (currentMenuIndex === i) {
				newTabIndexArr.push(index);
			} else {
				newTabIndexArr.push(tabIndexArr[i]);
			}
		}
		const currentMenu = menu[currentMenuIndex];
		const currentTabIndex = newTabIndexArr[currentMenuIndex];
		const currentSubMenu = currentMenu.subMenu;
		browserHistory.push(`/${currentMenu.path}/${currentSubMenu[currentTabIndex].path}`);
		this.setState({
			tabIndexArr: newTabIndexArr,
		});
	}

	render() {
		const { tabs, currentMenuIndex, tabIndexArr } = this.state;
		return (
			<div>
				{
					tabs.map((tab, key) =>
						<div key={key} style={{ display: key === currentMenuIndex ? 'block' : 'none'}}>
							<Tabs
								tabs={tab}
								onChange={this.handleChange}
								page={tabIndexArr[currentMenuIndex]}
							/>
						</div>
					)
				}
			</div>
		);
	}
}
