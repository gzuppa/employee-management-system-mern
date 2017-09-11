class auth {
  
    static requestHeaders() {
      // return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
      return {};
    }
  
    static signin(user) {
      const headers = this.requestHeaders();
      const request = new Request(`/signin`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
      });
  
      return fetch(request);
    }
  
    static signup(newUser) {
      const headers = this.requestHeaders();
      const request = new Request(`/signup`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newUser)
      });
  
      return fetch(request);
    }
  
    static logout() {
      const headers = Object.assign({
        'Content-Type': 'application/json'
      }, this.requestHeaders());
      const request = new Request(`/signout`, {
        method: 'POST',
        headers: headers
      });
  
      return fetch(request);
    }
  }
  
  export default auth;
  