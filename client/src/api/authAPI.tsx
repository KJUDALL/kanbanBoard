import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // DONE: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('User info not retrieved. Check network tab in devtools.');
    }

    return data;
  } catch (err){
    console.log('Error with user login: ', err);
    return Promise.reject('Could not fetch user info.');
  }
};

export { login };
