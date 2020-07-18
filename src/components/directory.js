import React from "react";
import axios from "axios";

class Directory extends React.Component {
  // employeeData returns an array of objects with key value pairs
  state = {
    users: [],
    filteredUsers: [],
    sortedUsers: [],
    order: 1
  };

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=200&nat=us")
      .then(({ data }) =>
        this.setState({ users: data.results, filteredUsers: data.results })
      );
  }

  handleInputChange = event => {
    const val = new RegExp(event.target.value, "gi");
    const filtered = this.state.users.filter(
      a =>
        val.test(a.name.first) ||
        val.test(a.name.last) ||
        val.test(a.email) ||
        val.test(a.cell)
    );
    this.setState({ filteredUsers: filtered });
  };

  handleSort = () => {
    const compare = (a, b) => {
      let result;
      const nameA = a.name.first;
      const nameB = b.name.first;
      if (nameA < nameB) {
        result = -1*this.state.order;
      } else if (nameA > nameB) {
        result = 1*this.state.order;
      } else {
        result = 0;
      }
      return result;
    };
    const sorted = this.state.users.sort(compare);
    this.setState({ sortedUsers: sorted, order: -this.state.order });
  };

  renderHeader = () => {
    return (
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">
            First Name{" "}
            <button
              onClick={() => {
                this.handleSort();
              }}
            >
              Sort
            </button>
          </th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
        </tr>
      </thead>
    );
  };

  renderBody = () => (
    <tbody>
      {this.state.filteredUsers.map(employee => (
        <tr key={employee.id}>
          <td>
            <img src={employee.picture.thumbnail} alt="hah" />
          </td>
          <td>{employee.name.first}</td>
          <td>{employee.name.last}</td>
          <td>{employee.email}</td>
          <td>{employee.cell}</td>
        </tr>
      ))}
    </tbody>
  );

  render() {
    return (
      <div>
        <div className="jumbotron">Employee Directory</div>
        <input
          onChange={this.handleInputChange}
          placeholder="type a name, email, or phone number to search"
        />
        <table className="table">
          {this.renderHeader()}
          {this.renderBody()}
        </table>
      </div>
    );
  }
}

export default Directory;
