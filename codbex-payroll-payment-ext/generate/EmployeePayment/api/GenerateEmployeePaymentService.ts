import { Controller, Get } from "sdk/http";

import { PayrollEntryRepository as PayrollEntryDao } from "../../../../codbex-payrolls/gen/codbex-payrolls/dao/Payrolls/PayrollEntryRepository";


@Controller
class GenerateEmployeePaymentService {

    private readonly payrollEntryDao;

    constructor() {
        this.payrollEntryDao = new PayrollEntryDao();
    }

    @Get("/:payrollData/:payrollId")
    public payrollData(_: any, ctx: any) {
        const payrollId = ctx.pathParameters.payrollId;

        let payrollEntry = this.payrollEntryDao.findById(payrollId);

        return {
            "Id": payrollEntry.Id,
            "Employee": payrollEntry.Employee,
            "NetSalary": payrollEntry.NetSalary,
            "Taxes": payrollEntry.Taxes,
            "PayrollStatus": payrollEntry.PayrollStatus
        };
    }

}