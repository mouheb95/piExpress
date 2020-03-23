import React, { Component } from 'react'

export default class User extends Component {

    render() {
        return (
            <div className="content-wrapper">
                <section className="content">
                    <div className="row ">
                        <div className="col-md-8 ">
                            <div className="box box-primary ">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Quick Example</h3>
                                </div>
                                {/* /.box-header */}
                                {/* form start */}
                                <form role="form">
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label htmlFor="Email">Email address</label>
                                            <input disabled type="email" className="form-control" name="email" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="First name">First Name</label>
                                            <input disabled type="text" className="form-control" name="firstname" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="First name">Last Name</label>
                                            <input disabled type="text" className="form-control" name="firstname" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="First name">Email address</label>
                                            <input disabled type="text" className="form-control" name="firstname" value="" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="avatar">Avatar</label>
                                            <input type="file" name="avatar" />
                                            <p className="help-block">Avatar</p>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" /> Block user
        </label>
                                        </div>
                                    </div>
                                    {/* /.box-body */}
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
