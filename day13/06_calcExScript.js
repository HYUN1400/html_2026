const container = document.querySelector(".container");
const printResult = document.querySelector(".printResult");
let printValue = ''; // 출력 문구를 적은 변수
let isResultShow = false;


// 전체 계산기 화면 이벤트 
container.addEventListener('click', (e) => {
    let btnValue = e.target.value;

    // value가 없는 부분
    if(btnValue === undefined) { return; }

    // btnValue : 숫자인 경우 / 아닌 경우
    if(!isNaN(btnValue)){
        if(isResultShow) { // 이전 결과가 있는 상태에서 숫자를 누르면
            printValue = btnValue; // 지난 결과 삭제 후 덮어씀
            isResultShow = false;
        } else {
            printValue += btnValue;
        }
    } else {
        // 결과값이 없을 때 연산자가 먼저 나오는 경우 0으로 변경
        if(printValue == '' && ['+', '-', '*', '/', '.'].includes(btnValue)){
            printValue = '0';
        }
        switch(btnValue){
            case 'c': 
                printValue = ''; 
                printResult.innerText = '0'; 
                return;
            case '.': 
                const parts = printValue.split(/[\+\-\*\/]/);
                if(!parts.pop().includes('.')){
                    printValue += btnValue;
                }
                if(printValue.includes(/[\+\-\*\/]/)){
                   
                }
                break;
            default :

            let result = 0; // 실제 연산의 결과를 받을 변수
            if(btnValue == '='){
                result = extractValue(printValue);
                printValue = result;
                isResultShow = true;
            } else {
                if(isResultShow){
                    isResultShow = false;
                }

                // search regEx pattern을 이용한 검색 후 index 리턴
                // 연산자가 두번 연속 눌릴 경우 => 덮어쓰기
                // 1) 마지막 문자가 연산자인지 확인
                let trimmed = printValue.trim();
                if(/[\+\-\*\/]$/.test(trimmed)){
                    printValue = trimmed.slice(0, -1) + btnValue + " ";
                } else {
                    printValue += ` ${btnValue} `;
                }
            }
        }
    }

    printResult.innerText = printValue;

})

function operation(f, o, l){
    f = Number(f);
    l = Number(l);
    let result = 0;

    switch(o){
        case '+': result = f + l; break;
        case '-': result = f - l; break;
        case '*': result = f * l; break;
        case '/': 
            if(l === 0){
                alert('0으로 나눌 수 없습니다.')
                return 0;
            } 
            result = f / l;
            break;
    }

    return result.toFixed(2);
}

function extractValue(strValue){
    // strValue 123 + 456
    // substring(시작번지, 끝번지)

    let firstNum = strValue.substring(0, strValue.indexOf(" "));
    let lastNum = strValue.substring(strValue.lastIndexOf(" ")+1);
    let op = strValue.substr(strValue.indexOf(" ")+1, 1);

    return operation(firstNum, op, lastNum);
}