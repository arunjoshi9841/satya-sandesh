import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import history from './app/utils/history';
import Home from './app/components/home';
import Navigation from './app/components/navigation';
import Login from './app/components/login';
import PageNotFound from './app/components/pages/PageNotFound';
import ErrorPage from './app/components/pages/ErrorPage';
import Article from './app/components/article';
import Post from './app/components/post';
import Articles from './app/components/post/Posts';
import Signup from './app/components/signup';
import Profile from './app/components/profile';
import Feature from './app/components/feature';
import Labels from './app/components/labels';
import Quotes from './app/components/quotes';
import Review from './app/components/review';
import PrivateRoute from './app/utils/PrivateRoute';
import { isDialogOpen } from './app/components/login/loginSlice';
function App() {
  return (
    <div className='w-screen'>
      <div
        className='w-full min-h-screen md:w-4/5 mx-auto flex flex-col'
        style={{ maxWidth: '1280px' }}
      >
        <BrowserRouter history={history}>
        <Navigation />
          <Switch>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/' component={Home} />
            <Route exact path='/article/:articleId' component={Article} />
            <PrivateRoute exact path='/editor' component={Post} />
            <PrivateRoute exact path='/articles' component={Articles} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/feature' component={Feature} />
            <PrivateRoute exact path='/quotes' component={Quotes} />
            <PrivateRoute exact path='/labels' component={Labels} />
            <PrivateRoute exact path='/review' component={Review} />
            <Route exact path='/error' component={ErrorPage} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
        {isDialogOpen && <Login />}
      </div>
    </div>
  );
}

export default App;
