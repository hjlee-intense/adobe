    document.addEventListener('at-content-rendering-succeeded', function () {
      console.log("at-content-rendering-succeeded....");
      document.body.style.background = 'none';
    });

document.addEventListener('DOMContentLoaded', function() {
    //document.body.style.backgroundImage = "none";
    console.log("DOM이 준비되었습니다!");
    const telInput = document.querySelector('input[type="tel"]');
    telInput.addEventListener('input',(event) => {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        // let input = event.target.value.replace(/[^0-9]/g, '');
        // const validPrefixes = ['010', '011', '016', '017', '018', '019'];
        // const isValidPrefix = validPrefixes.some(prefix => input.startsWith(prefix));
        // console.log(isValidPrefix);
    });
    telInput.setAttribute('maxlength', '11');
;
    document.querySelector('div.btn-area button').onclick=function(){
        const startDate = new Date(2025, 8, 1, 0, 0, 0);
        const finishDate = new Date(2025, 11, 31, 23, 59, 59);
        if(startDate.getTime() > new Date().getTime()){
            openConfirmModal("이벤트 시작전입니다.");
            return false;
        }else 
            if(finishDate.getTime() > new Date().getTime()){
            let valid = Validation.checkValid();
            console.log("valid :"+ valid);
            console.log(valid);
            if(valid){
                console.log("gogogogo");
                Validation.existUser(valid);
            }
            console.log("eventJoin");
            _satellite.track('eventJoin', {
                digitalData: digitalData._snapshot()
            });
        }else{
            openConfirmModal("이벤트가 종료되었습니다.");
            return false;
        }
    };
    // document.querySelector('div#complete .close').onclick=function(){
    //     modalClose('complete');
    // }
    //AdobeAnalytics.init();
    EssentialData.init();

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
//const emailSelect = document.getElementById('email-select');
emailSelect.addEventListener('change', () => {
    inputs[1].value = emailSelect.value;
});
const Validation = {
    checkValid() {
        const adobeId = inputs[0].value;
        if(inputs[0].value.length < 2){
            openConfirmModal("구독중인 Adobe ID를\n확인하세요");
            inputs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            inputs[0].focus();
            return false;
        }
        const domainPattern = /^(?!-)(?!.*-$)(?!.*--)[A-Za-z0-9-]{1,63}(\.[A-Za-z0-9-]{1,63})*\.[A-Za-z]{2,6}$/;
        if (inputs[1].value.length  === 0) {
            openConfirmModal("이메일 도메인 주소를\n확인하세요");
            inputs[1].scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }
        if (!domainPattern.test(inputs[1].value)) {
            openConfirmModal("유효하지 않은 도메인\n주소입니다.");
            return false;
        }
        const telInput = document.querySelector('input[type="tel"]').value;
        if (!telInput.startsWith('010') || telInput.length != 11) {
            openConfirmModal("휴대폰번호를 확인하세요");
            inputs[2].scrollIntoView({ behavior: 'smooth', block: 'center' });
            inputs[2].focus();
            return false;
        }

        if(!Array.from(checkboxes).every(checkbox => checkbox.checked)){
            openConfirmModal("약관 동의를 진행해주세요.");
            return false;
        }
        return {
            emailId : inputs[0].value
            ,emailDomain : inputs[1].value
            ,phoneNumber : inputs[2].value
            ,userName : inputs[0].value
        };
    }
    ,existUser(userData){
        fetch(EssentialData.serviceDomain + "/main/getExistUser", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                emailId:userData.emailId
                ,emailDomain:userData.emailDomain
                ,eventId:EssentialData.eventId
            }),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                console.log(result.result);
                console.log(typeof result.data.existUserCount);
                if(result.data.existUserCount > 0){
                    document.getElementById('modal1').classList.add('hide');
                    document.getElementById('modal2').classList.add('hide');
                    sessionStorage.setItem("emailId",userData.emailId);
                    sessionStorage.setItem("emailDomain",userData.emailDomain);
                    sessionStorage.setItem("eventId",EssentialData.eventId);
                    //alert("이미 이벤트에 참여하셨습니다. 게임페이지로 이동합니다.");
                    //location.href="game.html";
                    Validation.getUserEventStatus(userData);
                    return false;
                }else{
                    EventFormData.joinEventUser(userData);
                }
            })
            .catch(error => console.error('Error:', error));
    }
    ,getUserEventStatus(userData){
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
                if(result.data !== null){
                    if(result.data.stage1Flag === 1){
                        sum= sum+1;
                    }
                    if(result.data.stage2Flag === 1){
                        sum= sum+1;
                    }
                    if(result.data.stage3Flag === 1){
                        sum= sum+1;
                    }
                    if(sum === 3){
                        openConfirmModal("이미 응모가 완료되었어요.","확인",function(){
                            location.href="game.html";
                        });
                    }else{
                        openConfirmModal("진행하던 페이지로 이동합니다.","확인",function(){
                            location.href="game.html";
                        });
                    }
                }else{
                    openConfirmModal("진행하던 페이지로 이동합니다.","확인",function(){
                        location.href="game.html";
                    });
                }
            })
            .catch(error => console.error('Error:', error));
    }
}
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
                    modalClose('modal1');
                    sessionStorage.setItem("emailId",userData.emailId);
                    sessionStorage.setItem("emailDomain",userData.emailDomain);
                    sessionStorage.setItem("eventId",EssentialData.eventId);
                    // setTimeout(() => {
                    //     EventFormData.cleareData();
                    //     window.scrollTo({
                    //         top: 0,
                    //         behavior: 'smooth' // 부드러운 스크롤 효과
                    //     });
                    // }, 100);
                    location.href="game.html";
                }
            })
            .catch(error => console.error('Error:', error));
    }

    ,cleareData(){
        inputs.forEach(input => {
            input.value = '';
        });
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
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
const version=2511271800;
console.log(version);