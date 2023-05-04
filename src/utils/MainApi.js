const settingUserApi = {
  //baseUrl: "https://api.moviessearch.nomoredomains.work",
  baseUrl: "http://localhost:4200",
  imgUrl: "https://api.nomoreparties.co",
  headers: {
    'Content-Type': 'application/json'
  }
}

class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._imgUrl = config.imgUrl;
    this._headers = config.headers;
  }

  async _checkResponse(res) {
    const json = await res.json();
    if (res.ok) {
      return json;
    }
    throw json;
  }

  register = (name, email, password, reminder) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        reminder: reminder,
      }),
    })
      .then(this._checkResponse)
  };

  login = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(
        {
          email: email,
          password: password,
        }),
    }).then(this._checkResponse)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  logout() {
    return this._request(`${this._url}/logout`, {
      credentials: 'include',
      headers: this._headers
    })
  }

  getMe(path) {
    return this._request(`${this._url}${path}`, {
      credentials: 'include',
      headers: this._headers
    })
  };

  getLists() {
    return this._request(`${this._url}/lists`, {
      credentials: 'include',
      headers: this._headers,
    })
  }

  getList(id) {
    return fetch(`${this._url}/lists/${id}`)
  }

  reservationOn(giftId, listId) {
    return this._request(`${this._url}/lists/${listId}/gifts/${giftId}/reservation`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    })
  }

    reservationOff(giftId, listId) {
    return this._request(`${this._url}/lists/${listId}/gifts/${giftId}/reservation`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
  }


  createList(title, date, description, image, gifts = []) {
    return this._request(`${this._url}/list`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(
        {
          title: title,
          date: date,
          gifts: gifts,
          description: description ? description : ' ',
          image: image ? image : 'https://static.mk.ru/upload/entities/2021/09/24/03/articles/detailPicture/ad/f0/3b/f8/aa1602c4e8a45f36cfdacc8b1b045625.jpg'
        }),
    })
  }

  changeStatusMovie(isLiked, movie, idForDelete) {
    if (isLiked) {
      return this.setMovieToSave(movie);
    } else {
      return this.removeMovieFromSave(idForDelete);
    }

  }

  editServerProfileInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH", headers: this._headers, body: JSON.stringify({
        name: data.name, email: data.email,
      })
    })
  };

  deleteList(id) {
    return this._request(`${this._url}/lists/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
  }

  removeMovieFromSave(idForDelete) {
    return this._request(`${this._url}/movies/${idForDelete}`, {
      method: "DELETE", headers: this._headers,
    })
  };

  setMovieToSave(movie) {
    return this._request(`${this._url}/movies`, {
      method: "POST", headers: this._headers, body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${this._imgUrl}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${this._imgUrl}${movie.image.url}`,
        movieId: movie.id
      })
    })
  }
}

export const mainApi = new Api(settingUserApi)
