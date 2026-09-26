const albums = { all: 'All cakes & treats', wedding: 'Wedding cakes', birthday: 'Birthday cakes', treats: 'Other Treats' };
const requestedAlbum = new URLSearchParams(window.location.search).get('album');
const album = Object.hasOwn(albums, requestedAlbum) ? requestedAlbum : 'all';
document.querySelector('#album-title').textContent = albums[album];
document.title = `${albums[album]} · Cakes by Ila`;
document.querySelectorAll('[data-album]').forEach(link => {
  if (link.dataset.album === album) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});
const photos = (window.CAKES_PHOTOS || []).filter(photo => album === 'all' || photo.category === album);
const grid = document.querySelector('#album-photos');
const more = document.querySelector('#load-more');
let shown = 0;
function showMore() {
  const batch = document.createDocumentFragment();
  const nextPhotos = photos.slice(shown, shown + 24);
  nextPhotos.forEach(photo => {
    const link = document.createElement('a');
    link.className = 'album-photo';
    link.href = photo.src;
    link.setAttribute('aria-label', `View full photo: ${photo.alt}`);
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.width = photo.width;
    img.height = photo.height;
    img.loading = 'lazy';
    img.decoding = 'async';
    link.append(img);
    batch.append(link);
  });
  const firstNewPhoto = batch.firstElementChild;
  const moveFocus = document.activeElement === more;
  grid.append(batch);
  shown += nextPhotos.length;
  more.hidden = shown >= photos.length;
  document.querySelector('#gallery-status').textContent = photos.length
    ? `${shown} of ${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}`
    : 'More photos coming soon.';
  if (moveFocus && firstNewPhoto) firstNewPhoto.focus();
}
more.addEventListener('click', showMore);
showMore();
