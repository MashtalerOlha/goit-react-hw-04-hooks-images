const KEY = '25246823-37314bed22bcdc498ffe68995';

function fetchImage(searchQuery, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

export const api = {
  fetchImage,
};
