//Data、Event、View
//Data
//計算BMI
function set_data_in_localStorage(JSON_data){
  const str = JSON.stringify(JSON_data);
  localStorage.setItem('data',str);
}
function get_JSON_data_form_localStorage(){
  let str = localStorage.getItem('data');
  str = JSON.parse(str);
  return str;
}
function BMI_calculate(height,weight){
  let convertedHeight = null;
  let convertedWeight = weight;
  let BMI = null;
  if(height>10){
    height/=100;
  }
  convertedHeight = Math.pow(height,2);
  BMI = convertedWeight/convertedHeight;
  BMI = BMI.toFixed(2);
  return BMI
}
function get_BMI_state(BMI){
  const BMI_state = ['過輕','正常','過重','輕度肥胖','中度肥胖','重度肥胖'];
  if(BMI < 18.5){
    return BMI_state[0];
  }else if(BMI < 24){
    return BMI_state[1];
  }else if(BMI < 27){
    return BMI_state[2];
  }else if(BMI < 30){
    return BMI_state[3];
  }else if(BMI < 35){
    return BMI_state[4];
  }else{
    return BMI_state[5];
  }
}
//Event
//1 新增紀錄
const btn = document.querySelector('.check-btn');
btn.addEventListener('click',click_event_addBMI);
function click_event_addBMI(e){

  //抓input值，並存為物件
  const input = document.querySelectorAll('.input-area input');
  
  let height = input[0].value;
  let weight = input[1].value;
  const warningText = document.querySelector('.warning-text');
  if(height === "" || weight === ""){
    warningText.textContent = "空值無法計算";
    return;
  }
  if(isNaN(+height) || isNaN(+weight)){
    warningText.textContent = "請輸入數字";
    input[0].value = "";
    input[1].value = "";
    return;
  }else if(height < 0 || weight < 0){
    warningText.textContent = "請輸入正數";
    input[0].value = "";
    input[1].value = "";
    return;
  }
  const newObj = {
    height: height,
    weight: weight
  }
  //抓時間，存進物件
  const time = new Date();
  const timeObj = {};
  timeObj.year = time.getFullYear();
  timeObj.month = time.getMonth() + 1;
  timeObj.day = time.getDay();
  newObj.time = timeObj;
  //物件存進localStorage
  const data = get_JSON_data_form_localStorage();
  data.push(newObj);
  set_data_in_localStorage(data);
  //render btn
  const BMI = BMI_calculate(height,weight);
  render_result_in_btn(BMI);
  //render list
  render_all_result_in_BMI_list(data);
  btn.removeEventListener('click',click_event_addBMI);
}
//2 reset紀錄
const reset = document.getElementById('reset-result');
reset.addEventListener('click',click_event_reset);
function click_event_reset(e){
  //clean input
  const input = document.querySelectorAll('.input-area input');
  input[0].value = "";
  input[1].value = "";
  //class change
  const checkBtn = document.querySelector('.check-btn');
  checkBtn.setAttribute('class','check-btn');
  if(e.target.nodeName == 'IMG'){
    e.path[1].setAttribute('class','d-none');
  }if(e.target.nodeName == 'DIV'){
    e.path[0].setAttribute('class','d-none');
  }
  //node change
  const checkBtn_p = document.querySelector('.check-btn p');
  const p_textNode = document.createTextNode('看結果');
  checkBtn_p.replaceChild(p_textNode,checkBtn_p.childNodes[0]);
  const small_elementNode = document.createElement('small');
  checkBtn_p.replaceChild(small_elementNode,checkBtn_p.childNodes[1]);
  const em_elementNode = document.createElement('em');
  checkBtn_p.replaceChild(em_elementNode,checkBtn_p.childNodes[2]);

  e.stopPropagation();
  btn.addEventListener('click',click_event_addBMI);
}
//3 點擊list 刪除紀錄
const listGroup = document.querySelector('.BMI-list');
listGroup.addEventListener('click',function(e){
  if(e.target.nodeName !== 'LI'){return};
  const list_num = e.target.dataset.num;
  const data = get_JSON_data_form_localStorage();
  let dataLen = data.length - 1;
  const true_num = dataLen - list_num;
  data.splice(true_num,1);
  set_data_in_localStorage(data);
  render_all_result_in_BMI_list(data);
  if(data.length){return}
  else{
    const clearBtn = document.querySelector('.clearAllBMI');
    clearBtn.classList.remove('d-none');
  }
})
//View
//1 render btn
function render_result_in_btn(BMI){
  const btnP = document.querySelector('.check-btn p');
  const btnEm = document.querySelector('.check-btn p em');

  const p = document.createTextNode(BMI);
  btnP.replaceChild(p,btnP.childNodes[0]);

  const reset_btn = document.querySelector('.check-btn div');
  reset_btn.setAttribute('class','reset-result');

  const check_btn = document.querySelector('.check-btn');
  let check_btn_class = 'check-btn';

  let BMI_result = get_BMI_state(BMI);
  switch(BMI_result){
    case '過輕':
      check_btn_class += ` check-btn-thin`;
      break;
    case '正常':
      check_btn_class += ` check-btn-success`;
      break;
    case '過重':
      check_btn_class += ` check-btn-overWeight`;
      break;
    case '輕度肥胖':
      check_btn_class += ` check-btn-fat`;
      break;
    case '中度肥胖':
      check_btn_class += ` check-btn-fat`;
      break;
    case '重度肥胖':
      check_btn_class += ` check-btn-gg`;
      break;
  }
  
  check_btn.setAttribute('class',check_btn_class);

  const result = document.createTextNode(BMI_result);
  const em = document.createElement('em');
  em.appendChild(result);
  btnP.replaceChild(em,btnP.childNodes[2]);
  
}
//2 render list
function render_result_in_BMI_list(height,weight,year_Month_Day,list_num){
  //寫進list+取得時間
  const BMI = BMI_calculate(height,weight);
  const BMI_state = get_BMI_state(BMI);
  if(height < 10){height *=  100;}
  
  const year = year_Month_Day.year;
  const month = year_Month_Day.month;
  const day = year_Month_Day.day;

  const listNode = document.createElement('li');
  let listNode_class = null;
  switch(BMI_state){
    case '過輕':
      listNode_class = `border-thin`;
      break;
    case '正常':
      listNode_class = `border-success`;
      break;
    case '過重':
      listNode_class = `border-overWeight`;
      break;
    case '輕度肥胖':
      listNode_class = `border-fat`;
      break;
    case '中度肥胖':
      listNode_class = `border-fat`;
      break;
    case '重度肥胖':
      listNode_class = `border-gg`;
      break;
  }
  listNode.setAttribute('class',listNode_class);
  listNode.setAttribute('data-num',list_num);
  let str = `
  <p>${BMI_state}</p>
  <div>
    <small>BMI</small>
    <p>${BMI}</p>
  </div>
  <div>
    <small>weight</small>
    <p>${weight}kg</p>
  </div>
  <div>
    <small>height</small>
    <p>${height}cm</p>
  </div>
  <small>${month}-${day} ${year}</small>
  `
  listNode.innerHTML = str;
  const listGroup = document.querySelector('.BMI-list');
  listGroup.appendChild(listNode);
}
//3 render_all_result_in_BMI_list
function render_all_result_in_BMI_list(data){
  const clearBtn = document.querySelector('.clearAllBMI');
  const listGroup = document.querySelector('.BMI-list');
  listGroup.innerHTML = "";
  data.reverse();
  data.map((obj,index)=>{
    let h = obj.height;
    let w = obj.weight;
    let t = obj.time;
    render_result_in_BMI_list(h,w,t,index);
  })
  if(listGroup.innerHTML === ""){return}
  else{clearBtn.classList.remove('d-none')}
  
}
(function init(){
  if(!get_JSON_data_form_localStorage()){
    const data = [];
    set_data_in_localStorage(data);
  }
  const data = get_JSON_data_form_localStorage();
  render_all_result_in_BMI_list(data);
}())
//4 clear_all_BMI_list
const clearBtn = document.querySelector('.clearAllBMI');
clearBtn.addEventListener('click',function(e){
  const BMIGroup = document.querySelector('.BMI-list');
  BMIGroup.innerHTML = "";
  set_data_in_localStorage([]);
  this.classList.add('d-none');
});
