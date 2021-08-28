const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameElement = document.getElementById('website-name');
const websiteURLElement = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];


function showModal() {
  modal.classList.add('show-modal');
  websiteNameElement.focus();

}

function validateURL (nameVal, urlVal) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (nameVal && urlVal !== 'https://') {
    if (urlVal.match(regex)) {
      return true;
    }
    else {
      alert('Please provide a valid address');
      return false;
    }
  }else{
    alert('Please fill all the fields in the form to proceed.');
    return false;
  }
}

function buildBookmarks() {
  bookmarksContainer.textContent = '';
  bookmarks.forEach((bookmark) => {
    const {name, url} = bookmark;

    const item = document.createElement('div');
    item.classList.add('item');

    const closeIcon = document.createElement('i');
    closeIcon.classList.add('far', 'fa-times-circle');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);

    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    
    const favIcon = document.createElement('img');
    favIcon.setAttribute('src', `https://www.google.com/s2/u/0/favicons?domain=${url}`);
    favIcon.setAttribute('alt', 'Favicon');

    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;

    linkInfo.append(favIcon, link);
    item.append(closeIcon, linkInfo);
    
    bookmarksContainer.appendChild(item);
  });
}

function setBookmarks() {
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  }
  else {
    const bookmark = {
      name: 'Google',
      url: 'https://google.com',
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}
function deleteBookmark(url) {
  bookmarks.forEach((bookmark, index) => {
    if(bookmark.url === url){
      bookmarks.splice(index, 1);
    }
  });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  setBookmarks();
}
function storeBookmark(event) {
  event.preventDefault();
  const nameVal = websiteNameElement.value;
  let urlVal = websiteURLElement.value;
  if (!urlVal.includes('http://') && !urlVal.includes('https://')) {
    urlVal = 'https://' + urlVal;
  }

  if (validateURL(nameVal, urlVal)) {
    const bookmark = {
      name: nameVal,
      url: urlVal,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setBookmarks();
    bookmarkForm.reset();
    websiteNameElement.focus();
  } else {
    return false;
  }
}

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (event) => event.target === modal ? modal.classList.remove('show-modal'): false);

bookmarkForm.addEventListener('submit', storeBookmark);

setBookmarks();