// DATABASE PERSISTENCE EXAMPLE

// Retreive data from the database
function getData() {
    var userId = Portal.Get("currentUser");
    
    var queryResult = db.Execute("SELECT NAME, DESCRIPTION, CAL_LINK FROM CLUBS c INNER JOIN CLUB_MEMBERS m ON c.CLUB_ID = m.CLUB_ID WHERE m.MEMBER_ID = '"  + userId + "'");
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"error":"You are not subscribed to any clubs"}';
    }
    return queryResult;
}

// Retreive search data from the database
function getSearchData() {
    var queryResult = db.Execute('SELECT NAME, DESCRIPTION FROM CLUBS');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"error":"Table does not exist"}';
    }
    return queryResult;
}

// Search the database
function search() {
    if (args.Get("value").length > 50)
        return '{"result":"error"}';
    else {
        //return db.execute('SELECT * FROM CLUBS WHERE NAME LIKE \'%' + args.Get("value") + '%\'');
      var query =  'SELECT * FROM CLUBS WHERE NAME LIKE \'%' + args.Get("value") + '%\'';
      return db.Execute(query);
    }
}