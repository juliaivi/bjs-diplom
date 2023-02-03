//Выход из личного кабинета
let logoutButton = new LogoutButton();
logoutButton.action = () => { 
    ApiConnector.logout((result) => {
        if (result) {
            location.reload();
        }
    })
} 

//Получение информации о пользователе
ApiConnector.current((result) => {
    if (result) {
        ProfileWidget.showProfile(result.data);
    }
}); 

//Получение текущих курсов валюты
let ratesBoard = new RatesBoard();
ratesBoard.currentStocks = () => {
    ApiConnector.getStocks((result) => { 
        if (result) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(result.data);
        }
    })   
}
ratesBoard.currentStocks();
setInterval(ratesBoard.currentStocks, 60000);

//Операции с деньгами
let moneyManager = new MoneyManager();

//пополнение баланса
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (result) => {
        if (result.success === true) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен.");
        } else {
            moneyManager.setMessage(false, result.error);
        }
    });
}

//конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (result) => {
        if (result.success === true) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(true, "Произведена конвертация валюты");
        } else {
            moneyManager.setMessage(false, result.error);
        }
    })
}

//перевод валюты
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (result) => {
        if (result.success === true) {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(true, "Осуществлен перевод валюты");
        } else {
            moneyManager.setMessage(false, result.error);
        }
    })
}

//Работа с избранным
let favoritesWidget = new FavoritesWidget();
//Запросите начальный список избранного
ApiConnector.getFavorites = (result) => {
    if (result) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(result.data);
        moneyManager.updateUsersList(result.data);
    } 
}

//Реализуйте добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (result) => {
        if (result) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            favoritesWidget.setMessage(true, "Удачное добавление пользователя");
        } else {
            favoritesWidget.setMessage(false, result.error);
        }
    })
}

//Реализуйте удаление пользователя из избранного
favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, (result) => {
        if (result) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            favoritesWidget.setMessage(true, "Удачное удаление пользователя");
        } else {
            favoritesWidget.setMessage(false, result.error);
        }
    }) 
}




