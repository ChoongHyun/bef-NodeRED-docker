var when = require('when');
var request = require('request');
var requestsync = require('sync-request');

var valid = false;

var getCookie = request.cookie('keyofcookie').value;

// var user = { username: 'admin', permissions: '*' };
var user = { anonymous: true, permissions: 'read' };

module.exports = {
    users: function(username) {
        return when.promise(function(resolve) {

            // Do whatever work is needed to check username is a valid
            // user.
            // valid를 이용하여 판단
            if (valid) {
                // Resolve with the user object. It must contain
                // properties 'username' and 'permissions'
                resolve(user);
            } else {
                // Resolve with null to indicate this user does not exist
                resolve(null);
            }
        });
    },
    authenticate: function(username,password) {
        return when.promise(function(resolve) {

            // Do whatever work is needed to validate the username/password
            // combination.
            if (valid) {
                // Resolve with the user object. Equivalent to having
                // called users(username);
                resolve(user);
            } else {
                // Resolve with null to indicate the username/password pair
                // were not valid.
                resolve(null);
            }
        });
    },
    default: function() {

        // token check
        user = checkToken(getCookie);

        return when.promise(function(resolve) {
            // Resolve with the user object for the default user.
            // If no default user exists, resolve with null.
            resolve(user);
        });
    }
}


/*****
 * method
 */
// cookie 값과 server 단으로 가져온 값 체크
function checkToken(cookie){
//     if( !cookie.isEmpty ){
//         var res = null;
//         var getToken = null;
//         try{
//             res = requestsync('GET', 'http://localhost:8089/token');
//             getToken = res.getBody('utf8');
//         }catch(exception){
//             getToken = null;
//         }
//         if( getCookie == getToken ){
//             user = { username: 'BEF', permissions: '*' };
//         }else{
//             user = { anonymous: true, permissions: 'read' };
//         }
//     }
    user = { username: 'BEF', permissions: '*' };
    return user;
}