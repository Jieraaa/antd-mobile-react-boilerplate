const Const = {
	cookie: {
		ID: 'id',
	},

	route: {
		LOGIN: '/login',
		HOME: '/',
	},

	menu: [{
		title: '商城',
		path: 'menu0',
		key: 0,
		subMenu: [
			{title: '头条', path: 'tab0', key: 0},
			{title: '热门', path: 'tab1', key: 1},
			{title: '直播', path: 'tab2', key: 2},
			{title: '不可描述', path: 'tab3', key: 3},
		],
	}, {
		title: '社区',
		path: 'menu1',
		key: 1,
		subMenu: [
			{title: '答题', path: 'tab0', key: 0},
			{title: '翻译', path: 'tab1', key: 1},
			{title: '音乐', path: 'tab2', key: 2},
			{title: '科技', path: 'tab3', key: 3},
			{title: '段子', path: 'tab4', key: 4},
			{title: '笑话', path: 'tab5', key: 5},
			{title: '常识', path: 'tab6', key: 6},
		],
	}],

};

export default Const;
