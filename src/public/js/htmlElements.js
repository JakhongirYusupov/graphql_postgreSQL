const usersEl = ({ fullName, userId, selected, active }) => {
	return `
		<tr data-userid="${userId}">
		  <td class="align-middle">
		    <div class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
		      <input ${selected && 'checked'} onclick="selectUser(this)" type="checkbox" class="custom-control-input" id="item-${userId}">
		      <label class="custom-control-label" for="item-${userId}"></label>
		    </div>
		  </td>
		  <td class="text-nowrap align-middle">${fullName}</td>
		  <td class="text-nowrap align-middle"><span>09 Dec 2017</span></td>
		  <td class="text-center align-middle"><i onclick="toggleUser(this)" class="fa fa-fw text-secondary cursor-pointer fa-toggle-${active == true ? 'on' : 'off'}"></i></td>
		  <td class="text-center align-middle">
		    <div class="btn-group align-top">
		        <button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">Edit</button>
		        <button class="btn btn-sm btn-outline-secondary badge" type="button"><i class="fa fa-trash"></i></button>
		    </div>
		  </td>
		</tr>
	`
}

const buttonsEl = ({ page }) => {
	return `
		<li data-page="${page}" onclick="findPage(this)" class="page-item ${page == 1 ? 'active' : ''}"><a href="#" class="page-link">${page}</a></li>
	`
}