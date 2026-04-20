const categoriesData = {
  basic: [
    { value: 'compare', label: '수의 크기 비교 (부등호)' },
    { value: 'decompose', label: '수의 가르기와 모으기' },
    { value: 'zero', label: '0의 개념' }
  ],
  add_sub: [
    { value: 'add_1', label: '한 자리 수 덧셈' },
    { value: 'add_2', label: '두 자리 수 덧셈' },
    { value: 'add_3', label: '세 자리 수 이상 덧셈' },
    { value: 'sub_1', label: '한 자리 수 뺄셈' },
    { value: 'sub_2', label: '두 자리 수 뺄셈' },
    { value: 'sub_3', label: '세 자리 수 이상 뺄셈' },
    { value: 'mixed_add_sub_1', label: '한 자리 수 덧셈과 뺄셈 혼합' },
    { value: 'mixed_add_sub_2', label: '두 자리 수 덧셈과 뺄셈 혼합' },
    { value: 'mixed_add_sub_3', label: '세 자리 수 이상 덧셈과 뺄셈 혼합' }
  ],
  mul_div: [
    { value: 'mul_1', label: '구구단 (한 자리 곱셈)' },
    { value: 'mul_2x1', label: '두 자리 수 × 한 자리 수' },
    { value: 'mul_3x1', label: '세 자리 수 × 한 자리 수' },
    { value: 'mul_2', label: '두 자리 수 곱셈' },
    { value: 'div_1', label: '나눗셈 기초 (나머지 없음)' },
    { value: 'div_2', label: '두 자리 수 나눗셈' }
  ],
  frac_dec: [
    { value: 'frac_add_sub', label: '분수의 덧셈/뺄셈' },
    { value: 'dec_add_sub', label: '소수의 덧셈/뺄셈' },
    { value: 'factor_multi', label: '약수와 배수 구하기' }
  ],
  mixed: [
    { value: 'mixed_2', label: '기호 2개 혼합' },
    { value: 'mixed_3', label: '기호 3개 혼합' },
    { value: 'mixed_br_2', label: '괄호 포함 기호 2개 혼합' },
    { value: 'mixed_br_3', label: '괄호 포함 기호 3개 혼합' }
  ],
  story: [
    { value: 'story_all', label: '🎲 문장제 무작위 섞기' },
    { value: 'story_addsub', label: '1. 덧셈과 뺄셈' },
    { value: 'story_mul', label: '2. 곱셈' },
    { value: 'story_div', label: '3. 나눗셈' },
    { value: 'story_time', label: '4. 시간 계산' },
    { value: 'story_weight', label: '5. 무게 측정' },
    { value: 'story_len', label: '6. 길이 계산' },
    { value: 'story_mixed', label: '7. 혼합 계산' },
    { value: 'story_conv', label: '8. 단위 변환' }
  ]
};

// UI Elements
const categorySelect = document.getElementById('category');
const subCategorySelect = document.getElementById('subCategory');
const carryOverGroup = document.getElementById('carryOverGroup');
const allowCarryOverCheckbox = document.getElementById('allowCarryOver');
const layoutRadios = document.getElementsByName('layout');
const colorGuideCheck = document.getElementById('colorGuideCheck');
const problemsContainer = document.getElementById('problemsContainer');
const answersContainer = document.getElementById('answersContainer');
const worksheetTitle = document.getElementById('worksheetTitle');
const answerSheetTitle = document.getElementById('answerSheetTitle');

// Button Elements
const generateBtn = document.getElementById('generateBtn');
const saveImgBtn = document.getElementById('saveImgBtn');
const saveAnsBtn = document.getElementById('saveAnsBtn');
const printWorksheetBtn = document.getElementById('printWorksheetBtn');
const printAllBtn = document.getElementById('printAllBtn');

// Story Elements
const storyNames = ["지우", "민수", "서윤", "도윤", "하준", "수아", "유빈", "은우", "건우", "시아", "아인", "연우"];

