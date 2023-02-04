"use strict";

let userForm = new UserForm();

userForm.loginFormCallback = function (data)  { 
    ApiConnector.login(data, function(result) { 
        console.log(result);
        if (result.success) {
            location.reload(); 
        } else {
            userForm.setLoginErrorMessage(result.error); 
        }
    })
}

userForm.registerFormCallback = function (data) {
    ApiConnector.register(data, function(result) {
        console.log(result);
        if(result.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(result.error);
        }
    })
}
    

