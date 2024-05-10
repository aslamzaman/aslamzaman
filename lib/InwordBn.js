export const inwordBn = (numberText) => {
    const number = parseFloat(numberText);
    const num_to_bd = [
        'k~b¨', 'GK', '`yB', 'wZb', 'Pvi', 'cvuP', 'Qq', 'mvZ', 'AvU', 'bq',
        '`k', 'GMvi', 'evi', '†Zi', '†PŠÏ', 'c‡bi', '†lvj', 'm‡Zi', 'AvVvi', 'Ewbk',
        'wek', 'GKyk', 'evBk', '†ZBk', 'PweŸk', 'cuwPk', 'QvweŸk', 'mvZvk', 'AvVvk',
        'EbwÎk', 'wÎk', 'GKwÎk', 'ewÎk', '†ZwÎk', '†PŠwÎk', 'cuh়wÎk', 'QwÎk',
        'mvuBwÎk', 'AvUwÎk', 'EbPwjøk', 'Pwjøk', 'GKPwjøk', 'weqvwjøk', '†ZZvwjøk',
        'Pyqvwjøk', 'cuqZvwjøk', '†QPwjøk', 'mvZPwjøk', 'AvUPwjøk', 'EbcÂvk', 'cÂvk',
        'GKvbœ', 'evqvbœ', 'wZàvbœ', 'Pyqvbœ', 'cÂvbœ', 'Qvàvbœ', 'mvZvbœ', 'AvUvbœ',
        'EblvU', 'lvU', 'GKlwÆ', 'evlwÆ', '†ZlwÆ', '†PŠlwÆ', 'cuqlwÆ', '†QlwÆ', 'mvZlwÆ',
        'AvUlwÆ', 'EbmËi', 'mËi', 'GKvËi', 'evnvËi', 'wZqvËi', 'PyqvËi', 'cuPvËi', 'wQqvËi',
        'mvZvËi', 'AvUvËi', 'EbAvwk', 'Avwk', 'GKvwk', 'weivwk', 'wZivwk', 'Pyivwk', 'cuPvwk',
        'wQqvwk', 'mvZvwk', 'AvUvwk', 'EbbeŸB', 'beŸB', 'GKvbeŸB', 'weivbeŸB', 'wZivbeŸB',
        'PyivbeŸB', 'cuPvbeŸB', 'wQqvbeŸB', 'mvZvbeŸB', 'AvUvbeŸB', 'wbivbeŸB'
    ];

    if (parseInt(number).toString().length > 9) {
        return "9 wWwR‡Ui g‡a¨ ivLyb";
    }

    const num = parseInt(number);
    const createBigString = "000000000" + num.toString();
    const createNineDigit = "1" + createBigString.substring(createBigString.length - 9, createBigString.length);
    const localStr = parseInt(createNineDigit).toLocaleString('en-IN');

    const splitString = localStr.split(',');

    let st1 = '';
    let st2 = '';
    let st3 = '';
    let st4 = '';

    if (parseInt(splitString[1]) === 0) {
        st1 = '';
    } else {
        st1 = num_to_bd[parseInt(splitString[1])] + " †KvwU ";
    }

    if (parseInt(splitString[2]) === 0) {
        st2 = '';
    } else {
        st2 = num_to_bd[parseInt(splitString[2])] + " j¶ ";
    }

    if (parseInt(splitString[3]) === 0) {
        st3 = '';
    } else {
        st3 = num_to_bd[parseInt(splitString[3])] + " nvRvi ";
    }



    const firstPart = splitString[4].substring(0, 1);
    const restPart = splitString[4].substring(1, 3);

    let s = '';
    if (parseInt(splitString[4]) === 0) {
        st4 = '';
    } else {

        if (parseInt(firstPart) === 0) {
            s = '';
        } else {
            s = num_to_bd[parseInt(firstPart)] + " kZ ";
        }

        if (parseInt(restPart) === 0) {
            s = s + '';
        } else {
            s = s + num_to_bd[parseInt(restPart)];
        }
        st4 = s;
    }


    const result = st1 + st2 + st3 + st4;
    return result;
};

