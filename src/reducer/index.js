//import Home from '../actions/homeReducer';
import Login from '../actions/LoginReducer';
import Users from '../actions/UsersReducer';
import Groups from '../actions/GroupReducer';
import Events from '../actions/EventReducer';
import Category from '../actions/CategoryReducer';
import GroupChat from '../actions/GroupChatReducer';
import Dashboard from '../actions/dashboardReducer'
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    //Home: Home,
    Dashboard: Dashboard,
    Login: Login,
    Users: Users,
    Groups: Groups,
    Events: Events,
    Category: Category,
    GroupChat: GroupChat
});

export default rootReducer;