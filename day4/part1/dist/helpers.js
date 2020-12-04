"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordHasProp = exports.parsePasswords = void 0;
// Parses an array of passwords-as-string into neat arrays of password-properties.
function parsePasswords(passportsRaw) {
    // create an array of passport data, containing all the data of a single passport.
    var passportsData = passportsRaw.map(function (passportRaw) {
        return passportRaw.split(/\s/).filter(function (singleData) {
            return (singleData.length > 0);
        });
    });
    // Now parse each piece of data into an array of name-value pairs.
    var parsedPasswords = [];
    passportsData.forEach(function (passportData) {
        var passwordProperties = passportData.map(function (stringProp) {
            var splitKeyValue = stringProp.split(":");
            var prop = {
                "key": splitKeyValue[0],
                "value": splitKeyValue[1]
            };
            return prop;
        });
        parsedPasswords.push(passwordProperties);
    });
    return parsedPasswords;
}
exports.parsePasswords = parsePasswords;
function passwordHasProp(password, prop) {
    var propFound = false;
    password.forEach(function (pwprop) {
        if (pwprop.key === prop) {
            propFound = true;
        }
    });
    return propFound;
}
exports.passwordHasProp = passwordHasProp;
