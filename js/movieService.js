import Dom from "./utils/Dom.js"
import MOVIE_INFO from './constants/movie.js';

const movieService = {
  run() {
    const movieImages = this.getMovieImages();
    this.listenMovieImagesClick(movieImages);

    const guestBookForm = this.getSubmitForm();
    this.listenSubmitGuestBook(guestBookForm);
  },

  getMovieImages() {
    return Array.from(Dom.$$('.movie-image'));
  },

  listenMovieImagesClick(movieImages) {
    movieImages.map((movieImage, index) => {
      this.listenOneMovieImageClick(movieImage, index)
    });
  },

  listenOneMovieImageClick(movieImage, index) {
    movieImage.addEventListener('click', () => {
      window.open(MOVIE_INFO[index].link);
    });
  },

  getSubmitForm() {
    return Dom.$('#guest-book-form');
  },

  getUsername() {
    return Dom.$('.username-style').value;
  },
  
  getSelectedMovies() {
    const checkboxes = Array.from(Dom.$$('.checkbox'));
    const activeCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);
    const movieTitles = activeCheckboxes.map((checkbox) => Dom.$(`label[for="${checkbox.id}"]`));
    return movieTitles.map((movie) => movie.textContent);
  },

  alertSelectedMoviesCount(username, selectedMovies) {
    alert(`${username}님 저와 ${selectedMovies.length}개 취향이 같으시네요!`);
  },

  listenSubmitGuestBook(guestBookForm) {
    guestBookForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = this.getUsername();
      const selectedMovies = this.getSelectedMovies();
      this.alertSelectedMoviesCount(username, selectedMovies);
    });
  }
}

export default movieService;
