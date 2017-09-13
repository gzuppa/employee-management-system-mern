class auth {

  static requestHeaders() {
    // return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
    return {};
  }

  static signin(user) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`http://localhost:8080/auth/signin`, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify(user)
    });

    return fetch(request);
  }

  static signup(newUser) {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`http://localhost:8080/auth/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: headers,
      body: JSON.stringify(newUser)
    });


    console.log('signup', newUser);
    return fetch(request);
  }

  static logout() {
    const headers = Object.assign({
      'Content-Type': 'application/json'
    }, this.requestHeaders());
    const request = new Request(`http://localhost:8080/auth/signout`, {
      method: 'POST',
      mode: 'cors',
      headers: headers
    });

    return fetch(request);
  }
}

export default auth;
