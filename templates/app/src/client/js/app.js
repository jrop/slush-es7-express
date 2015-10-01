import apiClient from 'apiify/client'
import { createHistory } from 'history'
import React from 'react'
import { Router, Route, IndexRoute, Link } from 'react-router'

import { Index, About } from './react-components'

class App extends React.Component {
	render() {
		return <div>
			<h1><%= packageName %></h1>
			<p><Link to="/">Home</Link> | <Link to="/about">About</Link></p>
			{this.props.children}
		</div>
	}
}

window.addEventListener('load', async function() {
	window._api = await apiClient('/api')

	React.render((<Router history={createHistory()}>
		<Route path="/" component={App}>
			<IndexRoute component={Index} />
			<Route path="/about" component={About} />
		</Route>
	</Router>), document.body)
})
