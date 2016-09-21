(function () {
	'use strict';

	angular.module('webAppNameWebApp')
		.factory('errorHelpers', function ($state, $log, dialogs, errorCodes) {
			return {
				handleBackendError: handleBackendError,
				throwError: throwError,
				mapBackendValidationError: mapBackendValidationError,
				showCustomFieldError: showCustomFieldError
			};

			// TODO: broadcast error to child components
			function showCustomFieldError(scope, fieldError) {
				scope.$broadcast('customFieldError', fieldError);
			}

			function handleBackendError(scope, error, customHandler) {
				$log.error('handleBackendError -> ', error);

				if (error.data && error.data.code && customHandler && customHandler(scope, error)) {
					$log.debug('handleBackendError -> error handled by custom handler');
					return;
				}

				// TODO: Validate error and act accordingly its content

				/* Example
				 if (error && error.data && error.data.redirectData && error.data.redirectData.destination) {
				 $log.debug('handleBackendError -> redirect');
				 return $state.go(error.data.redirectData.destination, error.data.redirectData.params, {
				 location: 'replace'
				 });
				 }

				 if (error.data && error.data.code === errorCodes.VALIDATION_ERROR) {
				 $log.debug('handleBackendError -> validation error');

				 if (scope && error.data.fields && error.data.fields.length) {
				 _.forEach(error.data.fields, function (fieldError) {
				 showCustomFieldError(scope, fieldError);
				 });
				 } else {
				 dialogs.message(error.data.message);
				 }

				 return;
				 }

				 if (error.status && error.status <= 0) {
				 $log.debug('handleBackendError -> connection error');
				 dialogs.message('Connection error. Please try again.');
				 return;
				 }

				 $log.debug('handleBackendError -> unexpected error');
				 dialogs.backendError(error);*/
			}

			function throwError(code, message, redirect) {
				var err = {
					data: {
						code: code,
						message: message
					}
				};

				if (redirect) {
					err.data.redirect = redirect;
				}

				throw _.assign(new Error(), err);
			}

			function mapBackendValidationError(error, scope, fieldMap) {
				$log.error('mapBackendValidationError -> ', error);

				if (error.data && error.data.fields) {
					error.data.fields = _.map(error.data.fields, function (value) {
						value.name = fieldMap[value.name] || value.name;
						return value;
					});
				}

				handleBackendError(error, scope);
			}
		});
})();