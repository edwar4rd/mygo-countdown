// 10 11 12 13
const mygoTime = [1692279300, 1692884100, 1693488900, 1694093700];
const mygoLast = 13;
const chineseNumeric = "一二三四五六七八九十"

let caption = document.getElementById("bg-caption");
caption.attributes["data-mytext"] = "怎麽還要再等";
caption.innerText = "怎麽還要再等";

let mainStuff = document.getElementById("main-stuff");

function updateStuff() {
    let currentTime = Date.now() / 1000;
    let nextMygo = null;
    let nextMygoTime = null;
    
    if(currentTime < mygoTime[0]) {
        nextMygo = 10;
        nextMygoTime = mygoTime[0];
    } else if(currentTime < mygoTime[1]) {
        nextMygo = 11;
        nextMygoTime = mygoTime[1];
    } else if(currentTime < mygoTime[2]) {
        nextMygo = 12;
        nextMygoTime = mygoTime[2];
    } else if(currentTime < mygoTime[3]) {
        nextMygo = 13;
        nextMygoTime = mygoTime[3];
    } else {
        nextMygo = null;
        nextMygoTime = null;
    }

    if(nextMygo === null) {
        document.title = "沒有 MyGO!!!!! 了";
        return;
    }

    // change title according to nextMygo
    document.title = "我現在只想看MyGO!!!!!第"+ nextMygo +"集";
    // console.log(document.title);

    // calculate how much time left

    // 怎麽還有再等五天六小時七分五秒啊
    // 怎麽還有再等五天六小時七分鐘啊
    // 怎麽還有再等五天六個小時啊
    // 怎麽還有再等五天啊

    let delta = nextMygoTime - currentTime;
    
    let countdownText = numberCountdownText(delta);

    // update text
    caption.setAttribute("data-mytext", countdownText);
    caption.innerText = countdownText;
    
}

// delta is a time interval in seconds
// 0 <= delta
function numberCountdownText(delta) {
    delta = Math.floor(delta);
    if(delta == 0) return "爽啦 看 MyGO!!!!! 囉！";

    let countdownText = "怎麽還要再等";
    if(delta >= 86400) {
        countdownText += "" + Math.floor(delta/86400) + "天";
        delta = delta % 86400;
    }
    if(delta >= 3600) {
        countdownText += "" + Math.floor(delta/3600) + "小時";
        delta = delta % 3600;
    }
    if(delta >= 60) {
        countdownText += "" + Math.floor(delta/60) + "分";
        delta = delta % 60;
        if(delta > 0) {
            countdownText += "" + Math.floor(delta) + "秒";
        } else {
            countdownText += "鍾";
        }
    }
    else if(delta > 0) {
        countdownText += "" + Math.floor(delta) + "秒";
    }
    countdownText += "啊";
    return countdownText
}

// delta is a time interval in seconds
// 0 <= delta
function chineseCountdownText(delta) {
    if(delta == 0) return "爽啦 看 MyGO!!!!! 囉！";

    let countdownText = "怎麽還要再等";
    if(delta >= 86400) {
        countdownText += "" + numberToChinese(Math.floor(delta/86400)) + "天";
        delta = delta % 86400;
    }
    if(delta >= 3600) {
        countdownText += "" + numberToChinese(Math.floor(delta/3600)) + "小時";
        delta = delta % 3600;
    }
    if(delta >= 60) {
        countdownText += "" + numberToChinese(Math.floor(delta/60)) + "分";
        delta = delta % 60;
    }
    if(delta >= 0) {
        countdownText += "" + numberToChinese(Math.floor(delta)) + "秒";
    }
    countdownText += "啊";
    countdownText += window.innerHeight;
    return countdownText
}

// 0 <= number <= 99
function numberToChinese(number) {
    if(number==0) return "零";
    if(number>=100) return "很多";
    if(number==2) return "兩";
    if(number < 10) return chineseNumeric[number-1];
    if(number == 10) return "十";
    if(number%10 == 0) return chineseNumeric[Math.floor(number/10)-1]+"十";
    if(number < 20) return "十" + chineseNumeric[number%10-1];
    return chineseNumeric[Math.floor(number/10)-1] + "十" + chineseNumeric[number%10-1];
}

updateStuff();
mainStuff.style.setProperty("--alt-vh", window.innerHeight + "px");

addEventListener("resize", (e) => {
    mainStuff.style.setProperty("--alt-vh", window.innerHeight + "px");
});
setInterval(updateStuff, 1000);
