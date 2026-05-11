console.log("외부 스크립트");

let click = 1; 

const onClickH1 = () => {
    const h1 = document.querySelector("h1");
    
    if(click % 2 == 1 && h1.style.color == "rgb(0, 0, 0)") {
        h1.style.color = "rgb(242, 150, 97)";
    }

    if(click % 2 == 0 && h1.style.color != "rgb(0, 0, 0)"){
        h1.style.color = "rgb(0, 0, 0)";
    }    

    click = click + 1; 

    console.log(click);
}

let name03 = 'peter parker';

function mySecondFunc(){
    console.log("HI!");
}