"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propIsValid = exports.passwordHasProp = exports.parsePasswords = void 0;
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
function propIsValid(prop) {
    var propIsValid = false;
    switch (prop.key) {
        case 'cid':
            propIsValid = true;
            break;
        case 'byr':
            propIsValid = byrIsValid(prop.value);
            break;
        case 'iyr':
            propIsValid = iyrIsValid(prop.value);
            break;
        case 'eyr':
            propIsValid = eyrIsValid(prop.value);
            break;
        case 'hgt':
            propIsValid = hgtIsValid(prop.value);
            break;
        case 'hcl':
            propIsValid = hclIsValid(prop.value);
            break;
        case 'ecl':
            propIsValid = eclIsValid(prop.value);
            break;
        case 'pid':
            propIsValid = pidIsValid(prop.value);
            break;
        default:
            console.log("Unidentified passport property found!");
    }
    return propIsValid;
}
exports.propIsValid = propIsValid;
function byrIsValid(propValue) {
    var year = Number(propValue);
    if (isNaN(year) || year < 1920 || year > 2002) {
        return false;
    }
    return true;
}
function iyrIsValid(propValue) {
    var year = Number(propValue);
    if (isNaN(year) || year < 2010 || year > 2020) {
        return false;
    }
    return true;
}
function eyrIsValid(propValue) {
    var year = Number(propValue);
    if (isNaN(year) || year < 2020 || year > 2030) {
        return false;
    }
    return true;
}
function hgtIsValid(propValue) {
    var strLength = propValue.length;
    var isValid = true;
    if (propValue.substring(strLength - 2, strLength) === 'in') { // if inches, must be at least 59 and no more than 76
        var length_1 = Number(propValue.substring(0, strLength - 2));
        if (isNaN(length_1) || length_1 < 59 || length_1 > 76) {
            isValid = false;
        }
    }
    else if (propValue.substring(strLength - 2, strLength) === 'cm') { // if cm, must be at least 150 and no more than 193
        var length_2 = Number(propValue.substring(0, strLength - 2));
        if (isNaN(length_2) || length_2 < 150 || length_2 > 193) {
            isValid = false;
        }
    }
    else {
        isValid = false;
    }
    return isValid;
}
function hclIsValid(propValue) {
    var isValid = true;
    if (propValue.length !== 7 || propValue[0] !== '#') {
        isValid = false;
    }
    else {
        var regEx = /[a-f]|\d/;
        for (var i = 1; i < propValue.length; i++) {
            if (!propValue[i].match(regEx)) {
                isValid = false;
            }
        }
    }
    return isValid;
}
function eclIsValid(propValue) {
    var p = propValue;
    if (p === 'amb' || p === 'blu' || p === 'brn' || p === 'gry' || p === 'grn' || p === 'hzl' || p === 'oth') {
        return true;
    }
    else {
        return false;
    }
}
function pidIsValid(propValue) {
    var isValid = true;
    var regEx = /\d/;
    if (propValue.length !== 9) {
        isValid = false;
    }
    else {
        for (var i = 0; i < propValue.length; i++) {
            if (!propValue[i].match(regEx)) {
                isValid = false;
            }
        }
    }
    return isValid;
}
