const userData={};
const fileData={};
const gameData={
    "stage1Clear":false
    ,"stage2Clear":false
    ,"stage3Clear":false
};
document.addEventListener('DOMContentLoaded', function() {
    //document.body.style.backgroundImage = "none";
    console.log("DOM이 준비되었습니다!");
    if(sessionStorage.getItem("emailDomain") == null || sessionStorage.getItem("emailId") == null){
        location.replace("index.html");
        return false;
    }
    userData.emailDomain = sessionStorage.getItem("emailDomain");
    userData.emailId = sessionStorage.getItem("emailId");

    GameEvent.getUserEventStatus();


    document.getElementById('file-select1').addEventListener('change', function(event) {
        const file = event.target.files[0]; // 사용자가 선택한 첫 번째 파일
        if (file) {
            console.log('파일 이름:', file.name);
            console.log('파일 크기:', file.size, 'bytes');
            console.log('파일 유형:', file.type);
            const maxSize = 25 * 1024 * 1024; // 25MB
            const allowedTypes = ['video/mp4','image/jpeg','image/png'];
            if (file.size > maxSize) {
                openConfirmModal("25MB 이하 파일을\n선택해주세요.","다시 업로드하기");
                return false;
            }
            if (!allowedTypes.includes(file.type)) {
                openConfirmModal("지원하지 않는 파일 형식입니다.\n[지원 형식: JPG,PNG]");
                return false;
            }
            setTimeout(() => {
                EventFormData.upload('file-select1');
            }, 500); // 500ms 지연 후 업로드 실행
        }
    });
    document.getElementById('file-select2').addEventListener('change', function(event) {
        const file = event.target.files[0]; // 사용자가 선택한 첫 번째 파일
        if (file) {
            console.log('파일 이름:', file.name);
            console.log('파일 크기:', file.size, 'bytes');
            console.log('파일 유형:', file.type);
            const maxSize = 25 * 1024 * 1024; // 25MB
            const allowedTypes = ['video/mp4'];
            if (file.size > maxSize) {
                openConfirmModal("25MB 이하 파일을\n선택해주세요.","다시 업로드하기");
                return false;
            }
            if (!allowedTypes.includes(file.type)) {
                openConfirmModal("지원하지 않는 파일 형식입니다.\n[지원 형식: MP4]");
                return false;
            }
            setTimeout(() => {
                EventFormData.upload('file-select2');
            }, 500); // 500ms 지연 후 업로드 실행
        }
    });

    $('.div-tree .item, .div-tree .click').off();
    document.querySelectorAll(".item1, .item2, .item3").forEach((item, index) => {
        item.onclick = function () {
            if (gameData[`stage${index + 1}Clear`]) {
                openConfirmModal("이미 완료한 스테이지입니다.");
                return false;
            }else{
                modalOpen(`stage${index + 1}`);
            }
        };
    });
    document.querySelectorAll(".c1, .c2, .c3").forEach((item, index) => {
        item.onclick = function () {
            if (gameData[`stage${index + 1}Clear`]) {
                openConfirmModal("이미 완료한 스테이지입니다.");
                return false;
            }else{
                modalOpen(`stage${index + 1}`);
            }
        };
    });

    $("#stage2 .quiz1 .btn-next, #stage2 .quiz2 .btn-next").off();
    document.getElementById("firstQuizBtn").onclick=function(){
        const quiz1Choices = document.querySelectorAll('.quiz1 .choices li');
        let isAnySelected = false;
        quiz1Choices.forEach(choice => {
            if (choice.classList.contains('on')) {
                isAnySelected = true;
            }
        });
        if (!isAnySelected) {
            openConfirmModal("정답을 선택해주세요.");
            return false;
        }else{
            let correctOn =document.getElementsByClassName("choice3")[0];
            if (correctOn.classList.contains("on")) {
                openConfirmModal("정답입니다!","다음",function(){
                    modalClose('confirm');
                    $('#stage2 .quiz1').addClass('hide');
                    $('#stage2 .quiz2').addClass('hide');
                    $('#stage2 .quiz3').addClass('hide');
                    $('#stage2 .quiz2').removeClass('hide');
                });
            }else{
                openConfirmModal("아쉽지만 오답이에요.\n힌트 확인 후\n다시 도전해보세요.","다시풀기",function(){
                    modalClose('confirm');
                    $('#stage2 .quiz2').addClass('hide');
                    $('#stage2 .quiz3').addClass('hide');
                    $('#stage2 .quiz1').removeClass('hide');
                });
            }
        }
    }
    document.getElementById("secondQuizBtn").onclick=function(){
        const quiz1Choices = document.querySelectorAll('.quiz2 .choices li');
        let isAnySelected = false;
        quiz1Choices.forEach(choice => {
            if (choice.classList.contains('on')) {
                isAnySelected = true;
            }
        });
        if (!isAnySelected) {
            openConfirmModal("정답을 선택해주세요.");
            return false;
        }else{
            let correctOn =document.getElementsByClassName("choice1")[1];
            if (correctOn.classList.contains("on")) {
                openConfirmModal("정답입니다!","다음",function(){
                    modalClose('confirm');
                    $('#stage2 .quiz1').addClass('hide');
                    $('#stage2 .quiz2').addClass('hide');
                    $('#stage2 .quiz3').removeClass('hide');
                });
            }else{
                openConfirmModal("아쉽지만 오답이에요.\n힌트 확인 후\n다시 도전해보세요.","다시풀기",function(){
                    modalClose('confirm');
                    $('#stage2 .quiz1').addClass('hide');
                    $('#stage2 .quiz3').addClass('hide');
                    $('#stage2 .quiz2').removeClass('hide');
                });
            }
        }
    }
    document.getElementById("thirdQuizBtn").onclick=function(){
        const quiz1Choices = document.querySelectorAll('.quiz3 .choices li');
        let isAnySelected = false;
        quiz1Choices.forEach(choice => {
            if (choice.classList.contains('on')) {
                isAnySelected = true;
            }
        });
        if (!isAnySelected) {
            openConfirmModal("정답을 선택해주세요.");
            return false;
        }else{
            let correctOn =document.getElementsByClassName("choice4")[2];
            if (correctOn.classList.contains("on")) {
                openConfirmModal("정답입니다!","제출",function(){
                    GameEvent.updateSecondData();
                    modalClose('confirm');
                    // $('#stage2 .quiz1').removeClass('hide');
                    // $('#stage2 .quiz2').addClass('hide');
                    // $('#stage2 .quiz3').addClass('hide');
                });
            }else{
                openConfirmModal("아쉽지만 오답이에요.\n힌트 확인 후\n다시 도전해보세요.","다시풀기",function(){
                    modalClose('confirm');
                    $('#stage2 .quiz1').addClass('hide');
                    $('#stage2 .quiz2').addClass('hide');
                    $('#stage2 .quiz3').removeClass('hide');
                });
            }
        }
    }
    // document.querySelector('div.btn-area button').onclick=function(){
    //     const startDate = new Date(2025, 8, 1, 0, 0, 0);
    //     const finishDate = new Date(2025, 9, 22, 23, 59, 59);
    //     if(startDate.getTime() > new Date().getTime()){
    //         alert("이벤트 시작전입니다.");
    //         return false;
    //     }else
    //         if(finishDate.getTime() > new Date().getTime()){
    //         let valid = Validation.checkValid();
    //         console.log("valid :"+ valid);
    //         console.log(valid);
    //         if(valid){
    //             console.log("gogogogo");
    //             Validation.existUser(valid);
    //         }
    //         console.log("eventJoin");
    //         _satellite.track('eventJoin', {
    //             digitalData: digitalData._snapshot()
    //         });
    //     }else{
    //         alert("이벤트가 종료되었습니다.");
    //         return false;
    //     }
    // };
    // document.querySelector('div#complete .close').onclick=function(){
    //     modalClose('complete');
    // }
    document.getElementsByClassName("frame-1")[0].onclick=function(){
        if(gameData.stage1Clear && gameData.stage2Clear && gameData.stage3Clear){
            modalOpen("complete");
        }else{
            openConfirmModal("3개의 스테이지를\n먼저 완료하세요.");
            return false;
        }

    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
    }
});
const inputs = document.querySelectorAll('input:not([type="file"]):not([type="checkbox"])');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