// Initialize Options & UI Bindings
function initCategoriesList() {
  categorySelect.innerHTML = '';
  subCategorySelect.innerHTML = '';

  const defaultCats = [
    {k: 'basic', l: '수의 개념 및 비교'},
    {k: 'add_sub', l: '덧셈과 뺄셈'},
    {k: 'mul_div', l: '곱셈과 나눗셈'},
    {k: 'frac_dec', l: '분수와 소수'},
    {k: 'mixed', l: '혼합 계산'},
    {k: 'story', l: '📖 실생활 문장제 영역'}
  ];
  
  defaultCats.forEach(c => {
    let opt = document.createElement('option');
    opt.value = c.k;
    opt.text = c.l;
    categorySelect.appendChild(opt);
  });
  updateSubCategories();
}

function updateSubCategories() {
  subCategorySelect.innerHTML = '';
  const selectedCat = categorySelect.value || 'basic';
  
  if(categoriesData[selectedCat]) {
    categoriesData[selectedCat].forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub.value;
      opt.textContent = sub.label;
      subCategorySelect.appendChild(opt);
    });
    carryOverGroup.style.display = (selectedCat === 'add_sub') ? 'flex' : 'none';
  }
  updateWorksheetTitle();
}

categorySelect.addEventListener('change', updateSubCategories);
subCategorySelect.addEventListener('change', updateWorksheetTitle);

function updateWorksheetTitle() {
    let mainText = "";
    if (categorySelect.selectedIndex >= 0) {
        mainText = categorySelect.options[categorySelect.selectedIndex].text;
    }
    let subText = "";
    if (subCategorySelect.selectedIndex >= 0) {
        subText = subCategorySelect.options[subCategorySelect.selectedIndex].text;
    }
    
    // Remove emojis for title
    let rawTitle = subText || mainText;
    rawTitle = rawTitle.replace(/[^\uAC00-\uD7A3a-zA-Z0-9\s()]/g, '').trim(); 
    if(rawTitle === '문장제 무작위 섞기') rawTitle = '종합 실생활 문장제';
    
    worksheetTitle.textContent = rawTitle;
    answerSheetTitle.textContent = `${rawTitle} - 정답지`;
}

// Layout Switcher
layoutRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.value === '1-col') {
      problemsContainer.className = 'problems-container layout-1-col';
    } else {
      problemsContainer.className = 'problems-container layout-2-col';
    }
    if (colorGuideCheck.checked) {
      problemsContainer.classList.add('visual-support');
    }
  });
});

colorGuideCheck.addEventListener('change', (e) => {
  if(e.target.checked) {
    problemsContainer.classList.add('visual-support');
  } else {
    problemsContainer.classList.remove('visual-support');
  }
});

// Random Utils
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDivisors(num) {
  let divs = [];
  for(let i=1; i<=num; i++) {
    if(num % i === 0) divs.push(i);
  }
  return divs.join(', ');
}

function formatNum(numStr) {
  let str = String(numStr);
  let parts = str.split('.');
  let intPart = parts[0];
  let res = "";
  let length = intPart.length;
  for (let i = 0; i < length; i++) {
    let digit = intPart[i];
    let place = length - i; 
    if (place === 1) res += `<span class="num-ones">${digit}</span>`;
    else if (place === 2) res += `<span class="num-tens">${digit}</span>`;
    else if (place === 3) res += `<span class="num-hundreds">${digit}</span>`;
    else res += digit; 
  }
  if (parts.length > 1) res += '.' + parts[1];
  return res;
}

// 이름의 받침 유무에 따라 알맞은 조사를 붙여주는 함수
function getJosa(name, type) {
  const lastChar = name.charCodeAt(name.length - 1);
  // 한글의 유니코드 범위 밖이거나 오류가 있는 경우 기본 처리를 위해
  if (lastChar < 44032 || lastChar > 55203) return name + type; 
  
  const hasJongseong = (lastChar - 44032) % 28 > 0;
  if (type === '는') return hasJongseong ? name + '이는' : name + '는';
  if (type === '가') return hasJongseong ? name + '이가' : name + '가';
  if (type === '네') return hasJongseong ? name + '이네' : name + '네';
  return name;
}

