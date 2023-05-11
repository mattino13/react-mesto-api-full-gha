class Auth {
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

  // регистрация
  signup(email, password) {
    const options = {
      ...this._options,
      method: 'POST',
      body: JSON.stringify({
        password: password,
        email: email })};

    return this._request(this._buildUrl('/signup'), options);
  }

  // авторизация
  signin(email, password) {
    const options = {
      ...this._options,
      method: 'POST',
      body: JSON.stringify({
        password: password,
        email: email })};

    return this._request(this._buildUrl('/signin'), options);
  }

  //проверка токена
  checkToken(token) {
    const options = {
      ...this._options,
      };

    options.headers = {
      ...options.headers,
      Authorization : `Bearer ${token}`
    };

    return this._request(this._buildUrl('/users/me'), options);
  }

  _buildUrl(suffix) {
    return `${this._options.baseUrl}${suffix}`;
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default auth;