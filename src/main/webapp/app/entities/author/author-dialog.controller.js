(function() {
    'use strict';

    angular
        .module('jhipsterApp')
        .controller('AuthorDialogController', AuthorDialogController);

    AuthorDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Author', 'Book'];

    function AuthorDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Author, Book) {
        var vm = this;

        vm.author = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.books = Book.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.author.id !== null) {
                Author.update(vm.author, onSaveSuccess, onSaveError);
            } else {
                Author.save(vm.author, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('jhipsterApp:authorUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.birthDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
