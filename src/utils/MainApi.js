const settingUserApi = {
  baseUrl: "http://wish-lister.ru//api",
  headers: {
    'Content-Type': 'application/json'
  }
}

class Api {
  constructor(config) {
    this._url = config.baseUrl;
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

  getMe() {
    return this._request(`${this._url}/user/me`, {
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

  getListForEdit(id) {
    return this._request(`${this._url}/lists/edit/${id}`, {
      credentials: 'include',
      headers: this._headers,
    })
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

  addGiftReservationUser(giftId,listId) {
    return this._request(`${this._url}/user/gift`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(
        {
          giftId: giftId,
          listId: listId,
        }),
    })
  }

  deleteGiftReservationUser(giftId) {
    return this._request(`${this._url}/user/gift`, {
      method: "delete",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(
        {
          giftId: giftId,
        }),
    })
  }

  changePassword({currentPassword, newPassword}) {
    return this._request(`${this._url}/user/password`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
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

  updateList({title, description, image, date}, listId) {
    const requestBody = {
      title: title,
      date: date,
    };
    if (description || description === '') {
      requestBody.description = description;
    }

    if (image) {
      requestBody.image = image;
    }
    return this._request(`${this._url}/lists/${listId}`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(requestBody)
    })
  }

  addGift({name, price, link, specification}, listId) {
    const requestBody = {
      name: name,
      price: price,
      link: link,
    };
    if (specification) {
      requestBody.specification = specification;
    }
    return this._request(`${this._url}/lists/${listId}`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(
        requestBody
      )
    })
  }

  updateUser({name, email, reminder}) {
    return this._request(`${this._url}/user/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name, email: email, reminder: reminder
      })
    })
  };

  updateAbout({about}) {
    return this._request(`${this._url}/user/about`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        about: about,
      })
    })
  }

  updateAvatar({avatar}) {
    return this._request(`${this._url}/user/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
  }

  deleteList(id) {
    return this._request(`${this._url}/lists/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
  }

  deleteGift(listId, giftId) {
    return this._request(`${this._url}/lists/${listId}/gifts/${giftId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
  }

  updateGift({name, price, link, specification}, listId, giftId) {
    const requestBody = {
      name: name,
      price: price,
      link: link,
    };
    if (specification || specification === '') {
      requestBody.specification = specification;
    }
    return this._request(`${this._url}/lists/${listId}/gifts/${giftId}`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(
        requestBody
      )
    })
  }

  loginVk() {
    return this._request(`${this._url}/user/auth/vk`, {
      headers: this._headers
    })
  };

  loginTelegram() {
    return this._request(`${this._url}/auth/telegram`, {
      headers: this._headers
    })
  };

}

export const mainApi = new Api(settingUserApi)
