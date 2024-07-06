let mainInput = 3;
let secInput = 3;
let numList = new Array();
let classList = new Array();
let scoreList = new Array();

function init() {
    mainInput = 3;
    secInput = 3;
    if (window.location.href.endsWith('index.html')) {
        mainPage();
    } else {
        setScoreInputBox();
        secondPage();
    }
    addEvent();
}

function mainPage() {
    plusInput();
    for (let i = 0; i < mainInput; i++) {
        makeDivF("classNumInput", 'classNum', '강의 개수:', 'cCount');
    }
}

function secondPage() {
    plusInput();
    console.log(secInput);
    for (let i = 0; i < secInput; i++) {
        makeDivF('scoreInput', 'classValue', '성적:', 'score');
    }
    initializeClass();
}

function makeDivF(parentId, childClass, name, ty) {
    let box = document.getElementById(parentId);
    if (!box) return; 
    let p = document.createElement('div');
    p.setAttribute('class', childClass);

    let DelBtn = document.createElement('button');
    DelBtn.innerHTML = '-';
    DelBtn.setAttribute('class', 'minus');
    p.appendChild(DelBtn);

    let label1 = document.createElement('span');
    label1.innerHTML = '학점:';
    p.appendChild(label1);
    let cNum = document.createElement('input');
    cNum.setAttribute('class', 'cNum');
    cNum.type = 'number';
    p.appendChild(cNum);

    let label2 = document.createElement('span');
    label2.innerHTML = name;
    p.appendChild(label2);

    let c = document.createElement('input');
    c.setAttribute('class', ty);
    c.type = 'number';
    p.appendChild(c);

    box.appendChild(p);
}

function addEvent() {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('plus')) {
            if (window.location.href.endsWith('index.html')) {
                mainInput++;
                makeDivF("classNumInput", 'classNum', '강의 개수:', 'cCount');
            } else if(window.location.href.endsWith('step1.html')) {
                secInput++;
                makeDivF('scoreInput', 'classValue', '성적:', 'score');
            }
        } else if (event.target.classList.contains('minus')) {
            let p = event.target.parentElement;
            if (p && p.parentElement) {
                if (window.location.href.endsWith('index.html')) {
                    if (mainInput > 1) {
                        p.parentElement.removeChild(p);
                        mainInput--;
                    }
                } else {
                    if (secInput > 1) {
                        p.parentElement.removeChild(p);
                        secInput--;
                    }
                }
                if (mainInput < 1) mainInput = 1;
                if (secInput < 1) secInput = 1;
            }
        }
    });
}

function plusInput() {
    let box = window.location.href.endsWith('index.html') ? document.getElementById("classNumInput") : document.getElementById("scoreInput");
    if (!box) return; 
    let plus = document.createElement('button');
    plus.setAttribute('class', 'plus');
    plus.innerHTML = '입력 칸 추가하기';
    box.appendChild(plus);
}



function setScoreInputBox() {
    numList = JSON.parse(localStorage.getItem('numList')) || [];
    classList = JSON.parse(localStorage.getItem('classList')) || [];
    secInput=0;
    numList.forEach((item) => { secInput += parseInt(item) });
    
}

function initializeClass() {
    let c = document.getElementsByClassName('cNum');
    let num = 0;
    for (let i = 0; i < numList.length; i++) {
        for (let j = 0; j < numList[i]; j++) {
            if (c[num]) {
                c[num].value = classList[i];
            }
            num++;
        }
    }
}

function saveStorage() {
    let li1 = Array.from(document.getElementsByClassName('cNum')).map(input => input.value);
    let li2 = Array.from(document.getElementsByClassName('cCount')).map(input => input.value);
    localStorage.setItem('classList', JSON.stringify(li1));
    localStorage.setItem('numList', JSON.stringify(li2));
    window.location.href = 'step1.html';
}

function calculate() {
    let c = document.getElementsByClassName('cNum');
    let s = document.getElementsByClassName('score');
    let totalScore = 0;
    let totalClass = 0;
    let scoreValue = 0;
    for (let i = 0; i < c.length; i++) {
        if (c[i].value && s[i].value) {
            totalScore += parseFloat(c[i].value) *parseFloat( s[i].value);
            totalClass += parseFloat(c[i].value);
        }
    }
    scoreValue = totalClass ? (totalScore / totalClass) : 0;
    let v = document.getElementById("averageScore");
    v.innerHTML = scoreValue.toFixed(2);
}
