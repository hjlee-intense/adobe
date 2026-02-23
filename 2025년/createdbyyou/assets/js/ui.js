const fileSelect = document.querySelector("#file-select");
const selectFile = document.querySelector(".selectFile");
const emailSelect = document.querySelector("#email-select");
const emailDomain = document.querySelector(".email-domain");
const moExample = document.querySelector("#moExample");
const termCheck = document.querySelectorAll(".terms-area .frm-check label");

// file upload
fileSelect.addEventListener("change", (event) => {
  let fileSize = event.target.files[0].aize;
  const limiteSize = 1024 * 1024 * 5; /* 5mb */
  let selectValue = event.target.files[0].name;
  if (limiteSize < fileSize) {
    alert("5MB 사이즈 이하만 \n업로드가 가능합니다.");
  } else {
    selectFile.innerHTML = selectValue;
  }
});

// downloadFile
// function downloadFile(sharedUrl) {
//   // location.href=  url;
//   const fileId = sharedUrl.match(/\/d\/([^/]+)/)[1];   
//   const directUrl = 'https://drive.google.com/uc?export=download&id=' + fileId;
//   console.log(directUrl);

//   // Hidden iframe approach avoids opening a new window
//   const iframe = document.createElement('iframe');
//   iframe.style.display = 'none';
//   iframe.src = directUrl;
//   document.body.appendChild(iframe);

//   setTimeout(() => document.body.removeChild(iframe), 5000);
// }
// function downloadFile(sharedUrl) {
//   const fileId = sharedUrl.match(/\/d\/([^/]+)/)[1];
//   const directUrl = 'https://drive.google.com/uc?export=download&id=' + fileId;

//   const link = document.createElement('a');
//   link.href = directUrl;
//   link.download = ''; // 파일명이 자동 지정됨. 지정하고 싶으면 link.download = '파일명.ext';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }


// email domain select
emailSelect.addEventListener("change", (event) => {
  let selectValue = event.target.value;
  if (selectValue === "") {
    emailDomain.focus();
  }
  emailDomain.value = selectValue;
});

let scrollPos;
const layerScrollOff = () => {
  scrollPos = window.scrollY;
  document.body.style.overflow = "hidden";
}

const layerScrollOn = () => {
  window.scrollY = scrollPos;
  document.body.style.overflow = "";
}

// modal open
const modalOpen = (name) => {
  let modalPop = document.querySelector(`#${name}`);
  if (name === "complete") {
    layerScrollOff();
  }
  modalPop.classList.remove("hide");
};

// modal close
const modalClose = (name, termChk) => {
  let modalPop = document.querySelector(`#${name}`);
  if (name === "complete") {
    layerScrollOn();
  }
  
  if (name === "terms-view1" || name === "terms-view2") {
    if (termChk) {
      let checkBox = document.querySelector(`#${termChk}`);
      checkBox.checked = true;
    }
  }
  
  modalPop.classList.add("hide");
};

termCheck.forEach((item, index) => {

  
  item.addEventListener("click", (event) => {
    // console.log(item);
    event.preventDefault();
    let checkBox = event.target.previousElementSibling;
    if(checkBox.checked) {
      checkBox.checked = false;
    } else {
      if (index === 0) {
        modalOpen('terms-view1');
      } else {
        modalOpen('terms-view2');
      }
    }
  })
})

// 모바일 체크 함수
function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// // 메인 분기 함수
// function handleDownload() {
//   if (isMobile()) {
//     downloadMobileImages();
//   } else {
//     window.open('https://drive.google.com/file/d/1vjKPSHbpjb6VmKBYLO9LHVUghCL0kmk6/view?usp=sharing', '_blank');
//   }
// }

// // 모바일 이미지 다운로드
// function downloadMobileImages() {
//   const files = ['simple_summer.png', 'gra_summer.png'];

//   files.forEach((file, index) => {
//     setTimeout(() => {
//       const link = document.createElement('a');
//       link.href = `./assets/image/${file}`;
//       link.download = file;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }, index * 500); // 500ms 간격 (파일 2개면 0ms, 500ms)
//   });
// }

