const app = angular.module('templateApp', ['ideUI', 'ideView']);

app.controller('templateController', ['$scope', '$http', 'ViewParameters', 'messageHub', function ($scope, $http, ViewParameters, messageHub) {
    const params = ViewParameters.get();
    $scope.showDialog = true;


    const employeeUrl = "/services/ts/codbex-payroll-payment-ext/generate/EmployeePayment/api/GenerateEmployeePaymentService.ts/employeeData/";
    const payrollEntryUrl = "/services/ts/codbex-payroll-payment-ext/generate/EmployeePayment/api/GenerateEmployeePaymentService.ts/payrollData/" + params.id;
    $http.get(payrollEntryUrl)
        .then(function (response) {
            $scope.PayrollData = response.data;
            $scope.Employee = response.data.Employee;

            if (response.data.PayrollStatus == 1) {
                $scope.Paid = true;
            } else {
                $scope.Paid = false;
            }

            return $http.get(employeeUrl + $scope.Employee);
        })
        .then(function (response) {
            console.log(response.data);
        });

    $scope.paySalary = function () {

    };




    $scope.closeDialog = function () {
        $scope.showDialog = false;
        messageHub.closeDialogWindow("employee-payment-generate");
    };

    document.getElementById("dialog").style.display = "block";
}]);