/* =========================================
   STORY PROBLEM GENERATOR (NEW 8 DOMAINS)
========================================= */
function generateStoryProblem(type) {
    if (type === 'story_all') {
        const types = ['story_addsub', 'story_mul', 'story_div', 'story_time', 'story_weight', 'story_len', 'story_mixed', 'story_conv'];
        type = types[rand(0, types.length - 1)];
    }
    
    let name = storyNames[rand(0, storyNames.length - 1)];
    let nameNun = getJosa(name, '는');
    let nameGa = getJosa(name, '가');
    let nameNe = getJosa(name, '네');
    let story = "";
    let answer = "";
    let icon = "";

    function pick(arr) { return arr[rand(0, arr.length - 1)]; }
    
    switch(type) {
        case 'story_addsub': {
            let op = rand(0, 1) === 0 ? 'add' : 'sub';
            let a = rand(15, 200);
            let b = rand(10, 150);
            if (op === 'add') {
                let sc = pick(storyScenarios.addsub_add);
                icon = sc.icon;
                story = sc.tpl(nameNun, formatNum(a), formatNum(b));
                answer = `${formatNum(a+b)}${sc.unit}`;
            } else {
                if (a < b) { let t = a; a = b; b = t; }
                let sc = pick(storyScenarios.addsub_sub);
                icon = sc.icon;
                story = sc.tpl(nameNun, formatNum(a), formatNum(b));
                answer = `${formatNum(a-b)}${sc.unit}`;
            }
            break;
        }
        case 'story_mul': {
            let a = rand(10, 80);
            let b = rand(4, 15);
            let sc = pick(storyScenarios.mul);
            icon = sc.icon;
            story = sc.tpl(formatNum(a), formatNum(b), sc.item);
            answer = `${formatNum(a*b)}${sc.item[1]}`;
            break;
        }
        case 'story_div': {
            let kind = rand(0, 1) === 0 ? "equal" : "contain";
            if (kind === "equal") {
                let p = rand(3, 9);
                let total = p * rand(3, 12);
                let sc = pick(storyScenarios.div_equal);
                icon = sc.icon;
                story = sc.tpl(nameNun, formatNum(total), formatNum(p));
                answer = `${formatNum(total/p)}개`;
            } else {
                let p2 = rand(3, 8);
                let total = p2 * rand(5, 15);
                let sc = pick(storyScenarios.div_contain);
                icon = sc.icon;
                story = sc.tpl(nameNun, formatNum(total), formatNum(p2));
                answer = `${formatNum(total/p2)}개`;
            }
            break;
        }
        case 'story_time': {
            icon = pick(["🕰️", "⏱️", "⏰"]);
            if (rand(0, 1) === 0) {
                let h1 = rand(1, 4), m1 = rand(5, 50);
                let dur = rand(45, 150);
                let t1_mins = h1 * 60 + m1;
                let t2_mins = t1_mins + dur;
                let sStr = `오후 ${h1}시 ${m1}분`;
                let eH = Math.floor(t2_mins / 60);
                let eM = t2_mins % 60;
                let eStr = `오후 ${eH}시 ${eM}분`;
                let dh = Math.floor(dur / 60);
                let dm = dur % 60;
                let durStr = dh > 0 ? `${dh}시간 ${dm}분` : `${dm}분`;

                let qType = rand(0, 2);
                if (qType === 0) {
                    let sc = pick(storyScenarios.time_duration);
                    story = sc.tpl(nameNun, sStr, eStr);
                    answer = durStr;
                } else if (qType === 1) {
                    let sc = pick(storyScenarios.time_start);
                    story = sc.tpl(nameNun, durStr, eStr);
                    answer = sStr;
                } else {
                    let sc = pick(storyScenarios.time_end);
                    story = sc.tpl(nameNun, sStr, durStr);
                    answer = eStr;
                }
            } else {
                let m1 = rand(65, 200);
                let dh = Math.floor(m1 / 60);
                let dm = m1 % 60;
                let sc = pick(storyScenarios.time_convert);
                story = sc.tpl(nameNun, m1);
                answer = dh > 0 ? `${dh}시간 ${dm}분` : `${dm}분`;
            }
            break;
        }
        case 'story_weight': {
            if (rand(0, 1) === 0) {
                let w1 = rand(150, 950);
                let w2 = rand(1500, 3500);
                let ansG = w1 + w2;
                let h = Math.floor(ansG / 1000);
                let g = ansG % 1000;
                let sc = pick(storyScenarios.weight_add);
                icon = sc.icon;
                story = sc.tpl(nameNun, w1, w2);
                answer = h > 0 ? `${h}kg ${g}g` : `${g}g`;
            } else {
                let bagW = rand(2500, 4500);
                let bookW = rand(800, 1900);
                let rG = bagW - bookW;
                let h = Math.floor(rG / 1000);
                let g = rG % 1000;
                let bagStr = Math.floor(bagW/1000) > 0 ? `${Math.floor(bagW/1000)}kg ${bagW%1000}g` : `${bagW}g`;
                let bookStr = Math.floor(bookW/1000) > 0 ? `${Math.floor(bookW/1000)}kg ${bookW%1000}g` : `${bookW}g`;
                let sc = pick(storyScenarios.weight_sub);
                icon = sc.icon;
                story = sc.tpl(nameGa, bagStr, bookStr);
                answer = h > 0 ? `${h}kg ${g}g` : `${g}g`;
            }
            break;
        }
        case 'story_len': {
            if (rand(0, 1) === 0) {
                let len1 = rand(120, 350);
                let len2 = rand(90, 250);
                let ans = len1 + len2;
                let h = Math.floor(ans / 100);
                let c = ans % 100;
                let l1_str = Math.floor(len1/100) > 0 ? `${Math.floor(len1/100)}m ${len1%100}cm` : `${len1}cm`;
                let l2_str = Math.floor(len2/100) > 0 ? `${Math.floor(len2/100)}m ${len2%100}cm` : `${len2}cm`;
                let sc = pick(storyScenarios.len_add);
                icon = sc.icon;
                story = sc.tpl(nameNun, l1_str, l2_str);
                answer = `${h}m ${c}cm`;
            } else {
                let km = rand(2, 6);
                let m = rand(100, 800);
                let totalM = km * 1000 + m;
                let walked = rand(600, 2000);
                let left = totalM - walked;
                let left_km = Math.floor(left / 1000);
                let left_m = left % 1000;
                let sc = pick(storyScenarios.len_sub);
                icon = sc.icon;
                story = sc.tpl(nameNe, km, m, walked);
                answer = left_km > 0 ? `${left_km}km ${left_m}m` : `${left_m}m`;
            }
            break;
        }
        case 'story_mixed': {
            let init = rand(10, 30);
            let plus = rand(20, 50);
            let div = rand(3, 6);
            let tempTarget = Math.floor((init + plus) / div);
            let newPlus = (tempTarget * div) - init;
            if (newPlus <= 0) newPlus += div * 3;
            let ans = (init + newPlus) / div;
            let sc = pick(storyScenarios.mixed);
            icon = sc.icon;
            story = sc.tpl(nameNun, init, newPlus, div);
            answer = `${ans}개`;
            break;
        }
        case 'story_conv': {
            icon = pick(["🔄", "🚀", "💡"]);
            let typ = rand(0, 2);
            if (typ === 0) {
                let m = rand(80, 220);
                let h = Math.floor(m / 60);
                let rem = m % 60;
                let sc = pick(storyScenarios.conv_time);
                story = sc.tpl(m);
                answer = `${h}시간 ${rem}분`;
            } else if (typ === 1) {
                let g = rand(1200, 4800);
                let kg = Math.floor(g / 1000);
                let rem = g % 1000;
                let sc = pick(storyScenarios.conv_weight);
                story = sc.tpl(g);
                answer = `${kg}kg ${rem}g`;
            } else {
                let cm = rand(150, 680);
                let m = Math.floor(cm / 100);
                let rem = cm % 100;
                let sc = pick(storyScenarios.conv_length);
                story = sc.tpl(cm);
                answer = `${m}m ${rem}cm`;
            }
            break;
        }
    }
    
    let exprHTML = `<div class="story-wrapper"><div class="story-icon">${icon}</div><div class="story-text">${story}</div></div>`;
    return { expr: exprHTML, ans: answer };
}

