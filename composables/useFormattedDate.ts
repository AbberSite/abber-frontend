export default (date? : string) =>  {

    const today = new Date(date as string);
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
  
    return `${day}-${month}-${year}`;
  }