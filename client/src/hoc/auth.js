import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function (ComposedClass, reload, adminRoute = null) {
    class AuthenticationCheck extends Component {

        state = {
            loading: false
        }

        componentDidMount() {
            this.props.dispatch(auth()).then(async response => {
                let user = this.props.user.userData;

                if (await !user.isAuth) {
                    if (reload) {
                        this.props.history.push('/register')
                    }
                } else {
                    if (adminRoute && !user.isAdmin) {
                        this.props.history.push('/')
                    }
                    else {
                        if (reload === false) {
                            this.props.history.push('/')
                        }
                    }
                }
                this.setState({ loading: false })
            })
        }



        render() {
            if (this.state.loading) {
                return (
                    <div className="main_loader">
                        <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
                    </div>
                )
            }
            return (
                <ComposedClass {...this.props} user={this.props.user} />
            );
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)
}


