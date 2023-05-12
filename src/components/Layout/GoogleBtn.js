import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import {  handleLogin, handleLogout,  } from '../../lib/redux/reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const styles = {
  img: {
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    border: "2px solid #bdc3c7",
  },
  dropdown: {
    background: "transparent",
    borderColor: "transparent",
  },
};

const GoogleBtn = ({log}) => {
  const [ user, setUser ] = useState();
  const [ token, setToken ] = useState();
    // const [ profile, setProfile ] = useState();
  const dispatch = useDispatch()
  


  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');
  //   if (!token) {
  //     // Charger les données nécessaires ici
  //   }
  // }, []);

// console.log("user ")
// console.log(user)
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
          log(true)
          setUser(codeResponse)
          // console.log(codeResponse)
          localStorage.setItem('accessToken', codeResponse.access_token);
          dispatch(handleLogin(profile))
          // console.log(profile) 
          
        },
        onError: (error) =>{
          // dispatch(handleLogin(error))
          console.log('Login Failed:', error)
          log(false)
        } 
    });
    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        // setUser(token.valeur)
        // console.log(token)
        setToken(token)
      }
    }, [user]);
    

    useEffect(
        () => {
            if (token) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                      dispatch(handleLogin(res.data))
                      // Stocker le jeton d'accès dans le stockage local
                      // console.log(res)
                    
                        // setProfile(res.data);
                        
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user, token, dispatch]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
      googleLogout();
      dispatch(handleLogout());
      localStorage.removeItem('accessToken');
      log(false)
      // setUser(null)
        // setProfile(null);

    };
    const {profile}=useSelector(state=>state.user)

  return (

<>
{profile ? (
  <>
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          width="32"
          height="32"
          // src="https://lh3.googleusercontent.com/a/AGNmyxYhgrNypKi4gUCX6F5SBTLW82HFJhm-s4P8jYWO=s96-c"
          src={profile.picture}
          style={styles.img}
          alt="profile"
        />
      </button>
      <ul
        style={styles.dropdown}
        className="dropdown-menu dropdown-menu-dark"
        aria-labelledby="dropdownMenuButton2"
      >
        <li>
        <div>
              {/* <img src={profile.picture} alt="user image" /> */}
              {/* <h3>User Logged in</h3> */}
              {/* <p> {profile.name}</p> */}
              {/* <p>Email Address: {profile.email}</p>
              <br />
              <br /> */}
              <button onClick={logOut}>{profile.name} Log out</button>
          </div>
        </li>
      </ul>
    </div>
  </>
) : (
  //-------------------------------------------------
  <button onClick={() => login()}>Sign in 🚀 </button>
)}
</>
  );
};
export default GoogleBtn;
