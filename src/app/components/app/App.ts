import {View, Component} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

import {SecurityRouterOutlet} from 'app/routes';
import {
  Header,
  HomePage,
  LoginPage,
  SignupPage,
  UserListPage,
  UserShowPage,
  UserEditPage,
  FollowerListPage,
  FollowingListPage,
  HelpPage,
  TopPage
} from 'app/components';

require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");
require('!style!css!toastr/build/toastr.css');

@Component({
  selector: 'app'
})
@View({
  styles: [require('./app.scss')],
  template: require('./app.html'),
  directives: [SecurityRouterOutlet, Header],
})
@RouteConfig([
  {path: '/home', name: 'Home', component: HomePage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '/signup', name: 'Signup', component: SignupPage},
  {path: '/users', name: 'UserList', component: UserListPage},
  {path: '/users/:id', name: 'UserShow', component: UserShowPage},
  {path: '/users/me/edit', name: 'MeEdit', component: UserEditPage},
  {
    path: '/users/:id/followings',
    name: 'FollowingList',
    component: FollowingListPage
  },
  {
    path: '/users/:id/followers',
    name: 'FollowerList',
    component: FollowerListPage
  },
  {path: '/help', name: 'Help', component: HelpPage},
  {path: '/', name: 'Top', component: TopPage},
])
export class App {
}