import { Meteor } from "meteor/meteor";
import { EmployeesCollection } from "../imports/api/employees";
import _ from "lodash";
import { image, helpers } from "faker";

Meteor.startup(() => {
  // Generate fake employee data
  const numberRecords = EmployeesCollection.find({}).count();
  if (!numberRecords) {
    // Generate the fake data
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();
      EmployeesCollection.insert({
        name,
        email,
        phone,
        avatar: image.avatar(),
      });
    });
  }

  // Setup publisher
  Meteor.publish("employees", function (per_page) {
    return EmployeesCollection.find({}, { limit: per_page });
  });
});
