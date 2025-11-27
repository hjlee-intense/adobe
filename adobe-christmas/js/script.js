const fileSelect = document.querySelector("#file-select");
const selectFile = document.querySelector(".selectFile");
const emailSelect = document.querySelector("#email-select");
const emailDomain = document.querySelector(".email-domain");
const moExample = document.querySelector("#moExample");
const termCheck = document.querySelectorAll(".frm-check label");


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

  console.log(name);
  let modalPop = document.querySelector(`#${name}`);
  if (name === "complete") {
    layerScrollOff();
  }
  modalPop.classList.remove("hide");
  $('#embedim--snow').hide();

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
  $('#embedim--snow').show();
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
});


// 크리스마스 트리 아이템 클릭
$('.div-tree .item, .div-tree .click').on('click', function() {
 var stageId = "stage" + $(this).attr('class').substr(-1);
  modalOpen(stageId);
});

// btn-close
$('.btn-close').on('click', function() {  
  var modalId = $(this).parent().attr('id');  
  console.log(modalId);
  modalClose(modalId);  
});


$('.btn-tip').on('click', function(){
    $(this).toggleClass('open');
    $('.tip').toggleClass('on');
    
});


// Stage2 Quiz - 다음버튼
$("#stage2 .quiz1 .btn-next, #stage2 .quiz2 .btn-next").on('click', function() {
  // console.log('test');
  var n = Number($(this).parent().parent().attr('class').substr(-1)) + 1;
  $('#stage2 .quiz').addClass('hide');
  $('#stage2 .quiz'+ n).removeClass('hide');
});
// Stage2 Quiz - 퀴즈풀기
$('#stage2 .choices li').on('click', function() {  
  $('#stage2 .choices li').removeClass('on');  
  $(this).addClass('on');
});



// modalOpen('confirm');