import NepaliDate from 'nepali-date-converter';
export const getTodaysNepaliDate=()=>{
    let date = new NepaliDate();
    return date.format('ddd, DD MMMM YYYY', "np");
}
export const changeToNepali =(value)=>{
    let date = new Date(value).getTime();
    date = new NepaliDate(date);
    return date.format('ddd, DD MMMM YYYY', "np");
}