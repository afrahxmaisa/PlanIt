class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
}

let notes = [];

const form = document.getElementById('add-note-form');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const searchNotes = document.getElementById('search-notes');
const notesContainer = document.getElementById('notes-container');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = noteTitle.value;
    const content = noteContent.value;
    const note = new Note(title, content);
    notes.push(note);
    noteTitle.value = '';
    noteContent.value = '';
    displayNotes();
});

searchNotes.addEventListener('input', () => {
    displayNotes(searchNotes.value);
});




function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "-250px") {
      sidebar.style.left = "0";
    } else {
      sidebar.style.left = "-250px";
    }
  }

function displayNotes(searchQuery = '') {
    notesContainer.innerHTML = '<h2>Your Notes</h2>';
    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filteredNotes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');

        const titleElement = document.createElement('h3');
        titleElement.innerText = note.title;
        noteElement.appendChild(titleElement);

        const contentElement = document.createElement('p');
        contentElement.innerText = note.content;
        noteElement.appendChild(contentElement);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            notes.splice(index, 1);
            displayNotes();
        });
        noteElement.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        
        editButton.addEventListener('click', () => {
            openEditModal(note, index);
        });
        

        noteElement.appendChild(editButton);

        const archiveButton = document.createElement('button');
            archiveButton.innerText = 'Archive';
            archiveButton.style.backgroundColor = 'green';
            archiveButton.addEventListener('click', () => {
                note.isArchived = true;
                displayNotes();
        });
        noteElement.appendChild(archiveButton);

        notesContainer.appendChild(noteElement);

        document.querySelector('.close').addEventListener('click', closeEditModal);
        document.getElementById('archived-notes-button').addEventListener('click', openArchivedNotesModal);
        document.querySelector('#archived-notes-modal .close').addEventListener('click', closeArchivedNotesModal);


        });
}

notesContainer.addEventListener('touchstart', handleTouchStart, false);
notesContainer.addEventListener('touchmove', handleTouchMove, false);



let xDown = null;
let yDown = null;

function handleTouchStart(e) {
    const firstTouch = e.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
    }

function handleTouchMove(e) {
    if (!xDown || !yDown) return;

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;
    
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // Horizontal swipe
        if (xDiff > 0) {
            // Left swipe
            const noteElement = e.target.closest('.note');
            if (noteElement) {
                noteElement.style.transform = 'translateX(-50%)';
            }
        } else {
            // Right swipe
            const noteElement = e.target.closest('.note');
            if (noteElement) {
                noteElement.style.transform = 'translateX(0)';
            }
        }
    }
    
    xDown = null;
    yDown = null;
}

function openEditModal(note, index) {
    document.getElementById('edit-note-title').value = note.title;
    document.getElementById('edit-note-content').value = note.content;
    document.getElementById('save-changes').onclick = () => saveChanges(index);
    document.getElementById('edit-modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function saveChanges(index) {
    const newTitle = document.getElementById('edit-note-title').value;
    const newContent = document.getElementById('edit-note-content').value;

    if (newTitle && newContent) {
        notes[index].title = newTitle;
        notes[index].content = newContent;
        displayNotes();
    }

    closeEditModal();
}


const sortNotesSelect = document.getElementById('sort-notes');
sortNotesSelect.addEventListener('change', () => {
    const selectedOption = sortNotesSelect.value;
    sortNotes(selectedOption);
    displayNotes();
});

function sortNotes(option) {
    switch (option) {
        case 'title':
            notes.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'date':
            notes.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
            break;
        case 'modified':
            notes.sort((a, b) => new Date(a.lastModified) - new Date(b.lastModified));
            break;
        default:
            break;
    }
}



function openArchivedNotesModal() {
    displayArchivedNotes();
    document.getElementById('archived-notes-modal').style.display = 'block';
}


function closeArchivedNotesModal() {
    document.getElementById('archived-notes-modal').style.display = 'none';
}

function displayArchivedNotes() {
    const archivedNotesContainer = document.getElementById('archived-notes-container');
    archivedNotesContainer.innerHTML = '';
    notes.forEach(note => {
        if (note.isArchived) {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';

            const noteText = document.createElement('p');
            noteText.innerText = note.text;
            noteElement.appendChild(noteText);

            const unarchiveButton = document.createElement('button');
            unarchiveButton.innerText = 'Unarchive';
            unarchiveButton.style.backgroundColor = 'green';
            unarchiveButton.addEventListener('click', () => {
                note.isArchived = false;
                displayNotes();
                displayArchivedNotes();
            });
            noteElement.appendChild(unarchiveButton);

            archivedNotesContainer.appendChild(noteElement);
        }
    });
}


