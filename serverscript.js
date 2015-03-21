// DATABASE PERSISTENCE EXAMPLE

// Retreive data from the database
function getData() {
  	var userId = Portal.Get("currentUser");
  
    var queryResult = db.Execute("SELECT NAME, DESCRIPTION, CAL_LINK FROM CLUBS c INNER JOIN CLUB_MEMBERS m ON c.CLUB_ID = m.CLUB_ID WHERE m.MEMBER_ID = '"  + userId + "'");
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"error":"You do not belong in any clubs"}';
    }
    return queryResult;
}