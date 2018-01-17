// 这样放着你可以跳转到的页面
// 这包含所有的应用组件，当然也包含导航栏等
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import {getAsyncInjectors} from 'utils/asyncInjectors';
import cookie from 'react-cookies';
import Layout from 'components/Layout';

const errorLoading = (err) => {
	console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
	cb(null, componentModule.default);
};

const getLoginState = () => cookie.load('id');

// getComponent对应于以前的 component 属性，但是这个方法是异步的，也就是当路由匹配时，才会调用这个方法。

export default function createRoutes(store) {
	// Create reusable async injectors using getAsyncInjectors factory
	const {injectReducer, injectSagas} = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

	return [
		{
			path: '/',
			name: 'home',
			onEnter(nextState, replace) {
				!getLoginState() && replace('/login');
				replace('/menu0');
			},
		}, {
			path: '/login',
			name: 'login',
			getComponent(nextState, cb) {
				const importModules = Promise.all([
					import('containers/Login'),
				]);

				const renderRoute = loadModule(cb);

				importModules.then(([component]) => {
					renderRoute(component);
				});

				importModules.catch(errorLoading);
			},
		}, {
			path: '/menu0',
			component: Layout,
			childRoutes: [
				{
					path: 'tab0',
					getComponent(nextState, cb) {
						const importModules = Promise.all([
							import('containers/HomePage'),
						]);

						const renderRoute = loadModule(cb);

						importModules.then(([component]) => {
							renderRoute(component);
						});

						importModules.catch(errorLoading);
					},
				},
				{
					path: 'tab1',
					getComponent(nextState, cb) {
						const importModules = Promise.all([
							import('containers/Demo'),
						]);

						const renderRoute = loadModule(cb);

						importModules.then(([component]) => {
							renderRoute(component);
						});

						importModules.catch(errorLoading);
					},
				},
				{
					path: '*',
					name: 'notfound',
					getComponent(nextState, cb) {
						import('containers/NotFoundPage')
							.then(loadModule(cb))
							.catch(errorLoading);
					},
				},
			],
			onEnter(nextState, replace) {
				!getLoginState() && replace('/login');
			},
		}, {
			path: '/menu1',
			component: Layout,
			childRoutes: [
				{
					path: 'tab0',
					getComponent(nextState, cb) {
						const importModules = Promise.all([
							import('containers/HomePage'),
						]);

						const renderRoute = loadModule(cb);

						importModules.then(([component]) => {
							renderRoute(component);
						});

						importModules.catch(errorLoading);
					},
				},
				{
					path: 'tab1',
					getComponent(nextState, cb) {
						const importModules = Promise.all([
							import('containers/Demo'),
						]);

						const renderRoute = loadModule(cb);

						importModules.then(([component]) => {
							renderRoute(component);
						});

						importModules.catch(errorLoading);
					},
				},
				{
					path: '*',
					name: 'notfound',
					getComponent(nextState, cb) {
						import('containers/NotFoundPage')
							.then(loadModule(cb))
							.catch(errorLoading);
					},
				},
			],
			onEnter(nextState, replace) {
				!getLoginState() && replace('/login');
			},
		}, {
			path: '*',
			name: 'notfound',
			getComponent(nextState, cb) {
				import('containers/NotFoundPage')
					.then(loadModule(cb))
					.catch(errorLoading);
			},
		},
	];
}