inputs.forEach((input,index) => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            console.log('Enter 키가 눌렸습니다!${input.placeholder}');
            const nextInput = inputs[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
});

const EventFormData={
    uploadData : null
    ,joinEventUser(userData){
        console.log(userData);
        fetch(EssentialData.serviceDomain + "/main/joinEventUser", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                requestData:window.localStorage.getItem("requestData")
                ,requestTime:window.localStorage.getItem("requestTime")
                ,eventId:EssentialData.eventId
                ,userName:userData.userName
                ,phoneNumber:userData.phoneNumber
                ,emailId:userData.emailId
                ,emailDomain:userData.emailDomain
                ,uploadData:this.uploadData
            }),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                console.log(result.result);
                if(parseInt(result.data,10) >0 ){
                    modalOpen('complete');
                    setTimeout(() => {
                        EventFormData.cleareData();
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth' // 부드러운 스크롤 효과
                        });
                    }, 100);
                }
            })
            .catch(error => console.error('Error:', error));
    }
    ,upload(elementId){
        let fileInput = document.getElementById(elementId);
        console.log(fileInput);
        let file = fileInput.files[0];

        if (!file) {
            alert("파일을 선택하세요.");
            return;
        }

        let formData = new FormData();
        formData.append("file", file);
        formData.append("eventId",EssentialData.eventId);
        formData.append("requestData",window.localStorage.getItem("requestData"));
        formData.append("requestTime",window.localStorage.getItem("requestTime"));
        formData.append("eventId",EssentialData.eventId);

        fetch(EssentialData.serviceDomain+"/api/upload/file", {
            method: "POST",
            body: formData ,
            credentials: 'include'
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if(result.result ==="success"){
                    console.log("data.message ::: " + (typeof result.data) + "   "+ result.data);
                    if(result.data.length > 10){
                        EventFormData.uploadData=result.data;

                        if(elementId ==="file-select1"){
                            document.getElementById("selected-file1").innerHTML=file.name.length >35 ? file.name.substring(0,35)+"..." : file.name;
                            fileData.file1Name=result.data;
                        }else if(elementId ==="file-select2"){
                            document.getElementById("selected-file2").innerHTML=file.name.length >35 ? file.name.substring(0,35)+"..." : file.name;
                            fileData.file2Name=result.data;
                        }

                    }
                }else{
                    alert("캡쳐 이미지 업로드에 실패하였습니다.");
                    EventFormData.uploadData=null;
                    return false;
                }
            })
            .catch(error => {
                console.error("업로드 오류:", error);
            });
    }
    ,cleareData(){
        this.uploadData=null;
        inputs.forEach(input => {
            input.value = '';
        });
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        document.querySelector("p.selectFile").innerHTML="선택된 파일 없음";
    }
}
const AdobeAnalytics={
    init(){
        console.log("AdobeAnalytics.init");
        var script = document.createElement('script');
        script.src = 'https://www.adobe.com/marketingtech/main.min.js';
        document.head.appendChild(script);
        console.log("AdobeAnalytics.script added");
        document.querySelectorAll("div.step button")[0].onclick=function(){
            console.log("step01_startButton");
            _satellite.track('step01_startButton', {
                // Send as a parameter a snapshot of the data layer at this point in time.
                // Note: if this is not set, we will handle take a snapshot within
                // the _satellite.track handler.
                digitalData: digitalData._snapshot()
            });
            window.open('https://www.adobe.com/kr/creativecloud/plans.html?plan=edu');
        };
        document.querySelectorAll("div.step button")[1].onclick=function(){
            console.log("step02_capture");
            _satellite.track('step02_capture', {
                digitalData: digitalData._snapshot()
            });
            modalOpen('example');
        };
        document.querySelectorAll("div.input-file input")[0].onclick=function(){
            console.log("step03_selectFile");
            _satellite.track('step03_selectFile', {
                digitalData: digitalData._snapshot()
            });
        };
        document.querySelectorAll("div.input-file input")[0].onclick=function(){
            console.log("step03_selectFile");
            _satellite.track('step03_selectFile', {
                digitalData: digitalData._snapshot()
            });
        };
        // document.querySelectorAll("div.btn-area button")[0].onclick=function(){
        //     console.log("eventJoin");
        //     _satellite.track('eventJoin', {
        //         digitalData: digitalData._snapshot()
        //     });
        // }
    }
    ,lazyInit(){
        window.marketingtech = {
            adobe: {
                launch: {
                    property: 'global',
                    environment: 'production'
                },
                analytics: {
                    additionalAccounts: '' // additional report suites to send data to "," separated Ex: 'RS1,RS2'
                },
                target: true,   // if target needs to be enabled else false
                audienceManager: true   // if audience manager needs to be enabled else false
            }
        };
    }
}

