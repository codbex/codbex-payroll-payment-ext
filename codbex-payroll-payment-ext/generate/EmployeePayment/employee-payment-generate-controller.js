const app = angular.module('templateApp', ['ideUI', 'ideView']);

app.controller('templateController', ['$scope', '$http', 'ViewParameters', 'messageHub', function ($scope, $http, ViewParameters, messageHub) {
    const params = ViewParameters.get();
    $scope.showDialog = true;


    const employeeUrl = "/services/ts/codbex-payroll-payment-ext/generate/EmployeePayment/api/GenerateEmployeePaymentService.ts/employeeData/";
    const payrollEntryUrl = "/services/ts/codbex-payroll-payment-ext/generate/EmployeePayment/api/GenerateEmployeePaymentService.ts/payrollData/" + params.id;
    const salaryUrl = "/services/ts/codbex-payroll-payment-ext/generate/EmployeePayment/api/GenerateEmployeePaymentService.ts/salaryData/";
    const employeePaymentUrl = "/services/ts/codbex-payments/gen/codbex-payments/api/EmployeePayment/EmployeePaymentService.ts/";
    const payrollUpdateUrl = "/services/ts/codbex-payrolls/gen/codbex-payrolls/api/Payrolls/PayrollEntryService.ts/";


    $http.get(payrollEntryUrl)
        .then(function (response) {

            $scope.PayrollData = response.data;

            if (response.data.Status == 1) {
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
            $scope.Employee = response.data;

            return $http.get(salaryUrl + $scope.PayrollData.Employee);
        })
        .then(function (response) {
            console.log(response.data);
            $scope.SalaryData = response.data;
        });

    $scope.paySalary = function () {

        const employeePayment = {
            "Date": new Date().toLocaleDateString('en-CA'),
            "Valor": new Date().toLocaleDateString('en-CA'),
            "CounterpartyIBAN": $scope.Employee.IBAN,
            "CounterpartyName": $scope.Employee.Name,
            "Amount": $scope.SalaryData.Net,
            "Currency": $scope.SalaryData.Currency,
            "Reason": $scope.PayrollData.Title
        }

        $http.post(employeePaymentUrl, employeePayment)
            .then(function (response) {

                $scope.PayrollData.PayDate = new Date().getTime();
                $scope.PayrollData.PayrollStatus = 1;

                $http.put(payrollUpdateUrl + $scope.PayrollData.Id, $scope.PayrollData)
                    .then(function (response) {
                        console.log(response.data);
                        $scope.closeDialog();
                    })
                    .catch(function (error) {
                        console.error("Error updating Payroll entry", error);
                    });;

            })
            .catch(function (error) {
                console.error("Error creating Employee payment", error);
            });
        ;

    };

    $scope.closeDialog = function () {
        $scope.showDialog = false;
        messageHub.closeDialogWindow("employee-payment-generate");
    };

    document.getElementById("dialog").style.display = "block";
}]);

