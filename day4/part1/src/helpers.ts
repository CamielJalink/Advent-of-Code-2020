export interface Property {
  "key": string,
  "value": string
}

// Parses an array of passwords-as-string into neat arrays of password-properties.
export function parsePasswords(passportsRaw: string[]){

  // create an array of passport data, containing all the data of a single passport.
  let passportsData: string[][] = passportsRaw.map((passportRaw: string) => {
    return passportRaw.split(/\s/).filter((singleData: string) => {
      return (singleData.length > 0);
    })
  })

  // Now parse each piece of data into an array of name-value pairs.
  let parsedPasswords: Property[][] = [];
  passportsData.forEach((passportData: string[]) => {
    let passwordProperties: Property[] = passportData.map((stringProp: string) => {
      let splitKeyValue: string[] = stringProp.split(":");
      let prop: Property = {
        "key": splitKeyValue[0],
        "value": splitKeyValue[1]
      }
      return prop;
    });
    parsedPasswords.push(passwordProperties);
  })

  return parsedPasswords;
}


export function passwordHasProp(password: Property[], prop: string){
  let propFound: boolean = false;
  password.forEach((pwprop: Property) => {
    if(pwprop.key === prop){
      propFound = true;
    }
  })
  return propFound;
}


export function propIsValid(prop: Property){
  let propIsValid: boolean = false; 

  switch(prop.key){
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



function byrIsValid(propValue: string){ // birthyear, must be at least 1920 and at most 2002
  let year: number = Number(propValue);
  if (isNaN(year) || year < 1920 || year > 2002){
    return false;
  }
  return true;
}

function iyrIsValid(propValue: string){ // Issue year, at least 2010 at most 2020
  let year: number = Number(propValue);
  if (isNaN(year) || year < 2010 || year > 2020) {
    return false;
  }
  return true;
}

function eyrIsValid(propValue: string){ // Expiration year, at least 2020 and at most 2030
  let year: number = Number(propValue);
  if (isNaN(year) || year < 2020 || year > 2030) {
    return false;
  }
  return true;
}

function hgtIsValid(propValue: string){ // Heights start with a number and end with in or cm.
  let strLength = propValue.length;
  let isValid: boolean = true;

  if(propValue.substring(strLength-2, strLength) === 'in'){ // if inches, must be at least 59 and no more than 76
    let length = Number(propValue.substring(0, strLength-2));
    if(isNaN(length) || length < 59 || length > 76){
      isValid = false;
    }
  }
  else if (propValue.substring(strLength - 2, strLength) === 'cm') { // if cm, must be at least 150 and no more than 193
    let length = Number(propValue.substring(0, strLength - 2));
    if (isNaN(length) || length < 150 || length > 193) {
      isValid = false;
    }
  }
  else{
    isValid = false;
  }

  return isValid;
}

function hclIsValid(propValue: string){ // A valid haircolor starts with a # and than 6 digits (0-9) or characters (a-f)
  let isValid = true;

  if (propValue.length !== 7 || propValue[0] !== '#'){
    isValid = false;
  }
  else{
    let regEx = /[a-f]|\d/;
    for(let i = 1; i < propValue.length; i++){
      if(!propValue[i].match(regEx)){
        isValid = false;
      }
    }
  }

  return isValid;
}

function eclIsValid(propValue: string) { // Eyecolor axactly one of [amb, blu, brn, gry, grn, hzl, oth]
  let p = propValue;
  if(p === 'amb' || p === 'blu' || p === 'brn' || p === 'gry' || p === 'grn' || p === 'hzl' || p === 'oth'){
    return true;
  } else{
    return false;
  }
}

function pidIsValid(propValue: string){ // A 9 digit number including including leading zeroes
  let isValid = true;
  let regEx = /\d/;

  if(propValue.length !== 9){
    isValid = false;
  } 
  else{
    for (let i = 0; i < propValue.length; i++){
      if(!propValue[i].match(regEx)){
        isValid = false;
      }
    }
  }

  return isValid;
}