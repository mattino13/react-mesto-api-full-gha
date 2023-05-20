class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка. HTTP статус: ${response.status}`);
    } 
  }

  _request(url, options) {
    return fetch(url, options).then(res => this._checkResponse(res));
  }

  getInitialCards() {
    return this._request(this._buildUrl('/cards'), this._options);
  }

  deleteCard(cardId) {
    const options = {
      ...this._options,
      method: 'DELETE'};

    return this._request(this._buildUrl(`/cards/${cardId}`), options);
  }

  createCard(name, link) {
    const options = {
      ...this._options,
      method: 'POST',
      body: JSON.stringify({name, link})};

    return this._request(this._buildUrl('/cards'), options);
  }

  getUserInfo() {
    return this._request(this._buildUrl('/users/me'), this._options);
  }

  setUserInfo(name, about) {
    const options = {
      ...this._options,
      method: 'PATCH', 
      body: JSON.stringify({name, about})};
    
    return this._request(this._buildUrl('/users/me'), options);
  }

  setUserAvatar(link) {
    const options = {
      ...this._options,
      method: 'PATCH', 
      body: JSON.stringify({avatar: link})};
    
    return this._request(this._buildUrl('/users/me/avatar'), options);
  }

  toggleLike(cardId, newLikeStatus) {
    const options = {
      ...this._options,
      method: newLikeStatus ? 'PUT' : 'DELETE'}; 

    return this._request(this._buildUrl(`/cards/${cardId}/likes`), options);
  }

  _buildUrl(suffix) {
    return `${this._options.baseUrl}${suffix}`;
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
  credentials: 'include',
  //baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;