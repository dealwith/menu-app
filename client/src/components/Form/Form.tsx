import React, { useState } from 'react';


const Form = props => {
  const url = `http://localhost:5000`;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const user: Object = {
      email,
      password
    }

    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(user)
    }

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            alert('Email not found, please retry')
          }
          if (res.status === 401) {
            alert('Email and password do not match, please retry')
          }
        }

        return res;
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          document.cookie = `token=${data.token}`;
          props.history.push('/private-area');
        }
      })
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email: <input type='text' onChange={event => setEmail(event.target.value)} /></label>
        <label>Password<input type='password' onChange={event => setPassword(event.target.value)} /></label>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Form;