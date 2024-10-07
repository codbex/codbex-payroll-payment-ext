const app = angular.module('templateApp', ['ideUI', 'ideView']);

app.controller('templateController', ['$scope', '$http', 'ViewParameters', 'messageHub', function ($scope, $http, ViewParameters, messageHub) {
    const params = ViewParameters.get();
    $scope.showDialog = true;




    $scope.closeDialog = function () {
        $scope.showDialog = false;
        messageHub.closeDialogWindow("employee-payment-generate");
    };

    document.getElementById("dialog").style.display = "block";
}]);