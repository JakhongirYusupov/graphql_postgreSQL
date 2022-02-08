class UserSystem {
	tableBodyEl = document.querySelector('#tableBody')
	paginationEl = document.querySelector('.pagination')

	page = 1
	limit = 5

	get users () {
		const users = window.localStorage.getItem('users')
		return JSON.parse(users) || mockUsers
	}

	save (data) {
		window.localStorage.setItem('users', JSON.stringify(data))
	}

	renderUsers ({ active, search, page = this.page }) {
		// filter
		let users = this.users.filter(user => {
			let act = typeof(active) == 'boolean' ? user.active == active : true
			let sea = search ? user.fullName.toLowerCase().includes(search.toLowerCase()) : true

			return act && sea
		})

		// pagination
		users = users.slice(page * this.limit - this.limit, this.limit * page)

		// render users
		this.tableBodyEl.innerHTML = null
		for(let user of users) {
			let htmlEl = usersEl(user)
			this.tableBodyEl.innerHTML += htmlEl
		}
	}

	selectUser (element, parentElement) {
		const users = this.users

		if(element) {
			const userId = element.parentNode.parentNode.parentNode.dataset.userid
			const user = users.find(user => user.userId == userId)
			user.selected = element.checked
		}

		if(parentElement) {
			for(let user of users) {
				user.selected = parentElement.checked

				let htmlEl = document.querySelector('#item-' + user.userId)
				if(htmlEl) htmlEl.checked = parentElement.checked
			}
		}

		this.save(users)
	}

	toggleUser (element, parentElement) {
		const users = this.users

		const userId = element.parentNode.parentNode.dataset.userid
		const user = users.find(user => user.userId == userId)

		const elementClass = element.classList[4]
		if(elementClass == 'fa-toggle-on') {
			element.classList.remove('fa-toggle-on')
			element.classList.add('fa-toggle-off')
		}

		if(elementClass == 'fa-toggle-off') {
			element.classList.remove('fa-toggle-off')
			element.classList.add('fa-toggle-on')
		}

		user.active = !user.active
		this.save(users)
	}

	paginationButtons () {
		const numberOfPages = Math.ceil(this.users.length / this.limit)

		this.paginationEl.innerHTML = null
		for(let page = 1; page <= numberOfPages; page++) {
			let newButtonEl = buttonsEl({ page })
			this.paginationEl.innerHTML += newButtonEl
		}
	}

	findPage (html) {
		const buttons = document.querySelectorAll('.page-item')
		buttons.forEach(el => el.classList.remove('active'))

		html.classList.add('active')
		this.renderUsers({ page: html.dataset.page })
	}

	editUser () {}
	deleteUser () {}
	createUser () {}
}

const userSystem = new UserSystem()

userSystem.renderUsers({})
userSystem.paginationButtons()


// event handlers
function selectUser (html) {
	userSystem.selectUser(html)
}

function toggleUser (html) {
	userSystem.toggleUser(html)
}

function selectAllUsers (html) {
	userSystem.selectUser(null, html)
}

function findPage (html) {
	userSystem.findPage(html)
}