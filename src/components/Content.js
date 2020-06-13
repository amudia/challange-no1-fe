import React from 'react'
import { Switch, Route } from  'react-router-dom'
import Listuser from '../pages/UserServices/Listuser'
import Form_edit_user from './Edituser/Form_edit_user'
import Main from './Main/Main'

const Content = () => {

    return (
        <Switch>
              <Route path="/" exact render={props => <Main {...props} />} />
              <Route path="/listuser/:id"  exact component={Listuser} />
              <Route path="/edituser/:id"  exact component={Form_edit_user} />
              {/* <Route exact path="/listuser" component={Listuser}/> */}
        </Switch>
    )
}

export default Content;