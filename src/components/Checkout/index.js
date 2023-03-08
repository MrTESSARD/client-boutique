import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../lib/redux/reducers/user';

const styles =  {
  valid : {
    display: 'none'
  }, 
  errors: {
    color: 'crimson',
    display: 'block'
  } 
}
function Checkout() {
  const dispatch = useDispatch()

  const {profile}=useSelector(state=>state.user)
  const [clientDetails, setClientDetails] = useState({
    given_name:profile?.given_name, 
    family_name:profile?.family_name,
    email:profile?.email
  });
  const [required, setRequired] = useState({//ça reste inchangé
    given_name:false, 
    family_name:false,
    email:false
  });

  const handleOnChange = e=>setClientDetails((prevState)=>({...prevState, [e.target.name]: e.target.value}))
  const handleOnSubmit= e=>{
    e.preventDefault()
    dispatch(updateUserProfile(clientDetails))
      
    
    // setClientDetails((prevState)=>({...prevState, [e.target.name]: e.target.value}))
  }

  useEffect(() => {//une fois componentDidMount() 
    
    setClientDetails({
      given_name:profile?.given_name, 
    family_name:profile?.family_name,
    email:profile?.email
    })
  }, [profile]);

  useEffect(() => {
    // Object.entries(clientDetails).map(([key, value])=>{
    //   setRequired({...required,[key]: value})
    // })
    setRequired({
      given_name:!!clientDetails?.given_name?.length, 
    family_name:!!clientDetails?.family_name?.length,
    email:!!clientDetails?.email?.length
    })
  }, [clientDetails]);
  
  const isValid= useMemo(()=>{
    let errors=[]
      Object.entries(required).map(([key, value])=>{//on le met en objet 
        if (!value) {
          errors.push(key)
          
        }
      })

    
    return !errors.length

  },[required])
  return (
    <section className="pt-5 pb-5">
        <div className="container">
          <div className="py-5 text-center row justify-content-center">
            <div className="col-md-10">
              <h2>Client Details :</h2>
            </div>
          </div>
          <div className="row justify-content-center rounded shadow pt-5 pb-5 bg-white ">
          
            <div className="col-md-8 ">
              <form className="needs-validation"
              onSubmit={handleOnSubmit} >
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label for="firstName">First name</label>
                    <input 
                      className="form-control"
                      type="text" 
                      name="given_name" 
                      id="firstName" 
                      placeholder="please enter first name" 
                      value={clientDetails.given_name}
                      onChange={handleOnChange}
                      />
                    <small style={!!clientDetails.given_name ? styles.valid:styles.errors}>
                      Valid first name is required.
                    </small>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label for="lastName">Last name</label>
                    <input 
                      className="form-control"
                      type="text" 
                      name="family_name"  
                      id="lastName"  
                      placeholder="please enter last name" 
                      value={clientDetails.family_name}
                      onChange={handleOnChange}
                       />
                    <small style={!!clientDetails.family_name ? styles.valid:styles.errors}>
                      Valid last name is required.
                    </small>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label for="email">Email <span className="text-muted">(Optional)</span></label>
                  <input 
                    className="form-control"
                    type="email" 
                    name="email"   
                    id="email" 
                    placeholder="you@example.com"  
                    value={clientDetails.email}
                    onChange={handleOnChange}
                    />
                    
                  <div style={!!clientDetails.email ? styles.valid:styles.errors}>
                    Please enter a valid email address for order updates
                  </div>
                </div>
               
                <button 
                className="btn btn-primary btn-lg btn-block" 
                type="submit"
                disabled={!isValid}>
                    Continue to checkout 
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}
export default Checkout;
