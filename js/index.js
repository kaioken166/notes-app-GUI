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

const toggleableElements = document.getElementsByClassName('list-group-item');
const removableElements = document.getElementById('note0')

for (var i = 0; i < toggleableElements.length; i++) {

    toggleableElements[i].addEventListener('click', function () {
        // console.log(1)
        removableElements.style.display = 'none';
    });
}