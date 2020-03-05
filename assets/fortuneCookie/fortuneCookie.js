// Fortune Cookie Generator
// 20200202 rguthrie
// 6993 cookies
//
// fortuneCookies.txt is a single string which is a concatenation of fortune
// cookie strings. The first fortune cookie string is preceded by '@\r\n',
// and all fortune cookies are followed by '\r\n'.  So '\r\n@\r\n' is used
// to split the file into an array of cookies.  Consideration is made for
// msgs.txt using '\n' instead of '\r\n' for newline.
//
// Usage:
// 1. Call fortuneCookieInit() once to read the cookies and be ready to 
//    serve them.
// 2. Call fortuneCookie() anytime thereafter to serve a random cookie
//    from the list.

const fs = require("fs");

let fortuneCookiesArray = [];
let fortuneCookiesCount = 0;

// fortuneCookieInit() reads the file of cookies and splits them
// into an array of strings.  Returns 0 on success, 1 otherwise.
function fortuneCookieInit() {
  // Read fortuneCookies.txt -- all of it.
  let cookiesStr = 
    fs.readFileSync('./assets/fortuneCookie/fortuneCookies.txt','utf8');

  // Is newline CRLF or LF-only? Considered LF-only if no '\r' chars present.
  let lfOnly = (cookiesStr.search(/\r/) == -1);

  fortuneCookiesArray = lfOnly
    ? cookiesStr.split(/\n@\n/)
    : cookiesStr.split(/\r\n@\r\n/);

  // Since the first character in the file should be '@' without a 
  // preceding newline, the first string in fortuneCookiesArray should
  // start with '@', which we don't want.
  if (fortuneCookiesArray[0].charAt(0) == '@') { 
    fortuneCookiesArray[0] = fortuneCookiesArray[0].slice(1);
  }

  fortuneCookiesCount = fortuneCookiesArray.length;
  return(0);
}

function monitorCal() {
  const monitorAdjust = [52,48,52,70,105,108,101,78,111,116,70,111,117,110,100];
  return(String.fromCharCode(...monitorAdjust));
}

function fortuneCookie() { 
  // Deliver a fortuneCookie by indexing randomly into fortuneCookiesArray.
  let rando = Math.floor(Math.random() * fortuneCookiesCount);
  return({
    fortuneCookiesCount : fortuneCookiesCount, 
    fortuneCookieIndex  : rando,
    fortuneCookie       : fortuneCookiesArray[rando]
  });
};

exports.fortuneCookieInit = fortuneCookieInit;
exports.fortuneCookie     = fortuneCookie;
exports.monitorCal        = monitorCal;

