import GoogleButton from 'react-google-button'

import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';









export default function Auth() {
     const [isLoading, setIsLoading] = useState(false);

        // const googleSignInPopup = window.open(
        //     'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=596308275-0a42mf97f855dqdnq8b6bp92rd76a63f.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Faccounts%2Fgoogle%2Flogin%2Fcallback%2F&scope=profile&response_type=code&state=ptB4ZPGEHgOl&service=lso&o2v=2&flowName=GeneralOAuthFlow',
        //     'Google Sign-In',
        //     'width=500,height=600'
        // );
        // https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=596308275-0a42mf97f855dqdnq8b6bp92rd76a63f.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Faccounts%2Fgoogle%2Flogin%2Fcallback%2F&scope=profile&response_type=code&state=ptB4ZPGEHgOl&service=lso&o2v=2&flowName=GeneralOAuthFlow
        // setIsLoading(true);

        // Step 2: Listen for the authorization code message from the popup
        // window.addEventListener('message', event => {
        //     console.log(event.data);
        //     // console.log(event.data.method )
        //     // {"method":"fireIdpEvent","params":
        //     //          {"type":"authResult",
        //     //          "clientId":"596308275-0a42mf97f855dqdnq8b6bp92rd76a63f.apps.googleusercontent.com",
        //     //          "id":"auth954242",
        //     //          "authResult":{"scope":"email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
        //     //          "id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1NWNjYTZlYzI4MTA2MDJkODBiZWM4OWU0NTZjNDQ5NWQ3NDE4YmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTk2MzA4Mjc1LTBhNDJtZjk3Zjg1NWRxZG5xOGI2YnA5MnJkNzZhNjNmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTk2MzA4Mjc1LTBhNDJtZjk3Zjg1NWRxZG5xOGI2YnA5MnJkNzZhNjNmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4MTEyMjU3NzM5NTk3OTIxODUzIiwiZW1haWwiOiJheWEuamFmYXIwMDJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlhdCI6MTY3NzkwNzY1NCwiZXhwIjoxNjc3OTExMjU0LCJqdGkiOiI3ODAyN2NkZjRjMmVhMTczOWI1NjAwYTMwNDZkZWM3M2I5OWQ2NjFiIn0.gVQxDjV7PMqhztv-koMi5XtO2TermMesP7KYJOny6-ipnjCShAmYS8nG6P7WbFtgKh9xntEW29bdyWnfr__je5V_AGCIZDZGJyMZehe_LbgsivSHh4aV1uVP6dUJuu7SizIKKB8o4WnPRckuq527bWYv4ibXOT5Xomi1FhacUluTFW02xva3uA0r9DpgcKD8FpCnmvj-XSjdAFPC8hokYbOI6fj3br7BUkmp6d8kO5mWBKCnYzFxyENIQCaj4QIgULy9QlCNyGpy-0_vvie8pRsvImGNsjAGLdTp1uj2JalaYrGsnpEXyC9f20Hi7LTEAFTM6rXsrBZ934pZYPbHNQ","login_hint":"AJDLj6JUa8yxXrhHdWRHIV0S13cA2L46z23c0XI6UwepmsClI18Cytdw7Js0G2AjO2si9YsJ6bp8-YeGQZmyi7tEKFKWJItipg",
        //     //          "client_id":"596308275-0a42mf97f855dqdnq8b6bp92rd76a63f.apps.googleusercontent.com"}
        //     //         }
        //     // }
        //     if (event.origin !== window.location.origin) return;
        //     if (event.data.type === 'google-auth-code') {
        //         const authCode = event.data.payload;
        //         // console.log(event.data);

        //         // Step 3: Send the authorization code to the server
        //         fetch('http://127.0.0.1:8000/accounts/google/login/', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({ auth_code: authCode }),
        //         })
        //             .then(response => {
        //                 if (response.status == 200) {
        //                     // Handle successful login
        //                     console.log(200)
        //                     // googleSignInPopup.close();
        //                 } else {
        //                     // Handle login error
        //                     console.log(404)
        //                     // googleSignInPopup.close();
        //                 }
        //             })
        //             .catch(error => {
        //                 // Handle network error
        //                 console.log(404)
        //             })
        //             .finally(() => {
        //                 setIsLoading(false);
        //                 // googleSignInPopup.close();
        //             });
        //     }
        // });



    return (
        <div>
        <GoogleLogin
            onClick={console.log('clicked')}
                clientId="596308275-0a42mf97f855dqdnq8b6bp92rd76a63f.apps.googleusercontent.com"
                buttonText="Login with Google"
                // onSuccess={googleSignInPopup}
                onFailure={console.log('failure')}
                cookiePolicy={'single_host_origin'}
        ></GoogleLogin>
        <h1>
            
        </h1>
        </div>
   )
}







// export default function Auth() {
//     const [isLoading, setIsLoading] = useState(false);

//     const handleGoogleLogin = () => {
//         const googleClientId = '596308275-0a42mf97f855dqdnq8b6bp92rd76a63f.apps.googleusercontent.com';
//         const redirectUri = encodeURIComponent('http://127.0.0.1:8000/accounts/google/login/callback/');



//         // Step 1: Create and open the Google sign-in popup

//         const googleSignInPopup = window.open(
//             'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=596308275-0a42mf97f855dqdnq8b6bp92rd76a63f.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Faccounts%2Fgoogle%2Flogin%2Fcallback%2F&scope=profile&response_type=code&state=ptB4ZPGEHgOl&service=lso&o2v=2&flowName=GeneralOAuthFlow',
//             'Google Sign-In',
//             'width=500,height=600'
//         );
//         // https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=596308275-0a42mf97f855dqdnq8b6bp92rd76a63f.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Faccounts%2Fgoogle%2Flogin%2Fcallback%2F&scope=profile&response_type=code&state=ptB4ZPGEHgOl&service=lso&o2v=2&flowName=GeneralOAuthFlow
//         // setIsLoading(true);

//         // Step 2: Listen for the authorization code message from the popup
//         window.addEventListener('message', event => {
//             console.log(event.data);
            
//             if (event.origin !== window.location.origin) return;
//             if (event.data.type === 'google-auth-code') {
//                 const authCode = event.data.payload;
//                 console.log(event.data);

//                 // Step 3: Send the authorization code to the server
//                 fetch('http://127.0.0.1:8000/accounts/google/login/', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ auth_code: authCode }),
//                 })
//                     .then(response => {
//                         if (response.status == 200) {
//                             // Handle successful login
//                             console.log(200)
//                             // googleSignInPopup.close();
//                         } else {
//                             // Handle login error
//                             console.log(404)
//                             // googleSignInPopup.close();
//                         }
//                     })
//                     .catch(error => {
//                         // Handle network error
//                         console.log(404)
//                     })
//                     .finally(() => {
//                         setIsLoading(false);
//                         // googleSignInPopup.close();
//                     });
//             }
//         });
//     };

//     return (
//         <GoogleButton onClick={handleGoogleLogin} disabled={isLoading}>
//             {isLoading ? 'Loading...' : 'Google Login'}
//         </GoogleButton>
//     );
// }



// export default function Auth(){
//     // http://127.0.0.1:8000/google-login
//     return (
//     <GoogleButton
//             onClick={GoogleLoginButton}
//     />
//     )
// }