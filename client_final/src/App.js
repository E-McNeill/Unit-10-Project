import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Header from './components/Header';
// import Public from './components/Public';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UpdateCourseWithContext = withContext(UpdateCourse);


export default () => (
  <Router>
    <div id="root">
      <HeaderWithContext />

      <Switch>
        {/* <Route exact path="/" component={Public} /> */}
        <Redirect exact from="/" to='/courses' />
        {/* <Route  exact path = '/courses/create' component={CreateCourse} /> */}
        <PrivateRoute path="/courses/create" component={CreateCourse} />

        <Route  exact path="/courses" component={Courses} />
        <Route  path = '/courses/:id/update' component={UpdateCourseWithContext} />
        <Route  path = '/courses/:id' component={CourseDetail} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
