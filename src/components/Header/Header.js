import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div>
                <div className="row border-bottom">
                <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
                    <div className="navbar-header">
                    <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="fake_url"><i className="fa fa-bars" /> </a>
                    <form role="search" className="navbar-form-custom" action="search_results.html">
                        <div className="form-group">
                        <input type="text" placeholder="Search for something..." className="form-control" name="top-search" id="top-search" />
                        </div>
                    </form>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                    <li>
                        <Link to="/login">
                        <i className="fa fa-sign-out" /> Log out
                        </Link>
                    </li>
                    <li>
                        <a href="fake_url" className="right-sidebar-toggle">
                        <i className="" />
                        </a>
                    </li>
                    </ul>
                </nav>
                </div>
            </div>
        )
    }
}
