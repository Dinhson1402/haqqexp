//делим строку на массивы по строчно и убираем лишние пробелы
module.exports = function(valiki){
    var arrval = valiki.split('\n');
    for (let key in arrval){
        arrval[key] = arrval[key].replace(/ +/g, ' ').trim();
    }
    return arrval
}