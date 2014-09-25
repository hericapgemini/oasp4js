angular.module('oasp.main').factory('security', function (securityRestService) {
    'use strict';
    var currentUserInternal = {
            isLoggedIn: false
        },
        currentUserExternal = (function (currentUser) {
            return {
                isLoggedIn: function () {
                    return currentUser.isLoggedIn;
                },
                getUserName: function () {
                    return (currentUser.profile && currentUser.profile.userName) || '';
                }
            };
        }(currentUserInternal)),
        onUserProfileChange = function (userProfile) {
            currentUserInternal.isLoggedIn = true;
            currentUserInternal.profile = userProfile;
        },
        onLoggingOff = function () {
            currentUserInternal.isLoggedIn = false;
            currentUserInternal.profile = undefined;
        },
        initializeUser = function () {
            return securityRestService.getCurrentUser().success(function (userProfile) {
                onUserProfileChange(userProfile);
            });
        };
    return {
        getCurrentUser: function () {
            return currentUserExternal;
        },
        logIn: function (credentials) {
            return securityRestService.login(credentials).success(function () {
                return initializeUser();
            });
        },
        logOff: function () {
            return securityRestService.logout().success(function () {
                onLoggingOff();
            });
        },
        initializeUser: function () {
            return initializeUser();
        }
    };
});