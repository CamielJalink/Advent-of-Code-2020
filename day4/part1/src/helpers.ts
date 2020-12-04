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