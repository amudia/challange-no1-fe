import React from 'react'
import { Switch, Route } from  'react-router-dom'
import Listuser from '../pages/UserServices/Listuser'
import Main from './Main/Main'

const Content = () => {

    return (
        <Switch>
              <Route path="/" exact render={props => <Main {...props} />} />
              <Route path="/listuser/:id"  exact component={Listuser} />
              {/* <Route exact path="/listuser" component={Listuser}/> */}

        </Switch>
    )
}

export default Content;