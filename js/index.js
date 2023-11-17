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

function addEventListenersRemove() {
    const toggleableElements = document.getElementsByClassName('list-group-item');
    const removableElement = document.getElementById('note0');

    for (var i = 0; i < toggleableElements.length; i++) {
        toggleableElements[i].addEventListener('click', function () {
            removableElement.style.display = 'none';
        });
    }
}

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