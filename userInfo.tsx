import React, { useEffect, useState } from 'react';
import './userData.css'
import { useSelector } from 'react-redux';
import { getItemsSelector } from '../../redux/userReducer';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const UserInfo = () => {
  const [email, setEmail] = useState('');
  const userdata = useSelector(getItemsSelector);
  const id = useParams();
  const navigate = useNavigate();
// alert(id);
  useEffect(() => {
    if (userdata.length> 0 ) {

      
       for (let index = 0; index < userdata.length; index++) {
          let  element = userdata[index];
          let userid =element['id'];

         console.log(userid +"  "+  id['userId']);
        
          if(userid == id['userId'])
          {
            console.log(element['name']);
            setEmail(element['name']);
          }
        
       }
            
    
     } else {

      navigate(`/sign-in`);
     }

}, [userdata]);

    return (
        <section className="vh-200">
        <div className="container py-5 h-800">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">User Info</h3>
                  <form >
                    <div data-mdb-input-init className="form-outline mb-8 d-flex align-items-center">
                    <label className="form-label me-4" >Email</label>
                      <input
                        type="email"
            
                        className="form-control form-control-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly
                      />
              
                 

                   
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
)
}




export default UserInfo;