const viewData = {
    id: 'employee-payment-generate',
    label: 'Pay salary',
    link: '/services/web/codbex-payroll-payment-ext/generate/EmployeePayment/employee-payment-generate.html',
    perspective: 'Payrolls',
    view: 'PayrollEntry',
    type: 'entity',
    order: 13
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}