import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      // const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`); //test

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }
//gets user info with provided credentials
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  //new user created and posted to api 
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status !== 201) {
      return response.json().then(data => data);
    }
    else {
      throw new Error();
    }
  }
//if user is authorized, course info is updated
  async updateCourse(course, courseId, emailAddress, password) {
    const response = await this.api(`/courses/${courseId}`, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204) {
      return response
    } 
    else if (response.status !== 204) {
      return response.json().then(data => data);

    } else {
        throw new Error();
    }
  }
//if signed in, user an created course
async createCourse(course, emailAddress, password) {
  const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
  if (response.status === 201) {
    return [];
    
  }
  else if (response.status !== 201) {
    return response.json().then(data => data);
  }

  else {

    throw new Error();

  }
}


}
