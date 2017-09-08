'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var employeeSchema = new Schema({
  id: Number,
  name: {
    type: Object,
    required: true,
    text: true
  },
  gender: String,
  age: Number,
  managerId: Number,
  reports: Number,
  managerName: String,
  title: String,
  department: String,
  email: String,
  phone: String,
  address: String,
  zipcode: String,
  salary: Number,
  isCurrent: Boolean,
  startDate: Date,
  leaveData: Date,
  nationality: String
}, { timestamps: true });
employeeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
employeeSchema.index({ name: 'text' });
const Employee = _mongoose2.default.model("employees", employeeSchema);

module.exports = Employee;
//# sourceMappingURL=employee.js.map