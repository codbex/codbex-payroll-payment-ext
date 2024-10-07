const viewData = {
    id: 'employee-payment-generate',
    label: 'Generate Employee Payment',
    link: '/services/web/codbex-payroll-payment-ext/generate/EmployeePayment/employee-payment-generate.html',
    perspective: 'Payrolls',
    view: 'Payrolls',
    type: 'entity',
    order: 13
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}