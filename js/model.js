const folderData = [
    { id: 'listGroup1', name: 'Folder 1' },
    { id: 'listGroup2', name: 'Folder 2' },
    { id: 'listGroup3', name: 'Folder 3' }
    // Thêm dữ liệu của các folder khác nếu cần
];

var folders = [
    {
        id: "listGroup1",
        items: [
            {
                title: "github command-line",
                date: "Wed",
                content: "Clone ..."
            },
            {
                title: "Insert title here",
                date: "Tues",
                content: "Content here"
            },
            {
                title: "Insert title here",
                date: "Mon",
                content: "Content here"
            }
        ]
    },
    {
        id: "listGroup2",
        items: [
            {
                title: "Họp Nhóm Proiect XYZ",
                date: "Wed",
                content: "Hôm nay, chúng ta ..."
            }
        ]
    },
    {
        id: "listGroup3",
        items: []
    }
];

function renderFolders() {
    const folderList = document.getElementById('folderList');

    folderData.forEach((folder, index) => {
        const folderItem = document.createElement('li');
        folderItem.classList.add('nav-item', 'nav-link', 'link-body-emphasis', 'justify-content-between');
        folderItem.setAttribute('role', 'tab');
        folderItem.setAttribute('data-bs-toggle', 'pill');
        folderItem.setAttribute('data-bs-target', `#${folder.id}`);
        folderItem.setAttribute('aria-controls', folder.id);
        folderItem.setAttribute('aria-selected', index === 0);
        folderItem.setAttribute('tabindex', -1);

        folderItem.innerHTML = `
        <div class="d-flex justify-content-start">
            <i class="bi bi-folder2 me-3"></i>
            <input type="text" readonly="true" class="form-control-plaintext no-border" data-input-id="name-${folder.id}" id="name-${folder.id}" value="${folder.name}">
        </div>
        <div class="dropdown-center">
            <button class="btn dropdown-toggle" data-bs-toggle="dropdown"></button>
            <ul class="dropdown-menu">
                <button type="button" class="dropdown-item rename-btn" data-input-id="name-${folder.id}" aria-controls="rename-${folder.id}" 
                    onclick="handleEdit(this)">Rename</button>
                <button type="button" class="dropdown-item delete-btn" aria-controls="delete-${folder.id}">Delete</button>
            </ul>            
        </div>
        `;

        folderList.appendChild(folderItem);
    });
    folderList.firstElementChild.classList.add('active');
}



function renderNoteFolders() {
    var parentDiv = document.querySelector('.list-group');
    parentDiv.innerHTML = '';

    folders.forEach(function (folder) {
        var folderDiv = document.createElement('div');
        folderDiv.classList.add('tab-pane', 'fade', 'nocursor');
        folderDiv.setAttribute('role', 'tabpanel');
        folderDiv.setAttribute('tabindex', '0');
        folderDiv.setAttribute('aria-labelledby', folder.id + '-tab');
        folderDiv.setAttribute('id', folder.id);

        if (folder.id === "listGroup1") {
            folderDiv.classList.add('show', 'active');
        }

        folder.items.forEach(function (item, index) {
            var itemDiv = document.createElement('div');
            itemDiv.classList.add('list-group-item', 'list-group-item-action', 'py-3', 'lh-sm');
            itemDiv.setAttribute('role', 'tab');
            itemDiv.setAttribute('data-bs-toggle', 'pill');
            itemDiv.setAttribute('data-bs-target', '#note' + (index + 1) + '-' + folder.id);
            itemDiv.setAttribute('aria-controls', 'note' + (index + 1) + '-' + folder.id);
            itemDiv.setAttribute('aria-selected', 'false');

            var titleContainer = document.createElement('div');
            titleContainer.classList.add('d-flex', 'w-100', 'align-items-center', 'justify-content-between');

            var title = document.createElement('strong');
            title.classList.add('mb-1');
            title.textContent = item.title;

            var date = document.createElement('small');
            date.textContent = item.date;

            titleContainer.appendChild(title);
            titleContainer.appendChild(date);

            var content = document.createElement('div');
            content.classList.add('col-10', 'mb-1', 'small');
            content.textContent = item.content;

            itemDiv.appendChild(titleContainer);
            itemDiv.appendChild(content);

            folderDiv.appendChild(itemDiv);
        });

        parentDiv.appendChild(folderDiv);
    });
    addEventListenersRemove();
}

function onPageLoad() {
    renderFolders();
    renderNoteFolders();
}

