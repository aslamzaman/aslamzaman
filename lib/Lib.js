export const Lib = {
    util: {
        daysArray: [
            "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
        ],
        monthEnArr: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        monthBnArr: [
            "Rvbyqvix",
            "†deªæqvix",
            "gvP©",
            "GwcÖj",
            "†g",
            "Ryb",
            "RyjvB",
            "AvMó",
            "†m‡Þ¤^i",
            "A‡±vei",
            "b‡f¤^i",
            "wW‡m¤^i"
        ],
        monthsObj: [
            { bn: "Rvbyqvix", en: "January" },
            { bn: "†deªæqvix", en: "February" },
            { bn: "gvP©", en: "March" },
            { bn: "GwcÖj", en: "April" },
            { bn: "†g", en: "May" },
            { bn: "Ryb", en: "June" },
            { bn: "RyjvB", en: "July" },
            { bn: "AvMó", en: "August" },
            { bn: "†m‡Þ¤^i", en: "September" },
            { bn: "A‡±vei", en: "October" },
            { bn: "b‡f¤^i", en: "November" },
            { bn: "wW‡m¤^i", en: "December" }
        ],
        yearObj: [
            { yr: 2023 },
            { yr: 2024 },
            { yr: 2025 },
            { yr: 2026 },
            { yr: 2027 },
            { yr: 2028 },
            { yr: 2029 },
            { yr: 2030 },
            { yr: 2031 },
            { yr: 2032 },
            { yr: 2033 },
            { yr: 2034 },
            { yr: 2035 },
            { yr: 2036 },
            { yr: 2037 },
            { yr: 2038 },
            { yr: 2039 },
            { yr: 2040 }
        ],
        dateFormat(dt, format) {
            // *** date_format:("2010-06-25",".")      result= 25.06.2010
            var d = new Date(dt);
            if (format === "-") {
                return d.getFullYear() + "-" + this.daysArray[d.getMonth() + 1] + "-" + this.daysArray[d.getDate()];
            } else if (format === "long") {
                return this.monthEnArr[d.getMonth()] + " " + this.daysArray[d.getDate()] + ", " + d.getFullYear();
            } else {
                return this.daysArray[d.getDate()] + "." + this.daysArray[d.getMonth() + 1] + "." + d.getFullYear();
            }
        },
        dateTimeFormat(dt) {
            var d = new Date(dt);
            return d.getFullYear() + "-" + this.daysArray[d.getMonth() + 1] + "-" + this.daysArray[d.getDate()] + " | " + this.daysArray[d.getHours() + 1] + ":" + this.daysArray[d.getMinutes() + 1] + ":" + this.daysArray[d.getSeconds() + 1];
        },
        dateFormatBn(dt) {
            var d = new Date(dt);
            return this.daysArray[d.getDate()] + " " + this.monthBnArr[d.getMonth()] + ", " + d.getFullYear();
        },
        yearsMontshDays(d1, d2) {
            let a = new Date(d1).getTime();
            let b = new Date(d2).getTime();
            let days = (b - a) / 86400000; // days

            let y = Math.floor(days / 365); // yrs
            let yrsToDays = days % 365; // days

            let m = Math.floor(yrsToDays / 30); // months
            let d = yrsToDays % 30; // days

            let ret = y + "yrs. " + m + "months " + d + "days";
            return ret;
        },
        lastDayInMonth(yyyy, m) {
            // example (2021, 0) = 31 ; (2021, 1) = 28;
            let dt = new Date(yyyy, (parseInt(m) + 1), 0);
            return dt.getDate();
        },
        Age(dt) {
            let d1 = new Date(dt);
            let d2 = d1.getTime();
            let d3 = new Date();
            let d4 = d3.getTime();
            let d5 = (d4 - d2) / (1000 * 60 * 60 * 24 * 365);
            return d5.toFixed(2);
        },
        dateDiff(dt1, dt2, add_one_day) {
            let d1 = new Date(dt1);
            let d2 = d1.getTime();
            let d3 = new Date(dt2);
            let d4 = d3.getTime();
            let d5 = 0;
            if (add_one_day === 1) {
                d5 = ((d4 - d2) + (3600000 * 24)) / (3600000 * 24);
            } else {
                d5 = (d4 - d2) / (3600000 * 24);
            }
            return d5;
        },
        titleCase(str) {
            return str
                .split(" ")
                .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
        },
        dateAdd(dt, days) {
            let d1 = new Date(dt);
            let dt_to_time = d1.getTime();
            let days_to_time = days * 86400 * 1000;
            let total_time = parseInt(dt_to_time) + parseInt(days_to_time);
            let date_add = new Date(total_time);
            return date_add;
        },
        manulalDateDiff(d1, d2) {
            var d1 = new Date(d1);
            var d2 = new Date(d2);

            let dt1 = d1.getFullYear() + "-" + this.daysArray[d1.getMonth() + 1] + "-" + this.daysArray[d1.getDate()];
            let dt2 = d2.getFullYear() + "-" + this.daysArray[d2.getMonth() + 1] + "-" + this.daysArray[d2.getDate()];

            let sp1 = dt1.split("-");
            let sp2 = dt2.split("-");

            let extMonth = 0;
            let d = 0;
            let extYrs = 0;
            let m = 0;
            let y = 0;

            // Days 
            if (parseInt(sp2[2]) < parseInt(sp1[2])) {
                extMonth = 1;
                d = ((parseInt(sp2[2]) + 30) - parseInt(sp1[2]));
            } else {
                extMonth = 0;
                d = (parseInt(sp2[2]) - parseInt(sp1[2]));
            }

            // Months 
            if (parseInt(sp2[1]) < (parseInt(sp1[1]) + extMonth)) {
                extYrs = 1;
                m = ((parseInt(sp2[1]) + 12) - (parseInt(sp1[1]) + extMonth));
            } else {
                extYrs = 0;
                m = (parseInt(sp2[1]) - (parseInt(sp1[1]) + extMonth));
            }

            // Years 
            y = (parseInt(sp2[0]) - (parseInt(sp1[0]) + extYrs));

            let result = y + " years " + m + " months " + d + " days";
            return result;
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        uniqueArr(x) {
            let unique = x.filter((item, index) => {
                return x.indexOf(item) === index;
            })
            return unique;
        },
        inword: {
            en(num) {
                let a = [
                    "",
                    "one ",
                    "two ",
                    "three ",
                    "four ",
                    "five ",
                    "six ",
                    "seven ",
                    "eight ",
                    "nine ",
                    "ten ",
                    "eleven ",
                    "twelve ",
                    "thirteen ",
                    "fourteen ",
                    "fifteen ",
                    "sixteen ",
                    "seventeen ",
                    "eighteen ",
                    "nineteen ",
                ];
                let b = [
                    "",
                    "",
                    "twenty",
                    "thirty",
                    "forty",
                    "fifty",
                    "sixty",
                    "seventy",
                    "eighty",
                    "ninety",
                ];

                if ((num = num.toString()).length > 9) return "overflow";
                let n = ("000000000" + num)
                    .substr(-9)
                    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                if (!n) return;
                var str = "";
                str +=
                    n[1] != 0
                        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
                        : "";
                str +=
                    n[2] != 0
                        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
                        : "";
                str +=
                    n[3] != 0
                        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
                        : "";
                str +=
                    n[4] != 0
                        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
                        : "";
                str +=
                    n[5] != 0
                        ? (str != "" ? "and " : "") +
                        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]])
                        : "";
                return str;
            },
            bn(number) {
                let num_to_bd = [
                    'k~b¨',
                    'GK',
                    '`yB',
                    'wZb',
                    'Pvi',
                    'cvuP',
                    'Qq',
                    'mvZ',
                    'AvU',
                    'bq',
                    '`k',
                    'GMvi',
                    'evi',
                    '‡Zi',
                    '‡PŠÏ',
                    'c‡bi',
                    '‡lvj',
                    'm‡Zi',
                    'AvVvi',
                    'Ewbk',
                    'wek',
                    'GKyk',
                    'evBk',
                    '‡ZBk',
                    'PweŸk',
                    'cuwPk',
                    'QvweŸk',
                    'mvZvk',
                    'AvVvk',
                    'EbwÎk',
                    'wÎk',
                    'GKwÎk',
                    'ewÎk',
                    '‡ZwÎk',
                    '‡PŠwÎk',
                    'cuh়wÎk',
                    'QwÎk',
                    'mvuBwÎk',
                    'AvUwÎk',
                    'EbPwjøk',
                    'Pwjøk',
                    'GKPwjøk',
                    'weqvwjøk',
                    '‡ZZvwjøk',
                    'Pyqvwjøk',
                    'cuqZvwjøk',
                    '‡QPwjøk',
                    'mvZPwjøk',
                    'AvUPwjøk',
                    'EbcÂvk',
                    'cÂvk',
                    'GKvbœ',
                    'evqvbœ',
                    'wZàvbœ',
                    'Pyqvbœ',
                    'cÂvbœ',
                    'Qvàvbœ',
                    'mvZvbœ',
                    'AvUvbœ',
                    'EblvU',
                    'lvU',
                    'GKlwÆ',
                    'evlwÆ',
                    '‡ZlwÆ',
                    '‡PŠlwÆ',
                    'cuqlwÆ',
                    '‡QlwÆ',
                    'mvZlwÆ',
                    'AvUlwÆ',
                    'EbmËi',
                    'mËi',
                    'GKvËi',
                    'evnvËi',
                    'wZqvËi',
                    'PyqvËi',
                    'cuPvËi',
                    'wQqvËi',
                    'mvZvËi',
                    'AvUvËi',
                    'EbAvwk',
                    'Avwk',
                    'GKvwk',
                    'weivwk',
                    'wZivwk',
                    'Pyivwk',
                    'cuPvwk',
                    'wQqvwk',
                    'mvZvwk',
                    'AvUvwk',
                    'EbbeŸB',
                    'beŸB',
                    'GKvbeŸB',
                    'weivbeŸB',
                    'wZivbeŸB',
                    'PyivbeŸB',
                    'cuPvbeŸB',
                    'wQqvbeŸB',
                    'mvZvbeŸB',
                    'AvUvbeŸB',
                    'wbivbeŸB'
                ];

                let num = parseInt(number);
                //00,00,20,000
                let n = "000000000000" + num.toString();
                let n1 = n.substring((n.length - 9), n.length);
                let n2 = n1.toString();
                let n3 = n2.split("");

                let c1 = parseInt(n3[0] + n3[1]);
                let c2 = parseInt(n3[2] + n3[3]);
                let c3 = parseInt(n3[4] + n3[5]);
                let c4 = parseInt(n3[6]);
                let c5 = parseInt(n3[7] + n3[8]);

                let st1 = "";
                let st2 = "";
                let st3 = "";
                let st4 = "";
                let st5 = "";

                if (c1 === 0) {
                    st1 = "";
                } else {
                    st1 = num_to_bd[c1] + " †KvwU ";
                }

                if (c2 === 0) {
                    st2 = "";
                } else {
                    st2 = num_to_bd[c2] + " j¶ ";
                }

                if (c3 === 0) {
                    st3 = "";
                } else {
                    st3 = num_to_bd[c3] + " nvRvi ";
                }


                if (c4 === 0) {
                    st4 = "";
                } else {
                    st4 = num_to_bd[c4] + " kZ ";
                }

                if (c5 === 0) {
                    st5 = "";
                } else {
                    st5 = num_to_bd[c5];
                }

                if (number.length > 9) {
                    return "Amxg";
                } else {
                    return st1 + st2 + st3 + st4 + st5;
                }
            }
        },
        landarea: {
            sft(area, opt) {
                let sft = 0;           
                switch (opt) {
                    case "sf":
                        sft = (parseFloat(area) * 1);
                        break;
                    case "sm":
                        sft = (parseFloat(area) * 10.7639);
                        break;
                    case "sc":
                        sft = (parseFloat(area) * 4356);
                        break;
                    case "ojutangsho":
                        sft = (parseFloat(area) * 4.356);
                        break;
                    case "shotok":
                        sft = (parseFloat(area) * 435.6);
                        break;
                    case "katha":
                        sft = (parseFloat(area) * 720);
                        break;
                    case "bigha":
                        sft = (parseFloat(area) * 14400);
                        break;
                    case "kani":
                        sft = (parseFloat(area) * 17280);
                        break;
                    case "acre":
                        sft = (parseFloat(area) * 43560);
                        break;
                    case "hectare":
                        sft = (parseFloat(area) * 107639);
                        break;
                    case "gonda":
                        sft = (parseFloat(area) * 864);
                        break;
                    case "kora":
                        sft = (parseFloat(area) * 653.4);
                        break;
                    case "kranti":
                        sft = (parseFloat(area) * 72);
                        break;
                    case "til":
                        sft = (parseFloat(area) * 3.6);
                        break;
                    case "slink":
                        sft = (parseFloat(area) * 0.4356);
                        break;
                    default:
                        sft = 0;
                }
                return sft;
            },
            result(area, opt) {
                let x = this.sft(area, opt);
                let obj = {
                    sft: x.toFixed(3),
                    sm: (x / 10.7639).toFixed(3),
                    sc: (x / 4356).toFixed(3),
                    ojutangsho: (x / 4.356).toFixed(3),
                    shotok: (x / 435.6).toFixed(3),
                    katha: (x / 720).toFixed(3),
                    bigha: (x / 14400).toFixed(3),
                    kani: (x / 17280).toFixed(3),
                    acre: (x / 43560).toFixed(3),
                    hectare: (x / 107639).toFixed(3),
                    gonda: (x / 864).toFixed(3),
                    kora: (x / 653.4).toFixed(3),
                    kranti: (x / 72).toFixed(3),
                    til: (x / 3.6).toFixed(3),
                    link: (x / 0.4356).toFixed(3)
                }
                return obj
            }
        }
    },
    format: {
        leave({ doc }) {
            doc.addImage("/images/cmes_logo/cmes.png", "PNG", 20, 10, 10, 15);
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(24);

            doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, 20, null, null, "center");
            doc.text("QywUi dig", 105, 30, null, null, "center");
            doc.setFontSize(14);
            doc.text("ZvwiL: ..........................", (210 - 12), 40, null, null, "right");
            doc.text("bvg: .................................................. c`ex:................................................. cÖ‡R±:.....................", 20, 50, null, null, "left");
            doc.text("QywUi KviY/weeiY: .......................................................................................................................", (20), 60, null, null, "left");
            doc.text("cÖv_©xZ QzwUi mgqKvj: ........................ ZvwiL †_‡K ....................... ZvwiL ch©šÍ ........... w`b........... N›Uv", 20, 70, null, null, "left");

            doc.text("eivei", (20), 85, null, null, "left");
            doc.text("wbe©vnx cwiPvjK", 20, 92, null, null, "left");
            doc.text("wmGgBGm, XvKv", 20, 99, null, null, "left");
            doc.text("wcÖq g‡nv`q,", 20, 113, null, null, "left");


            doc.text("webxZ wb‡e`K                    ", 198, 200, null, null, "right");
            doc.text("¯^v¶i:                             ", 198, 210, null, null, "right");  // sakhkhor


            doc.text("PjwZ eQ‡i †fvMK…Z QzwUi cÖK…wZ:", 20, 223, null, null, "left");
            doc.text("QywUi Z_¨:                         ", 198, 223, null, null, "right");

            doc.line(20, 219, 198, 219) // horizontal line

            doc.text("‰bwgwËK QzwU (    )= ........ w`b", 20, 230, null, null, "left");
            doc.text("1g, 2q, 3q I 4_© †KvqvU©v‡i cÖvc¨ QywU =........w`b             ", 198, 230, null, null, "right");


            doc.text("AwR©Z QzwU (    )=  .......... w`b", 20, 237, null, null, "left");
            doc.text("BwZc~‡e© †fvMK…Z QzwU =........w`b             ", 198, 237, null, null, "right");

            doc.setFont('courier', 'normal');
            doc.text("CL", 42, 230, null, null, "left");
            doc.text("EL", 39, 237, null, null, "left");

            doc.setFont("SutonnyMJ", "normal");
            doc.text("Av‡e`bK…Z QzwU = ............ w`b......... N›Uv", 20, 244, null, null, "left");
            doc.text("Av‡e`bK…Z QzwU = ........w`b....... N›Uv", 198, 244, null, null, "right");
            doc.line(20, 245, 93, 245) // horizontal line
            doc.line(125, 245, 198, 245) // horizontal line

            doc.text("†gvU QywU = ..................... w`b......... N›Uv", 20, 252, null, null, "left");
            doc.text("Aewkó/AwZwi³ QywU =.........w`b....... N›Uv", 198, 252, null, null, "right");


            doc.text("Aby‡gv`bKvixi ¯^v¶i: ", 20, 277, null, null, "left");
            doc.text("¯^v¶i:                          ", 198, 277, null, null, "right");

            doc.text("wbe©vnx cwiPvjK", 20, 284, null, null, "left");
            doc.text("cÖkvmb DBs.....................", 198, 284, null, null, "right");
        },
        localTaUp({ doc }) {
            let tm = 18;
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(20);

            doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, tm, null, null, "center");
            doc.text("¯’vbxq ågY fvZv wej", 105, tm + 7, null, null, "center");

            doc.setFontSize(14);
            doc.text("ågYKvixi bvg I c`ex t....................................................................", 12, tm + 19, null, null, "left");
            doc.text("ZvwiL t................................", 199, tm + 18, null, null, "right");
            doc.text("åg‡Yi D‡Ïk¨ t...............................................................................", 12, tm + 27, null, null, "left");
            doc.text("Ae¯’vb t...............................", 199, tm + 27, null, null, "right");

            doc.line(12, tm + 31, 199, tm + 31); // horizontal line
            doc.line(12, tm + 37, 199, tm + 37); // horizontal line
            doc.line(12, tm + 43, 199, tm + 43); // horizontal line
            doc.line(12, tm + 91, 199, tm + 91); // horizontal line
            doc.line(12, tm + 97, 199, tm + 97); // horizontal line

            doc.line(12, tm + 31, 12, tm + 97); // vertical line
            doc.line(42, tm + 37, 42, tm + 91); // vertical line
            doc.line(55, tm + 31, 55, tm + 91); // vertical line
            doc.line(84, tm + 37, 84, tm + 91); // vertical line
            doc.line(99, tm + 31, 99, tm + 91); // vertical line
            doc.line(114, tm + 37, 114, tm + 91); // vertical line
            doc.line(144, tm + 37, 144, tm + 91); // vertical line
            doc.line(157, tm + 37, 157, tm + 97); // vertical line
            doc.line(176, tm + 31, 176, tm + 97); // vertical line
            doc.line(199, tm + 31, 199, tm + 97); // vertical line

            //-------------------------------------
            doc.line(0, 148.5, 5, 148.5);
            doc.line(102.5, 148.5, 107.5, 148.5);
            doc.line(205, 148.5, 210, 148.5);
            //-------------------------------------

            doc.text("cÖ¯’vb", 32, tm + 35.5, null, null, "center"); // prosthan
            doc.text("Dcw¯’Z", 78, tm + 35.5, null, null, "center");  // uposthit
            doc.text("hvbevnb I fvZv (UvKv)", 137, tm + 35.5, null, null, "center");  // janbahon o vata taka
            doc.text("†gvU UvKv", 188, tm + 35.5, null, null, "center");  // mote taka

            doc.text("¯’vb", 27, tm + 41.5, null, null, "center"); // sthan
            doc.text("mgq", 48, tm + 41.5, null, null, "center"); // somoy
            doc.text("¯’vb", 69, tm + 41.5, null, null, "center"); // sthan
            doc.text("mgq", 92, tm + 41.5, null, null, "center"); // somoy
            doc.text("evm", 107, tm + 41.5, null, null, "center"); // bas
            doc.text("wmGbwR", 130, tm + 41.5, null, null, "center"); // cng 
            doc.text("wi·v", 151.5, tm + 41.5, null, null, "center"); // autorikshaw 
            doc.text("Ab¨vb¨", 167, tm + 41.5, null, null, "center"); // onnaono

            doc.text("UvKv (K_vq)t", 24, tm + 95.5, null, null, "center"); //  taka kothay
            doc.text("†gvU UvKv", 166, tm + 95.5, null, null, "center"); // mote taka

            doc.text("ågYKvixi ¯^vÿi", 12, tm + 116.5, null, null, "left"); // vromonkarir sakkhor
            doc.text("cÖwZ ¯^vÿi", 78, tm + 116.5, null, null, "center"); // proti sakkhor
            doc.text("wefvMxq cÖavb/mwPe", 135, tm + 116.5, null, null, "center"); // bivagio prodhan/ sochib
            doc.text("wnmve wefvM", 199, tm + 116.5, null, null, "right"); // hisab bivag

            doc.line(12, tm + 111.5, 38, tm + 111.5); // horizontal line 
            doc.line(68, tm + 111.5, 88, tm + 111.5); // horizontal line   
            doc.line(119, tm + 111.5, 150.5, tm + 111.5); // horizontal line  
            doc.line(179, tm + 111.5, 199, tm + 111.5); // horizontal line  
        },
        localTaDn({ doc }) {
            let tm = 18;

            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(20);

            doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, tm + 148, null, null, "center");
            doc.text("¯’vbxq ågY fvZv wej", 105, tm + 7 + 148, null, null, "center");

            doc.setFontSize(14);
            doc.text("ågYKvixi bvg I c`ex t....................................................................", 12, tm + 19 + 148, null, null, "left");
            doc.text("ZvwiL t................................", 199, tm + 18 + 148, null, null, "right");
            doc.text("åg‡Yi D‡Ïk¨ t...............................................................................", 12, tm + 27 + 148, null, null, "left");
            doc.text("Ae¯’vb t...............................", 199, tm + 27 + 148, null, null, "right");

            doc.line(12, tm + 31 + 148, 199, tm + 31 + 148); // horizontal line
            doc.line(12, tm + 37 + 148, 199, tm + 37 + 148); // horizontal line
            doc.line(12, tm + 43 + 148, 199, tm + 43 + 148); // horizontal line
            doc.line(12, tm + 91 + 148, 199, tm + 91 + 148); // horizontal line
            doc.line(12, tm + 97 + 148, 199, tm + 97 + 148); // horizontal line

            doc.line(12, tm + 31 + 148, 12, tm + 97 + 148); // vertical line    
            doc.line(42, tm + 37 + 148, 42, tm + 91 + 148); // vertical line
            doc.line(55, tm + 31 + 148, 55, tm + 91 + 148); // vertical line
            doc.line(84, tm + 37 + 148, 84, tm + 91 + 148); // vertical line
            doc.line(99, tm + 31 + 148, 99, tm + 91 + 148); // vertical line
            doc.line(114, tm + 37 + 148, 114, tm + 91 + 148); // vertical line
            doc.line(144, tm + 37 + 148, 144, tm + 91 + 148); // vertical line
            doc.line(157, tm + 37 + 148, 157, tm + 97 + 148); // vertical line
            doc.line(176, tm + 31 + 148, 176, tm + 97 + 148); // vertical line
            doc.line(199, tm + 31 + 148, 199, tm + 97 + 148); // vertical line

            doc.text("cÖ¯’vb", 32, tm + 35.5 + 148, null, null, "center"); // prosthan
            doc.text("Dcw¯’Z", 78, tm + 35.5 + 148, null, null, "center");  // uposthit
            doc.text("hvbevnb I fvZv (UvKv)", 137, tm + 35.5 + 148, null, null, "center");  // janbahon o vata taka
            doc.text("†gvU UvKv", 188, tm + 35.5 + 148, null, null, "center");  // mote taka

            doc.text("¯’vb", 27, tm + 41.5 + 148, null, null, "center"); // sthan
            doc.text("mgq", 48, tm + 41.5 + 148, null, null, "center"); // somoy
            doc.text("¯’vb", 69, tm + 41.5 + 148, null, null, "center"); // sthan
            doc.text("mgq", 92, tm + 41.5 + 148, null, null, "center"); // somoy
            doc.text("evm", 107, tm + 41.5 + 148, null, null, "center"); // bas
            doc.text("wmGbwR", 130, tm + 41.5 + 148, null, null, "center"); // cng 
            doc.text("wi·v", 151.5, tm + 41.5 + 148, null, null, "center"); // autorikshaw 
            doc.text("Ab¨vb¨", 167, tm + 41.5 + 148, null, null, "center"); // onnaono

            doc.text("UvKv (K_vq)t", 24, tm + 95.5 + 148, null, null, "center"); //  taka kothay
            doc.text("†gvU UvKv", 166, tm + 95.5 + 148, null, null, "center"); // mote taka

            doc.text("ågYKvixi ¯^vÿi", 12, tm + 116.5 + 148, null, null, "left"); // vromonkarir sakkhor
            doc.text("cÖwZ ¯^vÿi", 78, tm + 116.5 + 148, null, null, "center"); // proti sakkhor
            doc.text("wefvMxq cÖavb/mwPe", 135, tm + 116.5 + 148, null, null, "center"); // bivagio prodhan/ sochib
            doc.text("wnmve wefvM", 199, tm + 116.5 + 148, null, null, "right"); // hisab bivag

            doc.line(12, tm + 111.5 + 148, 38, tm + 111.5 + 148); // horizontal line 
            doc.line(68, tm + 111.5 + 148, 88, tm + 111.5 + 148); // horizontal line   
            doc.line(119, tm + 111.5 + 148, 150.5, tm + 111.5 + 148); // horizontal line  
            doc.line(179, tm + 111.5 + 148, 199, tm + 111.5 + 148); // horizontal line

        },
        localtaDbl({ doc }) {
            this.localTaUp({ doc });
            this.localTaDn({ doc });
        },
        taBill({ doc }) {
            let tm = 25;
            //doc.addImage("/images/format/TA BILL.png", "PNG", 0, 0, 210, 297);

            doc.addImage("/images/cmes_logo/cmes.png", "PNG", 25, 15, 10, 15);

            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(26.5);

            doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 112, tm, null, null, "center");
            doc.setFontSize(16);
            doc.text("evwo bs- 5/4, eøK - Gd, jvjgvwUqv, XvKv- 1207", 112, tm + 8, null, null, "center");
            doc.setFontSize(26.5);
            doc.text("hvZvqvZ wej", 105, tm + 28, null, null, "center");

            doc.setFontSize(14);
            doc.text("ågYKvixi bvg t......................................................................", 12, tm + 45, null, null, "left");
            doc.text("c`ex t................................", 199, tm + 45, null, null, "right");
            doc.text("Ae¯’vbt mv‡m/BDwbU t..............................................................", 12, tm + 53, null, null, "left");
            doc.text("cÖKí t................................", 199, tm + 53, null, null, "right");

            doc.line(12, tm + 62.5, 202, tm + 62.5); // horizontal line
            doc.line(12, tm + 69.5, 202, tm + 69.5); // horizontal line
            doc.line(12, tm + 198, 202, tm + 198); // horizontal line
            doc.line(12, tm + 205, 202, tm + 205); // horizontal line
            doc.line(12, tm + 212, 202, tm + 212); // horizontal line

            doc.line(12, tm + 62.5, 12, tm + 212); // vertical line
            doc.line(25, tm + 62.5, 25, tm + 205); // vertical line
            doc.line(45, tm + 62.5, 45, tm + 198); // vertical line
            doc.line(57, tm + 62.5, 57, tm + 198); // vertical line
            doc.line(77, tm + 62.5, 77, tm + 198); // vertical line
            doc.line(90, tm + 62.5, 90, tm + 198); // vertical line
            doc.line(150, tm + 62.5, 150, tm + 198); // vertical line
            doc.line(163, tm + 62.5, 163, tm + 198); // vertical line
            doc.line(183, tm + 62.5, 183, tm + 198); // vertical line
            doc.line(202, tm + 62.5, 202, tm + 212); // vertical line

            doc.text("ZvwiL", 18, tm + 68, null, null, "center");
            doc.text("†Kv_v n‡Z", 34, tm + 68, null, null, "center");
            doc.text("mgq", 51, tm + 68, null, null, "center");
            doc.text("†Kvb ch©šÍ", 66.5, tm + 68, null, null, "center");
            doc.text("mgq", 83, tm + 68, null, null, "center");
            doc.text("D‡Ïk¨", 116, tm + 68, null, null, "center");
            doc.text("evnb", 156, tm + 68, null, null, "center");
            doc.text("UvKv", 173, tm + 68, null, null, "center");
            doc.text("gšÍe¨", 194, tm + 68, null, null, "center");

            doc.text("wW.G.c~Y©w`b/ Aa©w`b t", 44, tm + 203, null, null, "center");
            doc.text("†gvU UvKv (K_vq) t", 30, tm + 210, null, null, "center");

            doc.text("wnmve wefvM", 12, tm + 240, null, null, "left");
            doc.text("ågYKvixi ¯^vÿi t   ", 199, tm + 240, null, null, "right");
            doc.text("ZvwiL t................", 199, tm + 247, null, null, "right");
        },
        bayprostab({ doc }) {
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(20);
            doc.text('wmGgBGm', 105, 20.5, null, null, "center");
            doc.setFontSize(16);
            doc.text('†K›`ªxq e¨q', 105, 26, null, null, "center");
            doc.text('cÖ‡R±:', 178.438, 26, null, null, "left");

            let lnt = 34;
            let lng = 6.5;

            doc.setFontSize(14);
            doc.text('e¨q cÖ¯Íve', 13, (lnt + (lng * 0)), null, null, "left");
            doc.text('e¨q cÖ¯ÍveKvixi bvgt', 13, (lnt + (lng * 1)), null, null, "left");
            doc.text('LvZt', 13, (lnt + (lng * 2)), null, null, "left");
            doc.text('welqt', 13, (lnt + (lng * 3)), null, null, "left");


            doc.text('ZvwiLt ', 133, (lnt + (lng * 0)), null, null, "left");
            doc.text('e¨qcÖ¯Íve bs t', 133, (lnt + (lng * 1)), null, null, "left");
            doc.text('BwZg‡a¨ m¤úvw`Z e¨q t  ', 133, (lnt + (lng * 4)), null, null, "left");

            doc.text('cwiKíbv m~Î (bs mn)', 13, (lnt + (lng * 5)), null, null, "left");
            doc.text('cÖv°wjZ e¨q', 13, (lnt + (lng * 6)), null, null, "left");
            doc.text('(cÖvmw½K KvMRcÎ ms‡hvwhZ Kiæb)', 105, (lnt + (lng * 6)), null, null, "center");

            doc.line(13, (lnt + 2 + (lng * 6)), 200, (lnt + 2 + (lng * 6))) // horizontal line
            doc.line(13, (lnt + 21 + (lng * 6)), 200, (lnt + 21 + (lng * 6))) // horizontal line
            doc.line(13, (lnt + 140 + (lng * 6)), 200, (lnt + 140 + (lng * 6))) // horizontal line
            doc.line(13, (lnt + 147 + (lng * 6)), 200, (lnt + 147 + (lng * 6))) // horizontal line


            doc.line(69.681, (lnt + 2 + (lng * 6)), 69.681, (lnt + 147 + (lng * 6))) // vertical line
            doc.line(13, (lnt + 2 + (lng * 6)), 13, (lnt + 147 + (lng * 6))) // vertical line
            doc.line(92.099, (lnt + 2 + (lng * 6)), 92.099, (lnt + 147 + (lng * 6))) // vertical line
            doc.line(111.661, (lnt + 2 + (lng * 6)), 111.661, (lnt + 147 + (lng * 6))) // vertical line
            doc.line(133.222, (lnt + 2 + (lng * 6)), 133.222, (lnt + 147 + (lng * 6))) // vertical line
            doc.line(149.499, (lnt + 2 + (lng * 6)), 149.499, (lnt + 147 + (lng * 6))) // vertical line
            doc.line(200, (lnt + 2 + (lng * 6)), 200, (lnt + 147 + (lng * 6))) // vertical line


            doc.text('`ªe¨/mvwf©m', 42.071, 83.781, null, null, "center");
            doc.text('BDwbU', 81.246, 83.781, null, null, "center");
            doc.text('BDwbU', 101.641, 83.781, null, null, "center");
            doc.text('†gvU', 122.844, 83.781, null, null, "center");
            doc.text('cÖ¯ÍvweZ', 141.321, 83.781, null, null, "center");
            doc.text('mieivnkZ©/‡Kv‡Ukb/b¨vh¨-', 174.347, 83.781, null, null, "center");

            doc.text('(†¯úwmwd‡Kkb)', 42.071, 87.618, null, null, "center");
            doc.text('g~j¨', 81.246, 87.618, null, null, "center");
            doc.text('msL¨v', 101.641, 87.618, null, null, "center");
            doc.text('g~j¨', 122.844, 87.618, null, null, "center");
            doc.text('mieivn', 141.321, 87.618, null, null, "center");
            doc.text('g~j¨ wbwðZKiY mieivn c×wZ', 174.347, 87.618, null, null, "center");
            doc.text('Drm', 141.321, 91.657, null, null, "center");

            doc.text('†gvU', 42.071, 218, null, null, "center");
            doc.text('†gvU cÖv°wjZ e¨q (K_vq)t', 13, 226.144, null, null, "left");

            doc.text('g‡bvbxZ µq m¤úv`‡Ki bvg t', 110.930, 237.957, null, null, "left");
            doc.text('mnvqZvKvix t', 110.930, 244.217, null, null, "left");
            doc.text('cÖ¯ÍveKvix t', 110.930, 250.073, null, null, "left");

            doc.text('†Pqvig¨vb', 13.930, 280.767, null, null, "left");
            doc.text('¯^vÿi', 105, 276.728, null, null, "center");
            doc.text('KwgwU m`m¨MY/mgš^qKvix', 105, 280.767, null, null, "center");


            //************************************************************************** */
            doc.addPage("a4", "p");

            doc.text('cÖ‡R±:', 178.438, 26, null, null, "left");
            doc.setFontSize(14);
            doc.setFont("SutonnyMJ", "bold");
            doc.text('e¨q cÖ¯Íve m¤úv`b', 13, 32, null, null, "left");
            doc.setFont("SutonnyMJ", "normal");
            doc.text('µq m¤úv`Kt ................................................', 13, 38, null, null, "left");
            doc.text('µq mnvqZvKvix (hw` _v‡K) ......................................', 105, 38, null, null, "left");
            doc.text('AwMÖ‡gi cwigvbt .............................', 13, 46, null, null, "left");
            doc.text('AwMÖg MÖn‡bi ZvwiL t ................................................', 105, 46, null, null, "left");
            doc.text('m¤úvw`Z e¨qt    .............................', 13, 54, null, null, "left");
            doc.line(40, 55, 80, 55) // horizontal line
            doc.text('†diZ t            .............................', 13, 62, null, null, "left");


            doc.text('(cÖvmw½K KvMRcÎ ms‡hvwhZ Kiæb)', 105, 70, null, null, "center");
            // 78.084   80.911
            doc.line(13, 72, 200, 72) // horizontal line
            doc.line(13, 92, 200, 92) // horizontal line
            doc.line(13, 230, 200, 230) // horizontal line
            doc.line(13, 237, 200, 237) // horizontal line

            doc.line(13, 72, 13, 237) // vertical line
            doc.line(69.300, 72, 69.300, 237) // vertical line
            doc.line(92.321, 72, 92.321, 237) // vertical line
            doc.line(111.302, 72, 111.302, 237) // vertical line
            doc.line(133.919, 72, 133.919, 237) // vertical line
            doc.line(150, 72, 150, 237) // vertical line
            doc.line(200, 72, 200, 237) // vertical line

            doc.text('`ªe¨/mvwf©m', 40.727, 84, null, null, "center");
            doc.text('(†¯úwmwd‡Kkb)', 40.727, 90, null, null, "center");

            doc.text('BDwbU', 81.012, 84, null, null, "center");
            doc.text('g~j¨', 81.012, 90, null, null, "center");

            doc.text('BDwbU', 101.408, 84, null, null, "center");
            doc.text('msL¨v', 101.408, 90, null, null, "center");

            doc.text('†gvU', 122.207, 84, null, null, "center");
            doc.text('g~j¨', 122.207, 90, null, null, "center");


            doc.text('cÖ¯ÍvweZ', 141.5, 78, null, null, "center");
            doc.text('mieivn', 141.5, 84, null, null, "center");
            doc.text('Drm', 141.5, 90, null, null, "center");


            doc.text('gšÍe¨ (cÖvwß, †KvqvwjwU,', 175, 78, null, null, "center");
            doc.text('g~‡j¨I b¨vh¨Zv) ms¯’vcb', 175, 84, null, null, "center");
            doc.text('I wn‡me wefvM', 175, 90, null, null, "center");


            // ok 
            doc.text('†gvU', 42.544, 235, null, null, "center");
            doc.text('†gvU e¨q (K_vq)t', 13, 241, null, null, "left");
            doc.text('e¨q cÖ¯ÍveKvixi gšÍe¨ I ¯^vÿi t', 130.991, 248, null, null, "left");
            doc.text('AwMÖg mgš^q Ki‡Yi ZvwiLt', 13, 248, null, null, "left");

            // ok
            doc.text('¯^vÿi', 105, 271.729, null, null, "center");
            doc.text('wbe©vnx cwiPvjK', 13, 277.729, null, null, "left");
            doc.text('wnmve Kg©KZ©v', 105, 277.729, null, null, "center");
            doc.text('µq m¤úv`K', 200, 277.729, null, null, "right");


            /***************************************************************************** */
            doc.addPage("a4", "p");

            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(20);
            doc.text('wmGgBGm', 105, 20.583, null, null, "center");
            doc.setFontSize(16);
            doc.text('m¤ú~Y© Kg© e¨q cwiKíbv', 105, 27.357, null, null, "center");
            doc.text('cÖ‡R±:', 160, 27.357, null, null, "left");

            doc.setFontSize(14);
            doc.text('cwiKíbvKvix t', 13, 35.173, null, null, "left");
            doc.text('ZvwiLt', 160, 35.173, null, null, "left");
            doc.text('(KwgwU I g~L¨ `wqZ¡ cÖvß Kg©KZ©v)', 13, 41.736, null, null, "left");
            doc.text('LvZt', 13, 47.188, null, null, "left");
            doc.text('welqt', 13, 53.246, null, null, "left");
            doc.text('m¤úv`‡bi Kvjt', 13, 59.304, null, null, "left");
            doc.text('ZvwiL ‡_‡Kt', 110.293, 59.304, null, null, "center");
            doc.text('ZvwiL', 185.210, 59.304, null, null, "left");
            doc.text('AvbygvwbK e¨q (h_vm¤¢e we¯ÍvwiZ)', 13, 72.026, null, null, "left");
            doc.text('cÖv°wjZ e¨q', 13, 78.084, null, null, "left");
            doc.text('(cÖvmw½K KvMRcÎ ms‡hvwhZ Kiæb)', 105, 78.084, null, null, "center");

            doc.line(13, 80.911, 200, 80.911) // horizontal line
            doc.line(13, 100.297, 200, 100.2971) // horizontal line
            doc.line(13, 222.063, 200, 222.063) // horizontal line
            doc.line(13, 229.063, 200, 229.063) // horizontal line

            doc.line(13, 80.911, 13, 229.063) // vertical line
            doc.line(69.300, 80.911, 69.300, 229.063) // vertical line
            doc.line(92.321, 80.911, 92.321, 229.063) // vertical line
            doc.line(111.302, 80.911, 111.302, 229.063) // vertical line
            doc.line(133.919, 80.911, 133.919, 229.063) // vertical line
            doc.line(200, 80.911, 200, 229.063) // vertical line

            doc.text('BDwbU', 81.012, 90.402, null, null, "center");
            doc.text('BDwbU', 101.408, 90.402, null, null, "center");
            doc.text('†gvU', 122.207, 90.402, null, null, "center");
            doc.text('m¤¢ve¨ mieivn Drm I g~j¨ Abygv‡bi', 169.459, 90.402, null, null, "center");

            doc.text('AvB‡Ug', 40.727, 94.845, null, null, "center");
            doc.text('g~j¨', 81.012, 94.845, null, null, "center");
            doc.text('msL¨v', 101.408, 94.845, null, null, "center");
            doc.text('g~j¨', 122.207, 94.845, null, null, "center");
            doc.text('wfwË‡Z', 169.459, 94.845, null, null, "center");

            doc.text('†gvU', 42.544, 226.803, null, null, "center");
            doc.text('AvbygvwbK †gvU cÖv°wjZ e¨q ev †gvU g~j¨t', 13, 233.765, null, null, "left");
            doc.text('wnmve Kg©KZ©vi ev‡RU', 130.991, 233.765, null, null, "left");

            doc.text('gšÍe¨ I ¯^vÿi', 130.991, 239.429, null, null, "left");
            doc.text('UvKv (K_vq)t', 13, 239.429, null, null, "left");



            doc.text('¯^vÿi', 105, 271.729, null, null, "center");
            doc.text('†Pqvig¨vb', 13, 277.729, null, null, "left");
            doc.text('KwgwU m`m¨MY/mgš^qKvix', 105, 277.729, null, null, "center");
            doc.text('g~L¨ cwiKíbvKvix', 200, 277.729, null, null, "right");
        },
        bayexecution({ doc }) {
            doc.text('cÖ‡R±:', 178.438, 26, null, null, "left");
            doc.setFontSize(14);
            doc.setFont("SutonnyMJ", "bold");
            doc.text('e¨q cÖ¯Íve m¤úv`b', 13, 32, null, null, "left");
            doc.setFont("SutonnyMJ", "normal");
            doc.text('µq m¤úv`Kt ................................................', 13, 38, null, null, "left");
            doc.text('µq mnvqZvKvix (hw` _v‡K) ......................................', 105, 38, null, null, "left");
            doc.text('AwMÖ‡gi cwigvbt .............................', 13, 46, null, null, "left");
            doc.text('AwMÖg MÖn‡bi ZvwiL t ................................................', 105, 46, null, null, "left");
            doc.text('m¤úvw`Z e¨qt    .............................', 13, 54, null, null, "left");
            doc.line(40, 55, 80, 55) // horizontal line
            doc.text('†diZ t            .............................', 13, 62, null, null, "left");


            doc.text('(cÖvmw½K KvMRcÎ ms‡hvwhZ Kiæb)', 105, 70, null, null, "center");
            // 78.084   80.911
            doc.line(13, 72, 200, 72) // horizontal line
            doc.line(13, 92, 200, 92) // horizontal line
            doc.line(13, 230, 200, 230) // horizontal line
            doc.line(13, 237, 200, 237) // horizontal line

            doc.line(13, 72, 13, 237) // vertical line
            doc.line(69.300, 72, 69.300, 237) // vertical line
            doc.line(92.321, 72, 92.321, 237) // vertical line
            doc.line(111.302, 72, 111.302, 237) // vertical line
            doc.line(133.919, 72, 133.919, 237) // vertical line
            doc.line(150, 72, 150, 237) // vertical line
            doc.line(200, 72, 200, 237) // vertical line

            doc.text('`ªe¨/mvwf©m', 40.727, 84, null, null, "center");
            doc.text('(†¯úwmwd‡Kkb)', 40.727, 90, null, null, "center");

            doc.text('BDwbU', 81.012, 84, null, null, "center");
            doc.text('g~j¨', 81.012, 90, null, null, "center");

            doc.text('BDwbU', 101.408, 84, null, null, "center");
            doc.text('msL¨v', 101.408, 90, null, null, "center");

            doc.text('†gvU', 122.207, 84, null, null, "center");
            doc.text('g~j¨', 122.207, 90, null, null, "center");


            doc.text('cÖ¯ÍvweZ', 141.5, 78, null, null, "center");
            doc.text('mieivn', 141.5, 84, null, null, "center");
            doc.text('Drm', 141.5, 90, null, null, "center");


            doc.text('gšÍe¨ (cÖvwß, †KvqvwjwU,', 175, 78, null, null, "center");
            doc.text('g~‡j¨I b¨vh¨Zv) ms¯’vcb', 175, 84, null, null, "center");
            doc.text('I wn‡me wefvM', 175, 90, null, null, "center");


            // †gvU 226.803

            // ok 
            doc.text('†gvU', 42.544, 235, null, null, "center");
            doc.text('†gvU e¨q (K_vq)t', 13, 241, null, null, "left");
            doc.text('e¨q cÖ¯ÍveKvixi gšÍe¨ I ¯^vÿi t', 130.991, 248, null, null, "left");
            doc.text('AwMÖg mgš^q Ki‡Yi ZvwiLt', 13, 248, null, null, "left");

            // ok
            doc.text('¯^vÿi', 105, 271.729, null, null, "center");
            doc.text('wbe©vnx cwiPvjK', 13, 277.729, null, null, "left");
            doc.text('wnmve Kg©KZ©v', 105, 277.729, null, null, "center");
            doc.text('µq m¤úv`K', 200, 277.729, null, null, "right");
        },
        go({ doc }) {
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(20);
            doc.text('†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)', 105, 20.583, null, null, "center");
            doc.setFontSize(16);
            doc.text('evwo bs- 5/4, eøK- Gd, jvjgvwUqv, XvKv  1207', 105, 27.357, null, null, "center");

            doc.setFontSize(22);
            doc.text('     †_‡K Li‡Pi PvU©', 105, 35, null, null, "center");
            doc.setFontSize(20);
            doc.setFont("times", "normal");
            doc.text('GO', 78, 35, null, null, "left");

            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(16);
            doc.text("ZvwiLt  ", 160, 42, null, null, "left");

            doc.line(13, 47, 200, 47) // horizontal line
            doc.line(13, 62, 200, 62) // horizontal line

            doc.line(13, 180, 200, 180) // horizontal line
            doc.line(13, 190, 200, 190) // horizontal line

            doc.line(13, 47, 13, 190) // vertical line
            doc.line(25, 47, 25, 190) // vertical line
            doc.line(98, 47, 98, 190) // vertical line
            doc.line(125, 47, 125, 190) // vertical line
            doc.line(165, 47, 165, 190) // vertical line
            doc.line(200, 47, 200, 190) // vertical line


            doc.setFont("SutonnyMJ", "bold");
            doc.text('µg.', 15, 54, null, null, "left");
            doc.text('cÖ¯ÍvweZ Li‡Pi KviY', 63, 54, null, null, "center");
            doc.text('UvKvi cwigvb', 112, 54, null, null, "center");
            doc.text('Li‡Pi LvZ', 145, 54, null, null, "center");
            doc.text('e¨q cÖ¯ÍveKvix', 180, 54, null, null, "center");
            doc.text('wefvM/ Kg©KZ©v', 180, 60, null, null, "center");
            doc.text('†gvU:', 30, 187, null, null, "left");
            doc.setFont("SutonnyMJ", "normal");
            doc.text('†gvU UvKv (K_vq) :', 16, 196, null, null, "left");


            doc.setFont("SutonnyMJ", "bold");
            doc.text('wmGm KwgwUi mycvwik:', 16, 220, null, null, "left");
            doc.setFont("SutonnyMJ", "normal");
            doc.text('Rbve †gv. Igi dviæK nvq`vi - - - - - - - - - - - - - - - - - - - - - - - ', 16, 228, null, null, "left");
            doc.text('   "    Ac~e© ivq - - - - - -  - - - - - - - - - - - - - - - - - - - -- - - - - ', 16, 238, null, null, "left");

            doc.text('†Pqvig¨vb', 16, 280, null, null, "left");
        },
        bearer({ doc }) {

            doc.setFont("times", "normal");
            doc.setFontSize(18);
            doc.text('Centre for Mass Education in Science (CMES)', 105, 19.5, null, null, "center");
            doc.setFontSize(13);
            doc.text('House# 5/4, Block# F, Lalmatia, Dhaka - 1207', 105, 26, null, null, "center");
            doc.setFont("times", "bold");
            doc.setFontSize(18);
            doc.text('Request for Bearer Cheque', 105, 33, null, null, "center");
            doc.setFont("times", "normal");
            doc.setFontSize(13);
            doc.text('Project: .................', 105, 42, null, null, "center");
            doc.text('To', 20, 50, null, null, "left");
            doc.text('Date: ........................', 190, 50, null, null, "right");
            doc.text('The Chairman', 20, 56, null, null, "left");
            doc.text('CMES', 20, 62, null, null, "left");

            doc.text('Subject:', 20, 72, null, null, "left");
            doc.setFont("times", "bold");
            doc.text('               Request for the approval of Bearer Cheque', 20, 72, null, null, "left");


            doc.setFont("times", "normal");
            doc.text('Dear Sir,', 20, 82, null, null, "left");

            let splText = doc.splitTextToSize("We would like to request you to give an approval for issuing a Bearer Cheque in the name of Mr./Ms................................................................................. nominated by Executive Director. The reason for this request is given below:", 170);
            doc.text(splText, 20, 88, null, null, "left");

            doc.line(20, 106, 190, 106) // horizontal line
            doc.line(20, 114, 190, 114) // horizontal line

            doc.line(20, 242, 190, 242) // horizontal line
            doc.line(20, 250, 190, 250) // horizontal line  

            doc.line(20, 106, 20, 250) // vertical line
            doc.line(30, 106, 30, 250) // vertical line
            doc.line(105, 106, 105, 250) // vertical line
            doc.line(135, 106, 135, 250) // vertical line
            doc.line(190, 106, 190, 250) // vertical line


            doc.setFont("times", "normal");

            doc.text('SL', 25, 112, null, null, "center");
            doc.text('Reasons for Bearer Cheque', 67.5, 112, null, null, "center");
            doc.text('Amount/Taka', 120, 112, null, null, "center");
            doc.text('Head of Accounts', 162.5, 112, null, null, "center");
            doc.setFont("times", "bold");
            doc.text('Total', 35, 248, null, null, "left");
            doc.setFont("times", "normal");
            doc.text('Inword:', 20, 255, null, null, "left");

            doc.text('Chairman', 20, 287, null, null, "left");
            doc.text('Executive Director', 90, 287, null, null, "center");

            doc.text('Date:.................', 145, 287, null, null, "left");
            doc.text('Signature:', 145, 281, null, null, "left");
            doc.text('Name:', 145, 275, null, null, "left");
            doc.text('Requester', 145, 269, null, null, "left");

        },
        tourPlan({ doc }) {
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(14);
            doc.text('dig -2', 195, 12, null, null, "right"); // cmes
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(16);
            doc.text('wmGgBGm', 105, 20.5, null, null, "center"); // cmes
            doc.setFont("SutonnyMJ", "bold");
            doc.setFontSize(20);
            doc.text('ågY cwiKíbv QK', 105, 27.5, null, null, "center");
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(12);
            doc.text('(GB QK cÖ¯ÍveK Kg©KZ©vi mnvqZvq ågYKvix wb‡R c~iY Ki‡eb)', 105, 32, null, null, "center"); // cmes
            doc.setFontSize(14);

            doc.text('cÖ‡R‡±i bvgt...............................................................', 17, 42, null, null, "left");
            doc.text('1. ågYKvixi bvgt........................................................ c`ext .........................................', 17, 52, null, null, "left");
            doc.text('2. BDwbU ev BDwbU mg~nt..............................................................................................................', 17, 62, null, null, "left");
            doc.text('3. c~Y© ågY Kvjt.........................................................†_‡K................................................. ch©šÍ', 17, 72, null, null, "left");
            doc.text('4. åg‡Yi D‡Ïk¨t', 17, 82, null, null, "left");
            doc.setFontSize(12);
            doc.text('†Kvb wel‡q we‡kl Ae‡jvKb (hw` _v‡K)', 105, 95, null, null, "left");
            doc.text('(me åg‡Yi m‡½B mvaviY Ae‡jvKb AšÍf‚©³ _vK‡e)', 105, 102, null, null, "left");

            doc.setFontSize(14);
            let lnt = 80;
            let lng = 6.5;

            doc.setFontSize(14);
            doc.text('5. cÖ¯ÍvweZ ågY m~Pxt', 17, 110, null, null, "left");

            doc.setFont("SutonnyMJ", "bold");
            doc.text('ZvwiL       †Kv_v n‡Z       mgq      †Kvb ch©šÍ (¯’vb)    mgq                   Kvh© m¤úv`b', 22, 120, null, null, "left");

            doc.line(17, 114, 195, 114) // horizontal line
            doc.line(17, 122, 195, 122) // horizontal line
            doc.line(17, 275, 195, 275) // horizontal line

            doc.line(17, 114, 17, 275) // vertical line
            doc.line(35, 114, 35, 275) // vertical line
            doc.line(60, 114, 60, 275) // vertical line
            doc.line(78, 114, 78, 275) // vertical line
            doc.line(110, 114, 110, 275) // vertical line
            doc.line(127, 114, 127, 275) // vertical line
            doc.line(195, 114, 195, 275) // vertical line



            doc.addPage("a4", "p");

            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(14);
            doc.text('dig -2', 195, 12, null, null, "right"); // cmes

            doc.setFont("SutonnyMJ", "bold");
            doc.text('ZvwiL       †Kv_v n‡Z       mgq      †Kvb ch©šÍ (¯’vb)    mgq                   Kvh© m¤úv`b', 22, 26, null, null, "left");

            doc.line(17, 20, 195, 20) // horizontal line
            doc.line(17, 28, 195, 28) // horizontal line
            doc.line(17, 82, 195, 82) // horizontal line

            doc.line(17, 20, 17, 82) // vertical line
            doc.line(35, 20, 35, 82) // vertical line
            doc.line(60, 20, 60, 82) // vertical line
            doc.line(78, 20, 78, 82) // vertical line
            doc.line(110, 20, 110, 82) // vertical line
            doc.line(127, 20, 127, 82) // vertical line
            doc.line(195, 20, 195, 82) // vertical line

            doc.setFont("SutonnyMJ", "normal");
            doc.text('6. Aby‡gv`bt', 17, 98, null, null, "left");
            doc.text('Aby‡gv`bKvix                                              bvg                              ¯^vÿi           gšÍe¨ (hw` _v‡K)', 17, 110, null, null, "left");
            doc.text('K) cÖ¯ÍveK Kg©KZ©v', 17, 122, null, null, "left");
            doc.text('(ågYKvix wb‡RI n‡Z cv‡i)', 17, 128, null, null, "left");
            doc.text('L) ågYKvix mswkøó', 17, 140, null, null, "left");
            doc.text('wefvMxq Kg©KZ©v', 17, 146, null, null, "left");
            doc.text('(wcGg ev wcI)', 17, 152, null, null, "left");
            doc.text('M) cÖ‡R± †Kv-AwW©‡bUi', 17, 164, null, null, "left");
            doc.text('N) wbe©vnx cwiPvjK', 17, 176, null, null, "left");
            doc.text('* cÖ‡R± †Kv-AwW©‡bUi, †WcywU cÖ‡R± †Kv-AwW©‡bUi I †cÖvMÖvg g¨v‡bRvi‡`i †ÿ‡Î ïay wbe©vnx cwiPvj‡Ki Aby‡gv`b', 17, 188, { charSpace: '-0.02' });
            doc.text('cÖ‡qvRb n‡e|', 17, 194, null, null, "left");
            doc.text('* Ab¨vb¨‡`i †ÿ‡Î me¸‡jv Aby‡gv`b cÖ‡qvRb n‡e, Z‡e Riæix †ÿ‡Î (K) I(L) wb‡q P‡j hvIqv hv‡e | (K) I (L)', 17, 200, { charSpace: '-0.05' });
            doc.text('  Aby‡gv`bKvixi cÖ_g my‡hv‡MB (M) I (N) Aby‡gv`‡bi Rb¨ AewnZ Ki‡eb|', 17, 206, null, null, "left");
            // doc.text('* K, L Ges M Aby‡gv`b nevi ci cwiKíbv cÖkvm‡b Rgv w`‡Z n‡e| cÖkvm‡b cÖ‡qvRbxq Z_¨ w`‡q wb/c Aby‡gv`‡bi', 17, 212, null, null, "left");
            doc.text('* K, L Ges M Aby‡gv`b nevi ci cwiKíbv cÖkvm‡b Rgv w`‡Z n‡e| cÖkvm‡b cÖ‡qvRbxq Z_¨ w`‡q wb/c', 17, 212, { charSpace: '0.15' });

            doc.text(' Aby‡gv`‡bi Rb¨ †cÖiY  Ki‡eb|', 17, 218, null, null, "left");


            doc.text('`ªóe¨t GB Q‡Ki Kwc åg‡Y hvÎv Kivi Av‡MB ågYKvix‡K mswkøó wefvMxq Kg©KZ©v, wbe©vnx cwiPvjK, wnmve Kg©KZ©v', 17, 232, { charSpace: '-0.04' });
            doc.text('I cÖ‡R± †Kv-AwW©‡bU‡ii Kv‡Q w`‡Z n‡e| cÖ‡R± †Kv-AwW©‡bUi me åg‡Yi LwZqvb iÿv Ki‡ebG QK c‡i mswkøó', 17, 238, null, null, "left");
            doc.text('ågY m¤úv`b Q‡Ki m‡½ hy³ n‡e| åg‡Y hvÎvi Av‡M ågYKvix Aek¨B ågY cwiKíbv QK, m¤úv`b Ges BDwbU', 17, 244, { charSpace: '0.01' });
            doc.text('Ae‡jvKb QK I Z_¨ †Rbv‡ij Awdm I †m‡µUvwi‡qU gwbUwis Awdm †_‡K msMÖn Ki‡eb Ges Zv e¨envi Ki‡eb|', 17, 250, { charSpace: '-0.01' });
            doc.text('ågY cwiKíbv I m¤úv`b wZb Kwc K‡i wnmve Ges †m‡µUvwi‡qU gwbUwis Awd‡m GK Kwc Rgv w`‡q wb‡Ri wbKU', 17, 256, { charSpace: '-0.01' });
            doc.text('GK Kwc ivL‡eb|', 17, 262, null, null, "left");

        },
        tourExecution({ doc }) {
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(14);
            doc.text('dig -3', 195, 12, null, null, "right"); // cmes
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(16);
            doc.text('wmGgBGm', 105, 20.5, null, null, "center"); // cmes
            doc.setFont("SutonnyMJ", "bold");
            doc.setFontSize(20);
            doc.text('ågY m¤úv`b QK', 105, 27.5, null, null, "center");
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(12);
            doc.text('(GB QK ågY †k‡l ågYKvix c~iY Ki‡eb)', 105, 32, null, null, "center"); // cmes
            doc.setFontSize(14);

            doc.text('cÖ‡R‡±i bvgt...............................................................', 17, 42, null, null, "left");
            doc.text('1. ågYKvixi bvgt........................................................ c`ext .........................................', 17, 52, null, null, "left");
            doc.text('2. BDwbU ev BDwbU mg~nt..............................................................................................................', 17, 62, null, null, "left");
            doc.text('3. c~Y© ågY Kvjt.........................................................†_‡K................................................. ch©šÍ', 17, 72, null, null, "left");
            doc.text('4. ågYm~Px I m¤úvw`Z KvRt', 17, 82, null, null, "left");

            doc.setFont("SutonnyMJ", "bold");
            doc.text('ZvwiL       †Kv_v n‡Z       mgq      †Kvb ch©šÍ (¯’vb)    mgq                m¤úvw`Z KvR (ms‡ÿ‡c)', 22, 90, null, null, "left");

            doc.line(17, 85, 195, 85) // horizontal line
            doc.line(17, 92, 195, 92) // horizontal line
            doc.line(17, 275, 195, 275) // horizontal line

            doc.line(17, 85, 17, 275) // vertical line
            doc.line(35, 85, 35, 275) // vertical line
            doc.line(60, 85, 60, 275) // vertical line
            doc.line(78, 85, 78, 275) // vertical line
            doc.line(110, 85, 110, 275) // vertical line
            doc.line(127, 85, 127, 275) // vertical line
            doc.line(195, 85, 195, 275) // vertical line



            doc.addPage("a4", "p");

            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(14);
            doc.text('dig -3', 195, 12, null, null, "right"); // cmes

            doc.setFont("SutonnyMJ", "bold");
            doc.text('ZvwiL       †Kv_v n‡Z       mgq      †Kvb ch©šÍ (¯’vb)    mgq                 m¤úvw`Z KvR (ms‡ÿ‡c)', 22, 26, null, null, "left");

            doc.line(17, 20, 195, 20) // horizontal line
            doc.line(17, 28, 195, 28) // horizontal line
            doc.line(17, 82, 195, 82) // horizontal line

            doc.line(17, 20, 17, 82) // vertical line
            doc.line(35, 20, 35, 82) // vertical line
            doc.line(60, 20, 60, 82) // vertical line
            doc.line(78, 20, 78, 82) // vertical line
            doc.line(110, 20, 110, 82) // vertical line
            doc.line(127, 20, 127, 82) // vertical line
            doc.line(195, 20, 195, 82) // vertical line

            doc.setFont("SutonnyMJ", "normal");
            doc.text('5. ågY cwiKíbvi m‡½ Awgj n‡j Zvi KviYt', 17, 98, null, null, "left");
            doc.text('6. GB ågY m¤ú‡K© gšÍe¨ I mycvwik (hw` _v‡K)', 17, 140, null, null, "left");


            doc.text('¯^vÿi', 120, 186, null, null, "left");
            doc.text('ZvwiL', 120, 198, null, null, "left");



            doc.text('`ªóe¨t GB Q‡Ki Kwc ågY †k‡l ågYKvix‡K  †m‡µUvwi‡qU Awdm I GKvD›U wefvM‡K w`‡Z n‡e| GB Kwc mswkøó', 17, 232, { charSpace: '0.01' });
            doc.text('ågY cwiKíbv Q‡Ki m‡½ mshy³ n‡e| ågY m¤úv`b QK I BDwbU Ae‡jvKb QK †divi ciciB †m‡µUvwi‡qU', 17, 238, { charSpace: '0.09' });
            doc.text('gwbUwis Awd‡m Rgv w`‡Z n‡e| ågY m¤úv`b Q‡Ki Dci Ae‡jvKb QK Rgv †`qv n‡q‡Q GB g‡g©  cÖ‡R±', 17, 244, { charSpace: '0.17' });
            doc.text('†Kv-AwW©‡bUi I †m‡µUvwi‡qU gwbUwis Awdm wefv‡Mi cÖZ¨qb †c‡j Z‡eB wnmve wefvM wUG/wWG wej MÖnY Ki‡eb |', 17, 250, { charSpace: '-0.04' });
            doc.text('GK Kwc K‡i wUG/wWG we‡ji m‡½ wej K‡i wb‡Z n‡e|', 17, 256, { charSpace: '-0.01' });
        },
        localMovement({ doc }) {

            doc.addImage("/images/cmes_logo/cmes.png", "PNG", 12, 12, 10, 15);
            doc.addImage("/images/cmes_logo/cmes.png", "PNG", 159.95, 12, 10, 15);

            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(16);
            doc.text('†m›Uvi di g¨vm GWz‡Kkb Bb mv‡qÝ (wmGgBGm)', 74.25, 20.5, null, null, "center"); // cmes
            doc.text('†m›Uvi di g¨vm GWz‡Kkb Bb mv‡qÝ (wmGgBGm)', 222.75, 20.5, null, null, "center"); // cmes
            doc.setFont("SutonnyMJ", "bold");
            doc.setFontSize(16);
            doc.text('mvwf©m †m›Uvi ågY welqK QK', 74.25, 27.5, null, null, "center");
            doc.text('mvwf©m †m›Uvi ågY welqK QK', 222.75, 27.5, null, null, "center");
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(14);
            doc.text('ZvwiL: .........................', 12, 40, null, null, "left");
            doc.text('ZvwiL: .........................', 160.5, 40, null, null, "left");

            doc.text('eivei,', 12, 50, null, null, "left");
            doc.text('eivei,', 160.5, 50, null, null, "left");
            doc.text('wbe©vnx cwiPvjK', 12, 56, null, null, "left");
            doc.text('wbe©vnx cwiPvjK', 160.5, 56, null, null, "left");
            doc.text('wmGgBGm', 12, 62, null, null, "left");
            doc.text('wmGgBGm', 160.5, 62, null, null, "left");



            doc.text('welq: wgwUs /†Uªwbs /IqvK©kc /†mwgbvi /µqmsµvšÍ / Ab¨vb¨.................Kv‡R', 12, 72, null, null, "left");
            doc.text('        hvevi ZvrÿwYK Aby‡gv`b I AewnZKiY cÖm‡½|', 12, 78, null, null, "left");

            doc.text('welq: wgwUs /†Uªwbs /IqvK©kc /†mwgbvi /µqmsµvšÍ / Ab¨vb¨.................Kv‡R', 160.5, 72, null, null, "left");
            doc.text('        hvevi ZvrÿwYK Aby‡gv`b I AewnZKiY cÖm‡½|', 160.5, 78, null, null, "left");


            doc.text('Kv‡Ri ¯’vb:', 15, 95, null, null, "left");
            doc.text('wVKvbv:', 15, 105, null, null, "left");
            doc.text('D‡Ïk¨ :', 15, 115, null, null, "left");
            doc.text('mgqmxgv:', 15, 125, null, null, "left");

            doc.text('Kv‡Ri ¯’vb:', 163.5, 95, null, null, "left");
            doc.text('wVKvbv:', 163.5, 105, null, null, "left");
            doc.text('D‡Ïk¨ :', 163.5, 115, null, null, "left");
            doc.text('mgqmxgv:', 163.5, 125, null, null, "left");

            doc.line(12, 88, 136.5, 88) // vertical line
            doc.line(12, 98, 136.5, 98) // vertical line
            doc.line(12, 108, 136.5, 108) // vertical line
            doc.line(12, 118, 136.5, 118) // vertical line
            doc.line(12, 128, 136.5, 128) // vertical line


            doc.line(160.5, 88, 285, 88) // vertical line
            doc.line(160.5, 98, 285, 98) // vertical line
            doc.line(160.5, 108, 285, 108) // vertical line
            doc.line(160.5, 118, 285, 118) // vertical line
            doc.line(160.5, 128, 285, 128) // vertical line


            doc.line(12, 88, 12, 128) // vertical line
            doc.line(40, 88, 40, 128) // vertical line
            doc.line(136.5, 88, 136.5, 128) // vertical line

            doc.line(160.5, 88, 160.5, 128) // vertical line
            doc.line(188.5, 88, 188.5, 128) // vertical line
            doc.line(285, 88, 285, 128) // vertical line


            doc.text('webxZ,', 12, 154, null, null, "left");
            doc.text('¯^vÿi:.........................................................', 12, 171, null, null, "left");
            doc.text('bvg:...........................................................', 12, 178, null, null, "left");
            doc.text('wefvM/DBs:..................................................', 12, 185, null, null, "left");

            doc.text('Aby‡gv`bKvix', 136.5, 185, null, null, "right");


            doc.text('webxZ,', 160.5, 154, null, null, "left");
            doc.text('¯^vÿi:.........................................................', 160.5, 171, null, null, "left");
            doc.text('bvg:...........................................................', 160.5, 178, null, null, "left");
            doc.text('wefvM/DBs:..................................................', 160.5, 185, null, null, "left");

            doc.text('Aby‡gv`bKvix', 285, 185, null, null, "right");


            doc.line(148.5, 0, 148.5, 5) // vertical line  
            doc.line(148.5, 102.5, 148.5, 107.5) // vertical line
            doc.line(148.5, 205, 148.5, 210) // vertical line
        },
        gatePass({ doc }) {
            doc.addImage("/images/cmes_logo/cmes.png", "PNG", 38, 13, 10, 15);

            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(16);

            doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, 20, null, null, "center");
            doc.setFontSize(13);
            doc.text("evwo-5/4, eøK-Gd, jvjgvwUqv, XvKv-1207,†dvbt 02-223310143", 105, 26, null,
                null, "center");
            doc.setFont("SutonnyMJ", "bold");
            doc.setFontSize(24);
            doc.text("†MU cvk", 105, 35, null, null, "center");
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(14);

            doc.text("ZvwiLt.................", 13, 46, null, null, "left");
            doc.text("cÖavb Kvh©vjq", 197, 46, null, null, "right");
            doc.line(13, 48, 197, 48);
            doc.line(13, 75, 197, 75);
            doc.line(13, 48, 13, 118);
            doc.line(26, 48, 26, 118);
            doc.line(100, 48, 100, 118);
            doc.line(140, 48, 140, 118);
            doc.line(197, 48, 197, 118);
            doc.line(13, 118, 197, 118);
            doc.text("µwgK", 15, 54, null, null, "left");
            doc.text("bs", 17, 61, null, null, "left");
            doc.text("gvjvgv‡ji weeiY", 45, 54, null, null, "left");
            doc.text("wK D‡Ï‡k¨ †bIqv", 105, 54, null, null, "left");
            doc.text("gvjvgvj c~Yivq †dir Avbv|", 168, 54, null, null, "center");
            doc.text("fvj Ae¯’vq ey‡S †cj wKbv Zv", 168, 60, null, null, "center");
            doc.text("Zv mv‡mi MÖnYKvix gšÍe¨ mn", 168, 66, null, null, "center");
            doc.text("¯^vÿi Ki‡eb", 168, 72, null, null, "center");
            doc.text("gvjvgvj MÖnYKvixi", 28, 139, null, null, "center");
            doc.text("bvg I ¯^vÿi", 28, 144, null, null, "center");
            doc.text("gvjvgvj mieivnKvixi", 107, 139, null, null, "center");
            doc.text("bvg I ¯^vÿi", 107, 144, null, null, "center");
            doc.text("Aby‡gv`bKvixi", 185, 139, null, null, "center");
            doc.text("bvg I ¯^vÿi", 185, 144, null, null, "center");


            //-------------------------------------
            doc.line(0, 148.5, 5, 148.5);
            doc.line(102.5, 148.5, 107.5, 148.5);
            doc.line(205, 148.5, 210, 148.5);
            //-------------------------------------

            doc.addImage("/images/cmes_logo/cmes.png", "PNG", 38, 161.5, 10, 15);
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(16);

            doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, 168.5, null, null, "center");

            doc.setFontSize(13);
            doc.text("evwo-5/4, eøK-Gd, jvjgvwUqv, XvKv-1207, †dvbt 02-223310143", 105, 174.5, null,
                null, "center");
            doc.setFont("SutonnyMJ", "bold");
            doc.setFontSize(24);
            doc.text("†MU cvk", 105, 183.5, null, null, "center");
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(14);

            doc.text("ZvwiLt.................", 13, 194.5, null, null, "left");
            doc.text("cÖavb Kvh©vjq", 197, 194.5, null, null, "right");
            doc.line(13, 196.5, 197, 196.5);
            doc.line(13, 223.5, 197, 223.5);
            doc.line(13, 196.5, 13, 266.5);
            doc.line(26, 196.5, 26, 266.5);
            doc.line(100, 196.5, 100, 266.5);
            doc.line(140, 196.5, 140, 266.5);
            doc.line(197, 196.5, 197, 266.5);
            doc.line(13, 266.5, 197, 266.5);
            doc.text("µwgK", 15, 202.5, null, null, "left");
            doc.text("bs", 17, 61, null, null, "left");
            doc.text("gvjvgv‡ji weeiY", 45, 202.5, null, null, "left");
            doc.text("wK D‡Ï‡k¨ †bIqv", 105, 202.5, null, null, "left");
            doc.text("gvjvgvj c~Yivq †dir Avbv|", 168, 202.5, null, null, "center");
            doc.text("fvj Ae¯’vq ey‡S †cj wKbv Zv", 168, 208.6, null, null, "center");
            doc.text("Zv mv‡mi MÖnYKvix gšÍe¨ mn", 168, 214.5, null, null, "center");
            doc.text("¯^vÿi Ki‡eb", 168, 220.5, null, null, "center");
            doc.text("gvjvgvj MÖnYKvixi", 28, 287.5, null, null, "center");
            doc.text("bvg I ¯^vÿi", 28, 292.5, null, null, "center");
            doc.text("gvjvgvj mieivnKvixi", 107, 287.5, null, null, "center");
            doc.text("bvg I ¯^vÿi", 107, 292.5, null, null, "center");
            doc.text("Aby‡gv`bKvixi", 185, 287.5, null, null, "center");
            doc.text("bvg I ¯^vÿi", 185, 292.5, null, null, "center");
        },
        chalan({ doc }) {
            doc.addImage("/images/cmes_logo/cmes.png", "PNG", 10, 5, 10, 15);
            doc.setFont("SutonnyMJ", "bold");
            doc.text("Pvjvb / K¨vk †g‡gv", 74.25, 10, null, null, "center");
            doc.setFontSize(16);
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(21);
            doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 80, 18, null, null, "center");

            doc.setFontSize(14);
            doc.text("evwo-5/4, eøK-Gd, jvjgvwUqv, XvKv-1207, †dvbt 02-223310143", 80, 24, null, null, "center");

            doc.text("bs............", 10, 35, null, null, "left");
            doc.text("ZvwiLt.........................", 138.5, 35, null, null, "right");
            doc.text("bvgt..................................................................................................", 10, 45, null, null, "left");
            doc.text("wVKvbvt...............................................................................................", 10, 53, null, null, "left");

            doc.line(10, 58, 138.5, 58); // hr
            doc.line(10, 66, 138.5, 66); // hr
            doc.line(10, 175, 138.5, 175); // hr
            doc.line(10, 181, 138.5, 181); // hr

            doc.line(10, 58, 10, 181); // vr
            doc.line(22, 58, 22, 181); // vr
            doc.line(83, 58, 83, 181); // vr
            doc.line(99, 58, 99, 181); // vr
            doc.line(115, 58, 115, 181); // vr
            doc.line(138.5, 58, 138.5, 181); // vr


            doc.text("µt bs", 11, 64, null, null, "left");
            doc.text("weeiY", 45, 64, null, null, "left");
            doc.text("cwigvb", 85, 64, null, null, "left");
            doc.text("`i", 105, 64, null, null, "left");
            doc.text("UvKv", 122, 64, null, null, "left");
            doc.setFont("SutonnyMJ", "bold");
            doc.text("†gvU UvKv", 45, 180, null, null, "left");
            doc.setFont("SutonnyMJ", "normal");

            doc.text("†gvU UvKv K_vqt...................................................................................", 10, 188, null, null, "left");
            doc.text("MÖnbKvixi ¯^vÿi", 10, 205, null, null, "left");
            doc.text("wmGgBGm c‡ÿ ¯^vÿi", 138.5, 205, null, null, "right");


            //*******************************
            doc.line(148.5, 0, 148.5, 5);
            doc.line(148.5, 102.5, 148.5, 107.5);
            doc.line(148.5, 205, 148.5, 210);
            //------------------------------------

            doc.addImage("/images/cmes_logo/cmes.png", "PNG", 158.5, 5, 10, 15);
            doc.setFont("SutonnyMJ", "bold");
            doc.text("Pvjvb / K¨vk †g‡gv", 222.75, 10, null, null, "center");  /// Center
            doc.setFontSize(16);
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(21);
            doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 228.5, 18, null, null, "center");

            doc.setFontSize(14);
            doc.text("evwo-5/4, eøK-Gd, jvjgvwUqv, XvKv-1207, †dvbt 02-223310143", 228.5, 24, null, null, "center");

            doc.text("bs............", 158.5, 35, null, null, "left"); /// Left

            doc.text("ZvwiLt.........................", 287, 35, null, null, "right");
            doc.text("bvgt..................................................................................................", 158.5, 45, null, null, "left");
            doc.text("wVKvbvt...............................................................................................", 158.5, 53, null, null, "left");

            doc.line(158.5, 58, 287, 58); // hr
            doc.line(158.5, 66, 287, 66); // hr
            doc.line(158.5, 175, 287, 175); // hr
            doc.line(158.5, 181, 287, 181); // hr

            doc.line(158.5, 58, 158.5, 181); // vr
            doc.line(170.5, 58, 170.5, 181); // vr
            doc.line(231.5, 58, 231.5, 181); // vr
            doc.line(247.5, 58, 247.5, 181); // vr
            doc.line(263.5, 58, 263.5, 181); // vr
            doc.line(287, 58, 287, 181); // vr

            doc.text("µt bs", 159.5, 64, null, null, "left");
            doc.text("weeiY", 193.5, 64, null, null, "left");
            doc.text("cwigvb", 233.5, 64, null, null, "left");
            doc.text("`i", 253.5, 64, null, null, "left");
            doc.text("UvKv", 270.5, 64, null, null, "left");

            doc.setFont("SutonnyMJ", "bold");
            doc.text("†gvU UvKv", 193.5, 180, null, null, "left");
            doc.setFont("SutonnyMJ", "normal");
            doc.text("†gvU UvKv K_vqt...................................................................................", 158.5, 188, null, null, "left");
            doc.text("MÖnbKvixi ¯^vÿi", 158.5, 205, null, null, "left");
            doc.text("wmGgBGm c‡ÿ ¯^vÿi", 287, 205, null, null, "right");
        }
    }  
}
