export default {
	sayHello(nm = 'World!') {
		return new Promise((yes, no) => {
			setTimeout(() => yes('Hello ' + nm + '!'), 1000)
		})
	}
}
