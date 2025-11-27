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

    document.getElementById('file-select').addEventListener('change', function(event) {
    const file = event.target.files[0]; // 사용자가 선택한 첫 번째 파일
    if (file) {
        console.log('파일 이름:', file.name);
        console.log('파일 크기:', file.size, 'bytes');
        console.log('파일 유형:', file.type);

        const maxSize = 25 * 1024 * 1024; // 25MB
        const allowedType = 'video/mp4';

        // 용량 체크
        if (file.size > maxSize) {
            alert("25MB 이하의 MP4 파일만 업로드 가능합니다.");
            return false;
        }

        // MIME 타입 체크 (file.type은 대부분의 최신 브라우저에서 지원)
        if (file.type !== allowedType) {
            alert("MP4 형식의 파일만 업로드 가능합니다.");
            return false;
        }

        setTimeout(() => {
            EventFormData.upload();
        }, 500); // 500ms 지연 후 업로드 실행
    }
    });
    document.querySelector('div.btn-area button').onclick=function(){
        const finishDate = new Date(2025, 8, 23, 23, 59, 59);
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
            alert("이벤트가 종료되었습니다.");
            return false;
        }
    };
    // document.querySelector('div#complete .close').onclick=function(){
    //     modalClose('complete');
    // }
    document.querySelectorAll('div#complete button')[0].onclick=function(){
        console.log("kakao 공유");
        ShareObject.sendTemplate();
        modalClose('complete');
    }
    document.querySelectorAll('div#complete button')[1].onclick=function(){
        console.log("kakao 채널");
        location.href ="http://pf.kakao.com/_xoVexis";
    }
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

const Validation = {
    checkValid() {
        if(EventFormData.uploadData === null){
            alert("업로드할 동영상 파일을 선택하세요.");
            document.getElementById('file-select').scrollIntoView({ behavior: 'smooth', block: 'center' });
            //document.getElementById('file-select').focus();
            return false;
        }
        const name = inputs[0].value;
        const cleanedName = name.replace(/\s+/g, ''); // 모든 공백 제거
        console.log("cleanedName :"+ cleanedName + " length:"+ cleanedName.length );
        if(cleanedName.length < 2){
            alert("이름을 정확히 입력하세요.");
            inputs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            inputs[0].focus();
            return false;
        }
        const telInput = document.querySelector('input[type="tel"]').value;
        if (!telInput.startsWith('010') || telInput.length != 11) {
            alert("휴대폰번호를 확인하세요");
            inputs[1].scrollIntoView({ behavior: 'smooth', block: 'center' });
            inputs[1].focus();
            return false;
        }
        const adobeId = inputs[2].value;
        if(inputs[2].value.length < 2){
            alert("구독중인 AdobeId를 확인하세요");
            inputs[2].scrollIntoView({ behavior: 'smooth', block: 'center' });
            inputs[2].focus();
            return false;
        }
        const domainPattern = /^(?!-)(?!.*-$)(?!.*--)[A-Za-z0-9-]{1,63}(\.[A-Za-z0-9-]{1,63})*\.[A-Za-z]{2,6}$/;
        if (inputs[3].value.length  === 0) {
            alert("이메일 도메인 주소를 확인하세요");
            inputs[2].scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }
        if (!domainPattern.test(inputs[3].value)) {
            alert("유효하지 않은 도메인 주소입니다.");
            return false;
        }
        if(!Array.from(checkboxes).every(checkbox => checkbox.checked)){
            alert("필수 약관에 모두 동의 하셔야 합니다");
            return false;
        }
        return {
            userName : inputs[0].value
            ,phoneNumber : inputs[1].value
            ,emailId : inputs[2].value
            ,emailDomain : inputs[3].value
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
                    alert("이미 참여한 아이디 입니다");
                    return false;
                }else{
                    EventFormData.joinEventUser(userData);
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
    ,upload(){
        let fileInput = document.getElementById("file-select");
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