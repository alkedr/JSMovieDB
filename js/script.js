'use strict';



document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: []
    };

    const ads = document.querySelectorAll('.promo__adv img'),
          bg = document.querySelector('.promo__bg'),
          genre = bg.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          movieForm = document.querySelector('form.add'), //запросить тег form с классом add
          movieInput = movieForm.querySelector('.adding__input'),
          checkbox = movieForm.querySelector('[type="checkbox"]'); //запрос по атрибуту

    movieForm.addEventListener('submit', (event) => {
             event.preventDefault();

             let addFilm = movieInput.value;
             const isFavourite = checkbox.checked;

             if (addFilm) {
                if (addFilm.length > 21) {
                    addFilm = `${addFilm.substring(0, 22)}...`;
                }

                 if (isFavourite) {
                     console.log("Добавляем любимый фильм");
                 }

                fetch('http://localhost:8888/api/movies', {
                    method: 'POST',
                    body: addFilm,
                })

                movieDB.movies.push(addFilm);
                arrSort(movieDB.movies);
                addToMovieList(movieDB.movies, movieList);
             }

             event.target.reset(); //обращаемся к самому элементу, на котором происходит событие
    });


    const adsRemover = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    adsRemover(ads);

    const changeWebPage = () => {
        genre.textContent = "драма";

        bg.style.backgroundImage = 'url("img/bg.jpg")';

    };

    changeWebPage();

    const arrSort = (arr) => {
        arr.sort();
    };


    function addToMovieList(films, parent) {
        parent.innerHTML = "";
        arrSort(movieDB.movies);

        films.forEach((movie, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">  ${i + 1} ${movie}
                                   <div class="delete"></div>
                               </li>
                               </li>

            `;
       });

         document.querySelectorAll('.delete').forEach((btn, i) => {
              btn.addEventListener("click", () => {
                    fetch('http://localhost:8888/api/movies', {
                    method: 'DELETE',
                    body: movieDB.movies[i]
                })

                  btn.parentElement.remove();
                  movieDB.movies.splice(i, 1);

                  addToMovieList(films, parent);
              });

         });
    }

    fetch('http://localhost:8888/api/movies')
        .then(data => data.json())
        .then(json => {
            movieDB.movies.push.apply(movieDB.movies, json['movies'])
            addToMovieList(movieDB.movies, movieList);
        })
});``



