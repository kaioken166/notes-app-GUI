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
        folderDiv.classList.add('tab-pane', 'fade', 'nocursor', 'notefolder');
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

// Dữ liệu ghi chú
const noteData = [
    {
        id: 'note1-listGroup1',
        title: 'github command-line',
        date: 'Friday 17 November 2023 12:13',
        folder: 'Folder 1',
        content: 'Clone a Specific Branch: git clone -b',
    },
    {
        id: 'note1-listGroup2',
        title: 'Họp Nhóm Proiect XYZ',
        date: 'Wednesday 17 November 2023 12:13',
        folder: 'Folder 2',
        content: 'Hôm nay ...',
    },
];

// Tạo phần tử HTML cho mỗi ghi chú và thêm vào DOM
function renderNotes() {
    const container = document.getElementById('mainContent');

    noteData.forEach((note) => {
        console.log(1)
        const noteElement = document.createElement('div');
        noteElement.classList.add('p-3', 'flex-column', 'flex-grow-1', 'tab-pane', 'fade');
        noteElement.id = note.id;
        noteElement.setAttribute('role', 'tabpanel');
        noteElement.setAttribute('tabindex', '0');

        noteElement.innerHTML = `
        <div class="d-flex justify-content-between">
            <input type="text" class="form-control form-control-lg no-border" id="title-${note.id}"
            placeholder="" value="${note.title}">
            <button class="btn my-3 shadow-sm save-btn me-2" id="save-${note.id}" type="button"><i
                class="bi bi-floppy"></i></button>
            <button class="btn my-3 shadow-sm trash-btn me-2" id="delete-${note.id}" type="button"><i
                class="bi bi-trash3"></i></button>
        </div>
        <hr class="mx-3" style="border-width: 0.5px;">
        <h6 class="mx-3 pb-3 border-bottom"><i class="bi bi-calendar3 me-2"></i>${note.date}</h6>
        <h6 class="mx-3 mt-3 pb-3 border-bottom"><i class="bi bi-folder2-open me-2"></i>${note.folder}</h6>
        <textarea class="form-control flex-grow-1 no-border p-3" placeholder=""
            id="content-${note.id}">${note.content}</textarea>
    `;

        container.appendChild(noteElement);
    });
}

function onPageLoad() {
    renderFolders();
    renderNotes();
    renderNoteFolders();
}

