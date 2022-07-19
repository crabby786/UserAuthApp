import { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/AuthEventHandler";

type Props = {};

type State = {
  responseMsg: string;
  users: any[];
}

export default class BoardUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      responseMsg: "",
      users: []
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {

        this.setState({
          responseMsg: response.data?.message,
          users: response.data?.users
        });
      },
      error => {
        this.setState({
          responseMsg:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    const { users } = this.state
    return (
      <div className="container">
        <header className="jumbotron">
          <h4>Api with authentication</h4>
          <div>
            <h5> Users List </h5>
            <ul className="list-group">
              {users?.length ? users?.map((user: any, i) => <li key={i} className="list-group-item" >
                {user?.username + " : " + user?.email}
              </li>) : <li>"No users"</li>
              }
            </ul>
          </div>
        </header>
      </div>
    );
  }
}
