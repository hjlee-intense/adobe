const EssentialData={
    eventId: "xmas-2025",
    serviceId:"eventAdobe",
    // serviceDomain: "http://localhost:8090"
    serviceDomain: "https://backendserviceapi.event-adobe.com"
    ,init(){
        let requestTime = new Date().getTime();
        const tempRequestTime = new Date().getTime();
        const page = location.href;
        const referer = document.referrer;

        let dropInMode = "NEW";
        if(window.localStorage.getItem("requestTime") != null
            && window.localStorage.getItem("requestTime") != undefined
            && window.localStorage.getItem("requestData") != null
            && window.localStorage.getItem("requestData") != undefined){
            console.log("Existing dropInUser data found in localStorage.");
            dropInMode = "RETURN";
            requestTime = window.localStorage.getItem("requestTime");
        }
        fetch(this.serviceDomain + "/dropInUser", {
            method: 'POST', // POST 요청
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requestTime: requestTime
                ,eventId: this.eventId
                ,tempRequestTime: tempRequestTime
                ,dropInPage: page
                ,dropInMode: dropInMode
                ,orgReferer : referer
                ,serviceId: this.serviceId
            }),
        })
            .then(response => response.json())  // 서버 응답을 JSON으로 파싱
            .then(result => {
                console.log(result);
                console.log("result.requestData :" + result.data.requestData);
                window.localStorage.setItem("requestTime", result.data.requestTime);
                window.localStorage.setItem("requestData", result.data.requestData);
            })
            .catch(error => console.error('Error:', error));  // 오류 처리
    }
}