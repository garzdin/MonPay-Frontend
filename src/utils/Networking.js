class JsonError {
  constructor(json) {
    this.name = 'JsonError';
    this.message = json;
    this.stack = new Error().stack;
  }
}

JsonError.prototype = Object.create(Error.prototype);

class Networking {
  static request(route, method = 'GET', body = {}, authenticated = false) {
    const endpoint = "https://monpay.herokuapp.com/api/v1/";
    const getParams = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const postParams = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    if (authenticated) {
      getParams.headers['Authorization'] = localStorage.getItem("token");
      postParams.headers['Authorization'] = localStorage.getItem("token");
    }
    return new Promise(function(resolve, reject) {
      fetch(endpoint + route, method !== 'GET' ? postParams : getParams)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new JsonError(response);
        }
      })
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        error.message.json()
        .then(json => {
          if (json.description) {
            if (json.description.token) {
              if (json.description.token.includes("expired")) {
                fetch(endpoint + "auth/refresh", {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    refresh_token: localStorage.getItem("refreshToken")
                  })
                })
                .then(response => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error();
                  }
                }).then(json => {
                  localStorage.setItem("token", json.token);
                  localStorage.setItem("refreshToken", json.refresh_token);
                })
                .catch(error => {
                  reject(error);
                });
              }
            }
          }
        });
      })
      .then(() => {
        fetch(endpoint + route, method !== 'GET' ? postParams : getParams)
        .then(response => response.json())
        .then(json => {
          resolve(json);
        })
      });
    });
  };
};

export default Networking;