const GameEvent= {
    start() {
        if(fileData.file1Name == null || fileData.file1Name == undefined){            
            openConfirmModal("파일 업로드 후 \n완료 버튼을 눌러주세요.");
            return false;
        }
        fetch(EssentialData.serviceDomain + "/xmas/event/updateEventData", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                emailId: userData.emailId
                , emailDomain: userData.emailDomain
                , eventId: EssentialData.eventId
                , fileData : fileData.file1Name
                , stage : "stage1"
            }),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                console.log(result.result);
                if(result.data ==="success") {
                    stageClear("stage1");
                }
            })
            .catch(error => console.error('Error:', error));
    }
    , updateSecondData() {
        console.log("GameEvent.updateSecondData");
        fetch(EssentialData.serviceDomain + "/xmas/event/updateEventData", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                emailId: userData.emailId
                , emailDomain: userData.emailDomain
                , eventId: EssentialData.eventId
                , fileData : fileData.file1Name
                , stage : "stage2"
            }),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if(result.data ==="success") {
                    stageClear("stage2");
                }
            })
            .catch(error => console.error('Error:', error));
    }
    ,updateThirdData(){
        if(fileData.file2Name == null || fileData.file2Name == undefined){
            openConfirmModal("파일 업로드 후 \n완료 버튼을 눌러주세요.");
            return false;
        }
        fetch(EssentialData.serviceDomain + "/xmas/event/updateEventData", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                emailId: userData.emailId
                , emailDomain: userData.emailDomain
                , eventId: EssentialData.eventId
                , fileData : fileData.file2Name
                , stage : "stage3"
            }),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                console.log(result.result);
                if(result.data ==="success") {
                    stageClear("stage3");
                }
            })
            .catch(error => console.error('Error:', error));
    },
    getUserEventStatus(){
        fetch(EssentialData.serviceDomain + "/xmas/event/getUserEventStatus", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                emailId: userData.emailId
                , emailDomain: userData.emailDomain
                , eventId: EssentialData.eventId
            }),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                console.log(result.data);
                let sum = 0;
                if(result.data === null){
                    return false;
                }
                if(result.data.stage1Flag === 1){
                    stageClear("stage1","getUserEventStatus");
                }
                if(result.data.stage2Flag === 1){
                    stageClear("stage2","getUserEventStatus");
                }
                if(result.data.stage3Flag === 1){
                    stageClear("stage3","getUserEventStatus");
                }
            })
            .catch(error => console.error('Error:', error));
    }
}
function stageClear(stageId,caller){
    if(stageId ==="stage1"){
        modalClose('stage1');
        document.getElementsByClassName("item1")[0].classList.add("on");
        document.getElementsByClassName("s1")[0].classList.add("on");
        gameData.stage1Clear=true;
    }else if(stageId ==="stage2"){
        modalClose('stage2');
        document.getElementsByClassName("item2")[0].classList.add("on");
        document.getElementsByClassName("s2")[0].classList.add("on");
        gameData.stage2Clear=true;
    }else if(stageId ==="stage3"){
        modalClose('stage3');
        document.getElementsByClassName("item3")[0].classList.add("on");
        document.getElementsByClassName("s3")[0].classList.add("on");
        gameData.stage3Clear=true;
    }
    let sum =0;
    if(gameData.stage1Clear){
        sum=sum+1;
    }
    if(gameData.stage2Clear){
        sum=sum+1;
    }
    if(gameData.stage3Clear){
        sum=sum+1;
    }
    document.getElementsByClassName("status-txt2")[0].innerHTML = sum + "/3";

    if(sum === 3){
        document.getElementsByClassName("frame-1")[0].classList.add("on");
        if(caller === undefined){
            openConfirmModal("모든 미션을 완료했어요!\n담요 응모 버튼이\n활성화되었습니다.");
        }
    }else{
        if(caller === undefined) {
            if (stageId === "stage1") {
                openConfirmModal("Stage 1 완료!\n다른 스테이지도 도전해 보세요.");
            } else if (stageId === "stage2") {
                openConfirmModal("Stage 2 완료!\n다른 스테이지도 도전해 보세요.");
            } else if (stageId === "stage3") {
                openConfirmModal("Stage 3 완료!\n다른 스테이지도 도전해 보세요.");
            }
        }
    }
}
const version=2511271826;
console.log(version);