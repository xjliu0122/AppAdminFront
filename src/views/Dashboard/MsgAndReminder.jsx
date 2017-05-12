import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
// import Infinite from 'react-infinite';
import InfiniteScroll from 'react-infinite-scroller';
class MsgAndReminder extends Component {
  constructor(props) {
    super(props);

    this.toggle = this
      .toggle
      .bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === '1'
                } )  }
                onClick={() => {
                  this.toggle('1');
                }}>
                <i className="icon-speech"></i>
                Messages
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === '2'
                })}
                onClick={() => {
                  this.toggle('2');
                }}>
                <i className="icon-list"></i>
                Remindar
              </NavLink>
            </NavItem>
            <NavItem>
              <button type="button" className="btn btn-primary">
                <i className="icon-refresh"></i>
              </button>
            </NavItem>
          </Nav>

          <TabContent activeTab={this.state.activeTab} className="tab-content-dash-msg scroll-bar-hidden no-padding" >
            <TabPane tabId="1" className="no-padding">
              <div className="message-pane scroll-bar-hidden no-padding">
                <div className="first-msg scroll-bar-auto no-padding">
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={function () { }}
                    hasMore={false}
                    loader={<div className="loader"> Loading ...</div>}
                    useWindow={false}>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>   
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div> 
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div> 
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div> 
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div> 
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>                                                                                                                                                              
                  </InfiniteScroll>
                </div>

                <div className="second-msg scroll-bar-auto no-padding">
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={function () { }}
                    hasMore={false}
                    loader={< div className="loader" > Loading ...</div>}
                    useWindow={false}>

                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div> 
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div> 
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div> 
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div> 
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div> 
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div> 
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>
                    <div className=" m-0  text-muted text-center bg-faded text-uppercase">
                      <small>
                        <b>Today</b>
                      </small>
                    </div>                                                                                                                         
                  </InfiniteScroll>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="2" className="scroll-bar-auto no-padding">

              <div>2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <div>2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <div>2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <div>2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
              <div>2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.

              </div>
            </TabPane>

          </TabContent>
        </div>
      </div>
    )
  }
}

export default MsgAndReminder;