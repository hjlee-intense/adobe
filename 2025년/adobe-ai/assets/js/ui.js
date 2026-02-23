const fileSelect = document.querySelector("#file-select");
const selectFile = document.querySelector(".selectFile");
const emailSelect = document.querySelector("#email-select");
const emailDomain = document.querySelector(".email-domain");
const moExample = document.querySelector("#moExample");
const termCheck = document.querySelectorAll(".frm-check label");

// file upload
// fileSelect.addEventListener("change", (event) => {
//   let fileSize = event.target.files[0].aize;
//   const limiteSize = 1024 * 1024 * 5; /* 5mb */
//   let selectValue = event.target.files[0].name;
//   if (limiteSize < fileSize) {
//     alert("5MB 사이즈 이하만 \n업로드가 가능합니다.");
//   } else {
//     selectFile.innerHTML = selectValue;
//   }
// });

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
  layerScrollOff();
  if (name === "complete") {
    modalClose("quiz");
    
  }
  modalPop.classList.remove("hide");
};

// modal close
const modalClose = (name, termChk) => {
  let modalPop = document.querySelector(`#${name}`);
  // if (name === "complete") {
    layerScrollOn();
  // }
  
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
