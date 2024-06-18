export default (date : string) => {
    return (new Date(date)).toLocaleDateString('ar-EG-u-nu-latn',{ year: 'numeric', month: 'short', day: 'numeric'});
}