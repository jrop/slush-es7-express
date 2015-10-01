import React from 'react'

export class Index extends React.Component {
	constructor(props) {
		super(props)
		this.state = { msg: null }
	}

	async sayHello() {
		let msg = await window._api.sayHello(this.refs.subject.getDOMNode().value)
		this.setState({ msg })
	}

	render() {
		return <div>
			<p>Say, &quot;Hello, <input ref="subject" />!&quot; <button onClick={this.sayHello.bind(this)}>Go</button></p>
			{ this.state.msg ? <p>{this.state.msg}</p> : null}
		</div>
	}
}

export { About } from './about'
