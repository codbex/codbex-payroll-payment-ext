import { Controller, Get } from "sdk/http";

import { PayrollEntryRepository as PayrollEntryDao } from "../../../../codbex-payrolls/gen/codbex-payrolls/dao/Payrolls/PayrollEntryRepository";
import { EmployeeRepository as EmployeeDao } from "../../../../codbex-employees/gen/codbex-employees/dao/Employees/EmployeeRepository";


@Controller
class GenerateEmployeePaymentService {

    private readonly payrollEntryDao;
    private readonly employeeDao;

    constructor() {
        this.payrollEntryDao = new PayrollEntryDao();
        this.employeeDao = new EmployeeDao();
    }

    @Get("/:payrollData/:payrollId")
    public payrollData(_: any, ctx: any) {
        const payrollId = ctx.pathParameters.payrollId;

        const payrollEntry = this.payrollEntryDao.findById(payrollId);

        return {
            "Id": payrollEntry.Id,
            "Employee": payrollEntry.Employee,
            "NetSalary": payrollEntry.NetSalary,
            "Taxes": payrollEntry.Taxes,
            "PayrollStatus": payrollEntry.PayrollStatus
        };
    }

    @Get("/:employeeData/:employeeId")
    public employeeData(_: any, ctx: any) {
        const employeeId = ctx.pathParameters.employeeId;

        const employeeEntry = this.employeeDao.findById(employeeId);

        return {
            "Name": employeeEntry.Name
        };
    }

}