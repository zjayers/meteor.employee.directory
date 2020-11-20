import React, { useState } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { EmployeesCollection } from "../api/employees";
import EmployeeDetail from "./employee-detail";

const PER_PAGE = 20;

const EmployeeList = ({ employees }) => {
  const [page, setPage] = useState(1);

  function handleButtonClick() {
    setPage(page + 1);
    Meteor.subscribe("employees", PER_PAGE * page);
  }

  return (
    <div>
      <div className="employee-list">
        {employees.map((employee) => (
          <EmployeeDetail key={employee._id} employee={employee} />
        ))}
      </div>
      <button onClick={handleButtonClick} className="btn btn-primary">
        Load More...
      </button>
    </div>
  );
};

// Setup subscription
export default withTracker(() => {
  Meteor.subscribe("employees", PER_PAGE);
  // Return an object. The object will be sent to the component as props
  return {
    employees: EmployeesCollection.find({}).fetch(),
  };
})(EmployeeList);
