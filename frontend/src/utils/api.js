class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._profileUrl = baseUrl + '/users/me';
    this._cardsUrl = baseUrl + '/cards';
    this._headers = headers;
  }

  _createRequest({url, headersObj, method, body}) {
    return fetch(url, {method: method, headers: headersObj, body: body})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getProfile() {
    return this._createRequest({
      url: this._profileUrl,
      headersObj: this._headers,
      method: 'GET'})
  }

  getInitialCards() {
    return this._createRequest({
      url: this._cardsUrl,
      headersObj: this._headers,
      method: 'GET'})
  }

  chahgeProfile(newData) {
    return this._createRequest({
      url: this._profileUrl,
      headersObj: this._headers,
      method: 'PATCH',
      body: JSON.stringify(newData)
    })
  }

  changeAvatar(avatar) {
    return this._createRequest({
      url: `${this._profileUrl}/avatar`,
      headersObj: this._headers,
      method: 'PATCH',
      body: JSON.stringify(avatar)
    })
  }

  addNewCard(cardData) {
    return this._createRequest({
      url: this._cardsUrl,
      headersObj: this._headers,
      method: 'POST',
      body: JSON.stringify(cardData)
    })
  }

  deleteCard(idCard) {
    return this._createRequest({
      url: `${this._cardsUrl}/${idCard}`,
      headersObj: this._headers,
      method: 'DELETE'
    })
  }

  changeLikeCardStatus(idCard, like) {
    return this._createRequest({
      url: `${this._cardsUrl}/likes/${idCard}`,
      headersObj: this._headers,
      method: like ? 'PUT' : 'DELETE'
    })
  }
}

const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
  headers: {
    authorization: '73878bf0-187e-4ea2-beea-67c91647b84f',
    'Content-Type': 'application/json'
  }
};

const api = new Api(apiOptions);
export default api;