import mongoose from "mongoose";
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
  id: Number,
  name: {
    type: Object,
    required: true,
    text : true
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
}, { timestamps:  true });
employeeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});
employeeSchema.index({name: 'text'});
const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;
