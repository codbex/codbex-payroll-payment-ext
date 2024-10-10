const app = angular.module('templateApp', ['ideUI', 'ideView']);

app.controller('templateController', ['$scope', '$http', 'ViewParameters', 'messageHub', function ($scope, $http, ViewParameters, messageHub) {
    const params = ViewParameters.get();
    $scope.showDialog = true;



    const payrollEntryUrl = `/services/ts/codbex-payroll-payment-ext/generate/EmployeePayment/api/GenerateEmployeePaymentService.ts/payrollData/${params.id}`;
    $http.get(payrollEntryUrl)
        .then(function (response) {

            if (response.data.PayrollStatus == 1) {
                $scope.paid = true;
            } else {
                $scope.paid = false;
                $scope.payrollData = response.data;
            }

        });

    $scope.paySalary = function () {

    };




    $scope.closeDialog = function () {
        $scope.showDialog = false;
        messageHub.closeDialogWindow("employee-payment-generate");
    };

    document.getElementById("dialog").style.display = "block";
}]);