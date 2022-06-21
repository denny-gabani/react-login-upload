import React, { createRef, RefObject, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import auth, { LoginResponse } from './services/apis/auth';
import files, { FileResponse } from './services/apis/files';

function App() {
  const [emailAddres, setEmailAddres] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // uploading file
  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    // to avoid redirect to the same page.
    e.preventDefault();

    try {
      const uploadReq = new FormData(e.currentTarget)

      const fileResponse: FileResponse = await files.uploadFile(uploadReq)

      alert(`File uploading successful: ${fileResponse.FileId} | ${fileResponse.FileName}`);

    } catch (error) {
      // TODO: handle error if any of them faced.
      console.error(error)
    }
  }

  // login
  const submitDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    // to avoid redirect to the same page.
    e.preventDefault();

    try {
      const loginResponse: LoginResponse = await auth.loginUser({
        email: emailAddres,
        password: password
      })

      if (loginResponse.token) {
        alert("Login successful")
      }

      if (loginResponse.error) {
        alert(`Please try again later. We are facing an error "${loginResponse.error}"`)
      }
    } catch (error) {
      console.error(error)
      // TODO: handle error if any of them faced.
    }
  }

  return (
    <div className='col-12 p-5 row'>
      <div className='col-6'>
        <Form onSubmit={submitDetails}>
          <Form.Group controlId="emailAddress">
            <Form.Label>
              Email Address
            </Form.Label>
            <Form.Control
              type='text'
              autoComplete='email'
              required
              value={emailAddres}
              onChange={(e) => {
                setEmailAddres(e.target.value)
              }}
            />
          </Form.Group>

          <Form.Group controlId='password' className='py-3'>
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control
              type='password'
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </Form.Group>

          <Button type='submit'>
            Login Now
          </Button>
        </Form>
      </div>

      <div className='col-6'>
        <Form onSubmit={uploadFile}>
          <Form.Group controlId='imageUpload'>
            <Form.Label>
              Select File to Upload
            </Form.Label>
            <Form.Control
              name="file"
              type="file"
              accept='image/*'
            />
          </Form.Group>

          <Button type='submit' className='mt-3'>
            Upload File Now
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
