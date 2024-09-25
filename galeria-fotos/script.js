// Funções para Modal
function openModal(img) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Funções para Arrastar e Soltar
const dropArea = document.getElementById('drop-area');
const gallery = document.getElementById('gallery');
const fileInput = document.getElementById('fileElem');

// Prevenir o comportamento padrão de arrastar e soltar
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// Adicionar classes CSS para indicar que a área está sendo arrastada
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Adicionar evento para soltar as imagens
dropArea.addEventListener('drop', handleDrop, false);
dropArea.addEventListener('click', () => fileInput.click());

// Funções auxiliares para arrastar e soltar
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    handleFiles(files);
});

function handleFiles(files) {
    [...files].forEach(uploadFile);
}

function uploadFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const img = document.createElement('img');
        img.src = reader.result;
        img.alt = file.name;
        img.onclick = () => openModal(img);
        gallery.appendChild(img);
    };
}

// Gerenciamento de Álbuns
let albums = []; // Array para armazenar os álbuns

// Função para criar um novo álbum
function createAlbum(name) {
    const newAlbum = {
        name: name,
        photos: [] // Inicia um álbum vazio
    };
    albums.push(newAlbum);
    renderAlbums();
}

// Função para renderizar os álbuns na página
function renderAlbums() {
    const albumList = document.getElementById('album-list');
    albumList.innerHTML = ''; // Limpa a lista de álbuns

    albums.forEach((album, index) => {
        const albumDiv = document.createElement('div');
        albumDiv.classList.add('album', 'card', 'm-2');
        albumDiv.style.width = '18rem'; // Largura fixa para os cartões de álbuns

        albumDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${album.name}</h5>
                <button class="btn btn-primary" onclick="addPhotos(${index})">Adicionar Fotos</button>
                <button class="btn btn-info" onclick="editAlbum(${index})">Editar Nome</button>
                <button class="btn btn-danger" onclick="deleteAlbum(${index})">Excluir</button>
            </div>
        `;
        
        albumList.appendChild(albumDiv);
    });
}


function addPhotos(albumIndex) {
    const photoUrl = prompt("Insira a URL da imagem:");
    if (photoUrl) {
        albums[albumIndex].photos.push(photoUrl);
        alert("Foto adicionada ao álbum!");
    }
}

function editAlbum(albumIndex) {
    const newName = prompt("Digite o novo nome do álbum:", albums[albumIndex].name);
    if (newName) {
        albums[albumIndex].name = newName;
        renderAlbums();
    }
}

function deleteAlbum(albumIndex) {
    if (confirm("Você tem certeza que deseja excluir este álbum?")) {
        albums.splice(albumIndex, 1);
        renderAlbums();
    }
}

document.getElementById('add-album').addEventListener('click', () => {
    const albumName = prompt("Digite o nome do novo álbum:");
    if (albumName) {
        createAlbum(albumName);
    }
});

renderAlbums();
