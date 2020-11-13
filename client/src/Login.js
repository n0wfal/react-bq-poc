import { GoogleLogin } from 'react-google-login';
import { AUTH } from './constants';
const { SCOPES, CLIENT_ID } = AUTH;
const responseGoogle = (response) => {
    localStorage.setItem('token', response.accessToken);
    window.location.reload();
}

const failureResp = () => alert('Authentication failed');

const Login = () => <GoogleLogin
    clientId={CLIENT_ID}
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={failureResp}
    cookiePolicy={'single_host_origin'}
    scope={SCOPES.join(' ')}
  />;

export default Login;   