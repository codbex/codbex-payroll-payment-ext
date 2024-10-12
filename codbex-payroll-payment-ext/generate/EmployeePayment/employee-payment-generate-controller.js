const app = angular.module('templateApp', ['ideUI', 'ideView']);

app.controller('templateController', ['$scope', '$http', 'ViewParameters', 'messageHub', function ($scope, $http, ViewParameters, messageHub) {
    const params = ViewParameters.get();
    $scope.showDialog = true;


    const employeeUrl = "/services/ts/codbex-payroll-payment-ext/generate/EmployeePayment/api/GenerateEmployeePaymentService.ts/employeeData/";
    const payrollEntryUrl = "/services/ts/codbex-payroll-payment-ext/generate/EmployeePayment/api/GenerateEmployeePaymentService.ts/payrollData/" + params.id;
    const salaryUrl = "/services/ts/codbex-payroll-payment-ext/generate/EmployeePayment/api/GenerateEmployeePaymentService.ts/salaryData/";

    $http.get(payrollEntryUrl)
        .then(function (response) {

            $scope.PayrollData = response.data;

            if (response.data.PayrollStatus == 1) {
                $scope.Paid = true;
            } else {
                $scope.Paid = false;
            }

            const date = new Date(response.data.StartDate);

            $scope.MonthName = date.toLocaleString('default', { month: 'long' });
            $scope.Year = date.getFullYear();

            return $http.get(employeeUrl + response.data.Employee);
        })
        .then(function (response) {
            $scope.EmployeeName = response.data.Name;

            return $http.get(salaryUrl + $scope.PayrollData.Employee);
        })
        .then(function (response) {
            $scope.SalaryData = response.data;
        });




    $scope.paySalary = function () {

        const employeePayment = {
            "Date": new Date().toLocaleDateString('en-CA'),
            "Valor": new Date().toLocaleDateString('en-CA'),
            "CounterpartyIBAN": $scope.SalaryData.IBAN,
            "CounterpartyName": $scope.EmployeeName,
            "Amount": $scope.PayrollData.NetSalary,
            "Currency": $scope.SalaryData.Currency,
            "Reason": $scope.PayrollData.Title
        }

        console.log(employeePayment);

    };

    $scope.closeDialog = function () {
        $scope.showDialog = false;
        messageHub.closeDialogWindow("employee-payment-generate");
    };

    document.getElementById("dialog").style.display = "block";
}]);

