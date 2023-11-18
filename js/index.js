// Lấy tất cả các phần tử có class 'list-group-item'
var items = document.querySelectorAll('.list-group-item');

// Gán sự kiện click cho mỗi phần tử
items.forEach(function (item) {
    item.addEventListener('click', function () {
        // Xóa active class từ tất cả các phần tử
        items.forEach(function (el) {
            el.classList.remove('active');
        });

        // Thêm active class vào phần tử được click
        item.classList.add('active');
    });
});

// Lấy tất cả các phần tử có class 'nav-link'
var links = document.querySelectorAll('.nav-link');

// Gán sự kiện click cho mỗi phần tử
links.forEach(function (link) {
    link.addEventListener('click', function () {
        // Xóa active class từ tất cả các phần tử
        links.forEach(function (el) {
            el.classList.remove('active');
        });

        // Thêm active class vào phần tử được click
        link.classList.add('active');
    });
});

// remove empty content
function addEventListenersRemove() {
    const toggleableElements = document.getElementsByClassName('list-group-item');
    const removableElement = document.getElementById('note0');

    for (var i = 0; i < toggleableElements.length; i++) {
        toggleableElements[i].addEventListener('click', function () {
            removableElement.style.display = 'none';
        });
    }
}

// Add note GUI
const addButton = document.getElementById('newNoteBtn');

addButton.addEventListener('click', function () {
    const parentDiv = document.querySelector('.list-group');
    const activeChild = parentDiv.querySelector('.active.show');

    const activeChildId = activeChild.getAttribute('id');
    const childCount = activeChild.childElementCount;

    const newChild = document.createElement('div');
    newChild.classList.add('list-group-item', 'list-group-item-action', 'py-3', 'lh-sm');
    newChild.setAttribute('role', 'tab');
    newChild.setAttribute('data-bs-toggle', 'pill');
    newChild.setAttribute('data-bs-target', '#note' + (childCount + 1) + '-' + activeChildId);
    newChild.setAttribute('aria-controls', activeChildId);
    newChild.setAttribute('aria-selected', 'true');

    newChild.innerHTML = `
        <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">Untitled</strong>
            <small>${getCurrentDate()}</small>
        </div>
        <div class="col-10 mb-1 small"></div>
    `;

    activeChild.insertBefore(newChild, activeChild.firstChild);
});

function getCurrentDate() {
    const date = new Date();
    const options = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
}

function handleEdit(button) {
    var inputId = button.getAttribute("data-input-id");
    console.log(inputId);
    var input = document.querySelector('#' + inputId);

    if (input) {
        input.readOnly = false;
        input.focus();

        input.addEventListener('blur', function () {
            input.readOnly = true;
        });
    }
}

// add folder GUI
const addFolder = document.getElementById('newFolderBtn');

// Biến đếm số lượng folder đã được thêm
var folderCount = folderData.length;

// Hàm để thêm folder mới
addFolder.addEventListener('click', function () {

    console.log(folderCount);
    // Tìm thẻ ul chứa class nav
    var folderList = document.querySelector("#folderList");

    var listID = 'listGroup' + (folderCount + 1);

    // Tạo một thẻ li mới
    var newFolder = document.createElement("li");
    newFolder.classList.add("nav-item", "nav-link", "link-body-emphasis", "justify-content-between");
    newFolder.setAttribute("role", "tab");
    newFolder.setAttribute("data-bs-toggle", "pill");
    newFolder.setAttribute("data-bs-target", "#" + listID);
    newFolder.setAttribute("aria-controls", listID);
    newFolder.setAttribute("aria-selected", "false");
    newFolder.setAttribute("tabindex", "-1");

    // Tạo nội dung của thẻ li
    newFolder.innerHTML = `
        <div class="d-flex justify-content-start">
            <i class="bi bi-folder2 me-3"></i>
            <input type="text" readonly="true" class="form-control-plaintext no-border" data-input-id="name-${listID}" id="name-${listID}" value="New Folder">
        </div>
        <div class="dropdown-center">
            <button class="btn dropdown-toggle" data-bs-toggle="dropdown"></button>
            <ul class="dropdown-menu">
                <button type="button" class="dropdown-item rename-btn" data-input-id="name-${listID}" aria-controls="rename-${listID}" onclick="handleEdit(this)">Rename</button>
                <button type="button" class="dropdown-item delete-btn" aria-controls="delete-${listID}">Delete</button>
            </ul>            
        </div>
    `;

    // Chèn thẻ li mới vào đầu danh sách
    folderList.insertBefore(newFolder, folderList.firstChild);

    // Thêm vào mảng, xử lý logic tiếp ở đây
    var newFolderItem = { id: listID, name: 'New Folder' };
    folderData.push(newFolderItem);

    addDivforContainsnote(listID);
});

function addDivforContainsnote(listID) {
    var parentDiv = document.querySelector('.list-group');

    var folderDiv = document.createElement('div');
    folderDiv.classList.add('tab-pane', 'fade', 'nocursor');
    folderDiv.setAttribute('role', 'tabpanel');
    folderDiv.setAttribute('tabindex', '0');
    folderDiv.setAttribute('aria-labelledby', listID + '-tab');
    folderDiv.setAttribute('id', listID);

    parentDiv.appendChild(folderDiv);
}