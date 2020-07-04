//Check whether a value given to fuction is empty or not

const isEmpty = (value) => 
       value === undefined || 
       value == null ||
       (typeof value === 'object' && Object.keys(value).length === 0) || // if value is undefined returns true
       (typeof value === 'string' && value.trim().length === 0)  //if value is not undefined returns true ;meaning its empty


export default isEmpty;