import React, { useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import Layout from './hoc/Layout/Layout';
import CreateAd from './containers/Ads/CreateNewAd/CreateAd';
import MarketUserData from './containers/Ads/MarketUserData/MarketUserData';
import ViewAds from './containers/Ads/ViewAds/ViewAds';
import Login from './containers/Authentication/Login';
import SignUp from './containers/Authentication/SignUp';
import Logout from './containers/Authentication/Logout';
import AuthContext from './hoc/ContextAPI/AuthContext';


function App() {

  var isToken = false;
  if(Cookies.get('token')){
    isToken = true;
  }

  const [isUser, dispatchUser] = useReducer((isUser, action) => {
    switch(action.type){
      case 'isUser':
        return true;
      case 'isNotUser':
        return false;
      default:
        throw new Error();
      
    }
  }, isToken)

  


  return (
    <AuthContext.Provider value={{isUser, dispatchUser}}>
    {/* //   <AuthContext.Consumer >
        // {props => ( */}
          <Layout>
          <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/logout" component={Logout} />
              <Route path="/ads" component={ViewAds} />
              <Route path="/create-ad" component={CreateAd} />
              <Route path="/market-user-data" component={MarketUserData} />
            </Switch>
        </Layout>
    {/* //     )}
    //   </AuthContext.Consumer> */}
    </AuthContext.Provider>
  );
}

export default App;
