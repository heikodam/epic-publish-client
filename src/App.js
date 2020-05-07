import React, { useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import Layout from './components/Layout/Layout';
import CreateAd from './containers/Ads/CreateNewAd/CreateAd';
import Marketplaces from './containers/Marketplaces/Marketplaces';
import Marketplace from './containers/Marketplaces/Marketplace/Marketplace';
import CreateMarketplace from './containers/Marketplaces/CreateMarketplace/CreateMarketplace';
import ViewAds from './containers/Ads/ViewAds/ViewAds';
import Login from './containers/Authentication/Login/Login';
import SignUp from './containers/Authentication/SignUp/SignUp';
import Logout from './containers/Authentication/Logout/Logout';
import {AuthContext, AdsContext} from './ContextAPI/Context';
import Ad from './containers/Ads/Ad/Ad';
import Profile from './containers/Authentication/Profile/Profile';


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

  const [contextAds, dispatchAds] = useReducer((ads, action) =>{
    switch(action.type){
      case 'setAds':
        return action.ads
      default:
        throw new Error();
    }
  }, null)


  return (
    <AuthContext.Provider value={{isUser, dispatchUser}}>
    <AdsContext.Provider value={{contextAds, dispatchAds}}>
          <Layout>
          <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/logout" component={Logout} />
              <Route path="/users/me" component={Profile} />
              <Route path="/ads/me/:id" component={Ad} />
              <Route path="/ads/me" component={ViewAds} />
              <Route path="/ads/create" component={CreateAd} />
              <Route path="/marketplaces/create" component={CreateMarketplace} />
              <Route path="/marketplaces/me/:id" component={Marketplace} />
              <Route path="/marketplaces/me" component={Marketplaces} />
            </Switch>
        </Layout>
    </AdsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
