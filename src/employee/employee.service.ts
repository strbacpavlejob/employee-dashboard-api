import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { Employee } from './schemas/employee.schema';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeesRepository: EmployeeRepository) {}

  async getEmployeeById(employeeId: string): Promise<Employee> {
    return this.employeesRepository.findOne({ employeeId });
  }

  async getEmployees(): Promise<Employee[]> {
    return this.employeesRepository.find({ isDeleted: false });
  }

  async getDeletedEmployees(): Promise<Employee[]> {
    return this.employeesRepository.find({ isDeleted: true });
  }

  async createEmployee(newEmployee: CreateEmployeeDto): Promise<Employee> {
    return this.employeesRepository.create({
      employeeId: uuidv4(),
      name: newEmployee.name,
      emailAddress: newEmployee.emailAddress,
      phoneNumber: newEmployee.phoneNumber,
      homeAddress: newEmployee.homeAddress,
      dateOfEmployment: newEmployee.dateOfEmployment,
      dateOfBirth: newEmployee.dateOfBirth,
      isDeleted: false,
    });
  }

  async updateEmployee(
    employeeId: string,
    employeeUpdates: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeesRepository.findOneAndUpdate(
      { employeeId },
      employeeUpdates,
    );
  }

  async deleteEmployee(employeeId: string): Promise<Employee> {
    return this.employeesRepository.findOneAndSoftDelete({ employeeId });
  }
}
