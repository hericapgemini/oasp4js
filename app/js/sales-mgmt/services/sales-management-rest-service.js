angular.module('gastronomy.salesMgmt').factory('salesManagementRestService', function ($http, currentContextPath) {
    'use strict';

    var servicePath = currentContextPath.get() + 'services/rest/salesmanagement';

    return {
        findOrders: function (params) {
            return $http.get(servicePath + '/order', {
                params: params
            });
        },
        updateOrder: function (order, orderId) {
            return $http.put(servicePath + '/order/' + orderId, order);
        }
    };
});
