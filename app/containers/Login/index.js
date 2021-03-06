/*
 * 登录页面
 */

import React from 'react';
import cookie from 'react-cookies';
import {browserHistory} from 'react-router';
import './login.css';
import Const from './../../utils/Const';

export default class Login extends React.PureComponent {
	handleLogin() {
		const opt = {
			path: '/',
		};
		// let username = this.refs["username"].value;
		// let password = this.refs["password"].value;
		cookie.save('id', 1, opt);
		browserHistory.push(Const.route.HOME);
	}

	render() {
		return (
			<div className="login">
				<div className="loginBox">
					<h3 className="title">青聪岁悦</h3>
					<input type="text" className="username" ref="username" placeholder="请填写用户名" />
					<input type="password" className="password" ref="password" placeholder="请填写用户密码" />
					<input type="submit" className="submitBtn" onClick={() => this.handleLogin()} value="登 录" />
				</div>
			</div>
		);
	}
}
