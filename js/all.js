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
btn.addEventListener('click',function(e){

  //抓input值，並存為物件
  const input = document.querySelectorAll('.input-area input');
  let height = input[0].value;
  input[0].value = "";
  let weight = input[1].value;
  input[1].value = "";
  const newObj = {
    height: height,
    weight: weight
  }
  //處理localStorage儲存
  const data = get_JSON_data_form_localStorage();
  data.push(newObj);
  set_data_in_localStorage(data);
  //render btn
  const BMI = BMI_calculate(height,weight);
  render_result_in_btn(BMI);
  //render list
  const listGroup = document.querySelector('.BMI-list');
  for (const item of data) {
    let h = item.height;
    let w = item.weight;
    render_result_in_BMI_list(h,w);
  }
})
//2 reset紀錄
const reset = document.getElementById('reset-result');
reset.addEventListener('click',function(e){

})

//3 點擊list 刪除紀錄
const listGroup = document.querySelector('.BMI-list');
listGroup.addEventListener('click',function(e){
  if(e.target.nodeName !== 'LI'){return};
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
  console.log(em);
  btnP.replaceChild(em,btnP.childNodes[2]);
  
}
//2 render list
function render_result_in_BMI_list(height,weight){
  //寫進list+取得時間
  const BMI = BMI_calculate(height,weight);
  const BMI_state = get_BMI_state(BMI);
  if(height < 10){height *=  100;}
  
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDay();
  console.log(day);
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
//3
function render_all_result_in_BMI_list(data){
  
  data.reverse();
  for (const obj of data) {
    let h = obj.height;
    let w = obj.weight;
    console.log(obj);
    render_result_in_BMI_list(h,w);
  }
}

(function init(){
  if(!get_JSON_data_form_localStorage()){
    const data = [];
    set_data_in_localStorage(data);
  }
  const data = get_JSON_data_form_localStorage();
  render_all_result_in_BMI_list(data);
}())