/* =========================================
   MAIN GENERATOR FUNCTION
========================================= */
function generateMathProblems() {
  const category = categorySelect.value;
  const subCategory = subCategorySelect.value;
  const allowCarry = allowCarryOverCheckbox.checked;
  
  const problems = [];
  
  for (let i = 0; i < 10; i++) {
    
    if (category === 'story') {
        problems.push(generateStoryProblem(subCategory));
        continue;
    }

    // SIMPLE CALCULATION MODE
    let expression = "";
    let answer = "";
    let solutionData = null;
    
    if (category === 'basic') {
      if (subCategory === 'compare') {
        let a = rand(10, 999);
        let b = rand(10, 999);
        expression = `${formatNum(a)} &#x25EF; ${formatNum(b)}`;
        answer = a > b ? '>' : (a < b ? '<' : '=');
      } else if (subCategory === 'decompose') {
        let total = rand(10, 100);
        let part = rand(1, total - 1);
        expression = `${formatNum(total)} = ${formatNum(part)} + ( &nbsp;&nbsp;&nbsp; )`;
        answer = total - part;
      } else if (subCategory === 'zero') {
        let a = rand(1, 100);
        let op = rand(0,1) ? '+' : '-';
        expression = `${formatNum(a)} ${op} ${formatNum(0)} = `;
        answer = op === '+' ? a + 0 : a - 0;
      }
    } 
    else if (category === 'add_sub') {
      let isAdd = subCategory.includes('add');
      if (subCategory.includes('mixed_add_sub')) isAdd = Math.random() > 0.5;
      
      let digits = 1;
      if (subCategory.includes('_2')) digits = 2;
      else if (subCategory.includes('_3')) digits = 3;
      
      let min = Math.pow(10, digits - 1);
      let max = Math.pow(10, digits) - 1;
      if (digits === 1) min = 1;

      let a = rand(min, max);
      let b = rand(min, max);

      if (isAdd) {
        if (!allowCarry) {
          a = rand(min, max);
          const maxbStr = a.toString().split('').map(d => 9 - parseInt(d)).join('');
          b = parseInt(maxbStr);
          if (b < min) b = rand(min, max);
        }
        expression = `${formatNum(a)} + ${formatNum(b)} = `;
        answer = a + b;
        solutionData = { a, b, op: '+', ans: a + b };
      } else {
        if (!allowCarry) {
          let a_str = ""; let b_str = "";
          for(let d=0; d<digits; d++) {
             let d_a = rand(1, 9);
             let d_b = rand(1, d_a);
             a_str += d_a; b_str += d_b;
          }
          a = parseInt(a_str); b = parseInt(b_str);
        } else {
          a = rand(min, max);
          b = rand(min, a);
        }
        expression = `${formatNum(a)} - ${formatNum(b)} = `;
        answer = a - b;
        solutionData = { a, b, op: '-', ans: a - b };
      }
    }
    else if (category === 'mul_div') {
      if (subCategory === 'mul_1') {
        let a = rand(2, 9), b = rand(2, 9);
        expression = `${formatNum(a)} &times; ${formatNum(b)} = `;
        answer = a * b;
        solutionData = { a, b, op: '×', ans: a * b };
      } else if (subCategory === 'mul_2x1') {
        let a = rand(10, 99), b = rand(2, 9);
        expression = `${formatNum(a)} &times; ${formatNum(b)} = `;
        answer = a * b;
        solutionData = { a, b, op: '×', ans: a * b };
      } else if (subCategory === 'mul_3x1') {
        let a = rand(100, 999), b = rand(2, 9);
        expression = `${formatNum(a)} &times; ${formatNum(b)} = `;
        answer = a * b;
        solutionData = { a, b, op: '×', ans: a * b };
      } else if (subCategory === 'mul_2') {
        let a = rand(10, 99), b = rand(2, 99);
        expression = `${formatNum(a)} &times; ${formatNum(b)} = `;
        answer = a * b;
        solutionData = { a, b, op: '×', ans: a * b };
      } else if (subCategory === 'div_1') {
        let b = rand(2, 9);
        let a = b * rand(2, 9);
        expression = `${formatNum(a)} &divide; ${formatNum(b)} = `;
        answer = a / b;
        solutionData = { a, b: b, op: '÷', ans: a / b };
      } else if (subCategory === 'div_2') {
        let b = rand(10, 50);
        let a = b * rand(3, 15);
        expression = `${formatNum(a)} &divide; ${formatNum(b)} = `;
        answer = a / b;
        solutionData = { a, b: b, op: '÷', ans: a / b };
      }
    }
    else if (category === 'frac_dec') {
      if (subCategory === 'frac_add_sub') {
        let den = rand(2, 10);
        let n1 = rand(1, den-1);
        let n2 = rand(1, den-1);
        let op = rand(0,1) ? '+' : '-';
        if (op === '-' && n1 < n2) { let temp = n1; n1=n2; n2=temp;}
        expression = `<sup>${formatNum(n1)}</sup>&frasl;<sub>${formatNum(den)}</sub> ${op} <sup>${formatNum(n2)}</sup>&frasl;<sub>${formatNum(den)}</sub> = `;
        let top = op === '+' ? n1 + n2 : n1 - n2;
        answer = `${top}/${den}`;
        if (top === den) answer = "1";
        if (top === 0) answer = "0";
      } else if (subCategory === 'dec_add_sub') {
        let a = (rand(1, 99) / 10).toFixed(1);
        let b = (rand(1, 99) / 10).toFixed(1);
        let op = rand(0,1) ? '+' : '-';
        if (op === '-' && parseFloat(a) < parseFloat(b)) { let temp = a; a=b; b=temp;}
        expression = `${formatNum(a)} ${op} ${formatNum(b)} = `;
        answer = op === '+' ? (parseFloat(a) + parseFloat(b)).toFixed(1) : (parseFloat(a) - parseFloat(b)).toFixed(1);
      } else if (subCategory === 'factor_multi') {
        let num = rand(12, 100);
        expression = `${formatNum(num)}의 약수를 모두 구하시오.`;
        answer = getDivisors(num);
      }
    }
    else if (category === 'mixed') {
       let ops = ['+', '-', '*', '/'];
       let entities = {'+':'+', '-':'-', '*':'&times;', '/':'&divide;'};
       let numOps = subCategory.includes('_3') ? 3 : 2;
       let hasBrackets = subCategory.includes('br');
       
       let valid = false; let attempts = 0;
       while(!valid && attempts < 1000) {
          attempts++;
          let n = [rand(2, 30), rand(2, 10), rand(2, 10), rand(2, 10)];
          let o = [ops[rand(0,3)], ops[rand(0,3)], ops[rand(0,3)]];
          for (let k = 0; k < numOps; k++) if (o[k] === '/') n[k] = n[k+1] * rand(2, 9);
          
          let exprRaw = ""; let exprHTML = "";
          
          if (numOps === 2) {
             if (hasBrackets) {
                if (Math.random() > 0.5) {
                   exprRaw = `(${n[0]} ${o[0]} ${n[1]}) ${o[1]} ${n[2]}`;
                   exprHTML = `(${formatNum(n[0])} ${entities[o[0]]} ${formatNum(n[1])}) ${entities[o[1]]} ${formatNum(n[2])}`;
                } else {
                   exprRaw = `${n[0]} ${o[0]} (${n[1]} ${o[1]} ${n[2]})`;
                   exprHTML = `${formatNum(n[0])} ${entities[o[0]]} (${formatNum(n[1])} ${entities[o[1]]} ${formatNum(n[2])})`;
                }
             } else {
                exprRaw = `${n[0]} ${o[0]} ${n[1]} ${o[1]} ${n[2]}`;
                exprHTML = `${formatNum(n[0])} ${entities[o[0]]} ${formatNum(n[1])} ${entities[o[1]]} ${formatNum(n[2])}`;
             }
          } else if (numOps === 3) {
             if (hasBrackets) {
                let r = Math.random();
                if (r < 0.33) {
                   exprRaw = `(${n[0]} ${o[0]} ${n[1]}) ${o[1]} ${n[2]} ${o[2]} ${n[3]}`;
                   exprHTML = `(${formatNum(n[0])} ${entities[o[0]]} ${formatNum(n[1])}) ${entities[o[1]]} ${formatNum(n[2])} ${entities[o[2]]} ${formatNum(n[3])}`;
                } else if (r < 0.66) {
                   exprRaw = `${n[0]} ${o[0]} (${n[1]} ${o[1]} ${n[2]}) ${o[2]} ${n[3]}`;
                   exprHTML = `${formatNum(n[0])} ${entities[o[0]]} (${formatNum(n[1])} ${entities[o[1]]} ${formatNum(n[2])}) ${entities[o[2]]} ${formatNum(n[3])}`;
                } else {
                   exprRaw = `${n[0]} ${o[0]} ${n[1]} ${o[1]} (${n[2]} ${o[2]} ${n[3]})`;
                   exprHTML = `${formatNum(n[0])} ${entities[o[0]]} ${formatNum(n[1])} ${entities[o[1]]} (${formatNum(n[2])} ${entities[o[2]]} ${formatNum(n[3])})`;
                }
             } else {
                exprRaw = `${n[0]} ${o[0]} ${n[1]} ${o[1]} ${n[2]} ${o[2]} ${n[3]}`;
                exprHTML = `${formatNum(n[0])} ${entities[o[0]]} ${formatNum(n[1])} ${entities[o[1]]} ${formatNum(n[2])} ${entities[o[2]]} ${formatNum(n[3])}`;
             }
          }
          
          try {
             let ans = eval(exprRaw);
             if (Number.isInteger(ans) && ans >= 0 && ans <= 1000) {
                 expression = exprHTML + " = ";
                 answer = ans;
                 valid = true;
             }
          } catch(e) {}
       }
    }

    problems.push({ expr: expression, ans: answer, solution: solutionData });
  }
  
  // Render Problems
  problemsContainer.innerHTML = '';
  answersContainer.innerHTML = '';
  
  problems.forEach((prob, idx) => {
    const item = document.createElement('div');
    item.className = 'problem-item';
    
    const no = document.createElement('div');
    no.className = 'problem-no';
    no.textContent = `${idx + 1}.`;
    
    const exprBox = document.createElement('div');
    exprBox.className = 'problem-expression';
    
    const exprText = document.createElement('div');
    exprText.innerHTML = prob.expr;
    
    const calcSpace = document.createElement('div');
    calcSpace.className = 'calc-space';
    
    if (category === 'story') {
        calcSpace.classList.add('lined');
    }

    exprBox.appendChild(exprText);
    exprBox.appendChild(calcSpace);

    item.appendChild(no);
    item.appendChild(exprBox);
    problemsContainer.appendChild(item);

    // Answer Item with solution process
    const ansItem = document.createElement('div');
    ansItem.className = 'answer-item';
    if (prob.solution) {
      const { a, b, op, ans } = prob.solution;
      ansItem.innerHTML = `
        <div class="ans-no-badge">${idx + 1}</div>
        <div class="vert-calc">
          <div class="vc-row">${a}</div>
          <div class="vc-row vc-op-row">${op} ${b}</div>
          <div class="vc-line"></div>
          <div class="vc-row vc-result">${ans}</div>
        </div>`;
    } else {
      ansItem.innerHTML = `
        <div class="ans-no-badge">${idx + 1}</div>
        <div class="ans-simple">답: ${prob.ans}</div>`;
    }
    answersContainer.appendChild(ansItem);
  });
}

// Attach Generate & Export
generateBtn.addEventListener('click', generateMathProblems);

printWorksheetBtn.addEventListener('click', () => {
  document.body.classList.add('print-worksheet-only');
  window.print();
  document.body.classList.remove('print-worksheet-only');
});

printAllBtn.addEventListener('click', () => {
  document.body.classList.remove('print-worksheet-only');
  window.print();
});

saveImgBtn.addEventListener('click', () => {
  captureElement('worksheet', `수학_학습지_${new Date().getTime()}.png`);
});

saveAnsBtn.addEventListener('click', () => {
  captureElement('answerSheet', `answer_sheet.png`);
});

function captureElement(elementId, filename) {
  const el = document.getElementById(elementId);
  const originalStyle = el.style.transform;
  
  // 캡처 시 화면 스크롤 영역에 의해 아래쪽이 잘리는 문제 방지
  const wrapper = document.querySelector('.worksheet-wrapper');
  const orgOverflow = wrapper.style.overflowY;
  wrapper.style.overflowY = 'visible';

  setTimeout(() => {
    html2canvas(el, { 
      scale: 2, 
      useCORS: true, 
      backgroundColor: '#ffffff',
      scrollY: -window.scrollY 
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        el.style.transform = originalStyle;
        wrapper.style.overflowY = orgOverflow; // 원래대로 복구
    });
  }, 150);
}

// Start
initCategoriesList();
generateMathProblems();
