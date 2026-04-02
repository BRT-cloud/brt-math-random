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

/* =========================================
   STORY PROBLEM GENERATOR (NEW 8 DOMAINS)
========================================= */
function generateStoryProblem(type) {
    if (type === 'story_all') {
        const types = ['story_addsub', 'story_mul', 'story_div', 'story_time', 'story_weight', 'story_len', 'story_mixed', 'story_conv'];
        type = types[rand(0, types.length - 1)];
    }
    
    let name = storyNames[rand(0, storyNames.length - 1)];
    let story = "";
    let answer = "";
    let icon = "";
    
    switch(type) {
        case 'story_addsub': {
            let op = rand(0, 1) === 0 ? 'add' : 'sub';
            let a = rand(15, 200);
            let b = rand(10, 150);
            icon = ["🛒", "🍎", "🧸", "🎈"][rand(0, 3)];
            if (op === 'add') {
                story = `${name}이는 간식을 ${formatNum(a)}개 샀는데, 친구가 ${formatNum(b)}개를 더 주었습니다. 간식은 모두 몇 개일까요?`;
                answer = `${formatNum(a+b)}개`;
            } else {
                if (a < b) { let t = a; a = b; b = t; }
                story = `문방구에 귀여운 스티커가 ${formatNum(a)}장 있었습니다. 어제 손님들이 와서 ${formatNum(b)}장을 사갔습니다. 문방구에 남은 스티커는 몇 장일까요?`;
                answer = `${formatNum(a-b)}장`;
            }
            break;
        }
        case 'story_mul': {
            let m_items = [ ["꽃", "송이"], ["사탕", "개"], ["구슬", "개"], ["연필", "자루"] ];
            let item = m_items[rand(0, m_items.length - 1)];
            let a = rand(10, 80);
            let b = rand(4, 15);
            icon = ["🎁", "🛍️", "🌼"][rand(0, 2)];
            story = `${item[0]}을 한 묶음에 ${formatNum(a)}${item[1]}씩 묶어서 아름다운 선물 상자 ${formatNum(b)}개를 만들었습니다. 사용된 ${item[0]}은 모두 몇 ${item[1]}일까요?`;
            answer = `${formatNum(a*b)}${item[1]}`;
            break;
        }
        case 'story_div': {
            let total = rand(20, 100);
            let p = rand(3, 9);
            total = Math.floor(total / p) * p; 
            if (total === 0) total = p * rand(3, 10);
            icon = ["🍕", "🍬", "👦"][rand(0, 2)];
            let kind = rand(0, 1) === 0 ? "등분제" : "포함제";
            if (kind === "등분제") {
                story = `${name}이는 생일파티에 쓸 사탕 ${formatNum(total)}개를 준비해서 초대받은 친구 ${formatNum(p)}명에게 똑같이 나누어 주려고 합니다. 한 명당 몇 개씩 받을 수 있을까요?`;
                answer = `${formatNum(total/p)}개`;
            } else {
                let p2 = rand(3, 8);
                total = p2 * rand(5, 15);
                story = `빵집에 갓 구운 빵이 ${formatNum(total)}개 있습니다. 이 빵을 봉투 하나당 ${formatNum(p2)}개씩 똑같이 나누어 담는다면 모두 몇 개의 봉투가 필요할까요?`;
                answer = `${formatNum(total/p2)}개`;
            }
            break;
        }
        case 'story_time': {
            icon = ["🕰️", "⏱️", "⏰"][rand(0, 2)];
            if (rand(0, 1) === 0) {
                let h1 = rand(1, 4), m1 = rand(5, 50);
                let dur = rand(45, 150); // duration in minutes
                let t1_mins = h1 * 60 + m1;
                let t2_mins = t1_mins + dur;
                
                let sStr = `오후 ${h1}시 ${m1}분`;
                let eH = Math.floor(t2_mins / 60);
                let eM = t2_mins % 60;
                let eStr = `오후 ${eH}시 ${eM}분`;
                
                if (rand(0, 1) === 0) {
                    story = `${name}이는 ${sStr}에 재미있는 만화 영화를 보기 시작해서 ${eStr}에 티비를 껐습니다. 만화를 본 시간은 총 얼마만큼 인가요?`;
                    let dh = Math.floor(dur / 60);
                    let dm = dur % 60;
                    answer = dh > 0 ? `${dh}시간 ${dm}분` : `${dm}분`;
                } else {
                    let dh = Math.floor(dur / 60);
                    let dm = dur % 60;
                    let durStr = dh > 0 ? `${dh}시간 ${dm}분` : `${dm}분`;
                    story = `${name}이가 ${durStr} 동안 운동을 열심히 하고 시계를 보니 ${eStr}이었습니다. 운동을 시작했던 시각은 몇 시 몇 분일까요?`;
                    answer = `${sStr}`;
                }
            } else {
                let m1 = rand(65, 200);
                story = `${name}이는 할머니 댁에 가기 위해 버스를 탔습니다. 버스를 타고 가는 데 총 ${m1}분이 걸렸습니다. 이 시간은 몇 시간 몇 분일까요?`;
                let dh = Math.floor(m1 / 60);
                let dm = m1 % 60;
                answer = dh > 0 ? `${dh}시간 ${dm}분` : `${dm}분`;
            }
            break;
        }
        case 'story_weight': {
            icon = ["⚖️", "🥩", "📦"][rand(0, 2)];
            let w1 = rand(150, 950);
            let w2 = rand(1500, 3500); // grams
            if (rand(0, 1) === 0) {
                let ansG = w1 + w2;
                let h = Math.floor(ansG / 1000);
                let g = ansG % 1000;
                story = `가게에서 예쁜 빈 바구니의 무게를 재어 보니 ${w1}g 이었습니다. 바구니 안에 맛있는 과일을 ${w2}g 담았습니다. 바구니와 과일 전체의 무게는 몇 kg 몇 g 일까요?`;
                answer = h > 0 ? `${h}kg ${g}g` : `${g}g`;
            } else {
                let bagW = rand(2500, 4500);
                let bookW = rand(800, 1900);
                let rG = bagW - bookW;
                let h = Math.floor(rG / 1000);
                let g = rG % 1000;
                
                let bagStr = Math.floor(bagW/1000) > 0 ? `${Math.floor(bagW/1000)}kg ${bagW%1000}g` : `${bagW}g`;
                let bookStr = Math.floor(bookW/1000) > 0 ? `${Math.floor(bookW/1000)}kg ${bookW%1000}g` : `${bookW}g`;
                
                story = `${name}이가 메고 다니는 가방의 전체 무게는 ${bagStr} 입니다. 집에 도착해서 가방에서 교과서 ${bookStr} 분량을 꺼냈을 때, 가방의 남은 무게는 몇 kg 몇 g이 될까요?`;
                answer = h > 0 ? `${h}kg ${g}g` : `${g}g`;
            }
            break;
        }
        case 'story_len': {
            icon = ["📏", "🚌", "🛣️"][rand(0, 2)];
            if (rand(0, 1) === 0) {
                let len1 = rand(120, 350);
                let len2 = rand(90, 250);
                let ans = len1 + len2;
                let h = Math.floor(ans / 100);
                let c = ans % 100;
                
                let l1_str = Math.floor(len1/100) > 0 ? `${Math.floor(len1/100)}m ${len1%100}cm` : `${len1}cm`;
                let l2_str = Math.floor(len2/100) > 0 ? `${Math.floor(len2/100)}m ${len2%100}cm` : `${len2}cm`;
                
                story = `미술 시간에 색테이프 2개를 길게 이어 붙이려고 합니다. 길이가 ${l1_str} 인 테이프와 길이가 ${l2_str} 인 테이프를 서로 겹치지 않게 이어 붙였습니다. 이어진 테이프의 총 길이는 몇 m 몇 cm일까요?`;
                answer = `${h}m ${c}cm`;
            } else {
                let km = rand(2, 6);
                let m = rand(100, 800);
                let totalM = km * 1000 + m; 
                let walked = rand(600, 2000);
                let left = totalM - walked;
                
                let left_km = Math.floor(left / 1000);
                let left_m = left % 1000;
                let ansStr = left_km > 0 ? `${left_km}km ${left_m}m` : `${left_m}m`;
                
                story = `${name}이네 집에서 할머니 댁까지의 거리는 무려 ${km}km ${m}m 입니다. ${name}이가 자전거를 타고 ${walked}m를 달려갔다면, 할머니댁까지 남은 거리는 얼마나 될까요?`;
                answer = ansStr;
            }
            break;
        }
        case 'story_mixed': {
            icon = ["🧺", "🍔", "🧩"][rand(0, 2)];
            let init = rand(10, 30);
            let plus = rand(20, 50);
            let div = rand(3, 6);
            
            let tempTarget = Math.floor((init + plus) / div);
            let newPlus = (tempTarget * div) - init;
            if (newPlus <= 0) newPlus += div * 3;
            let ans = (init + newPlus) / div;
            
            story = `${name}이는 처음에 구슬을 ${init}개 가지고 있었는데, 아빠가 ${newPlus}개를 더 사주셨습니다. 이 구슬을 친한 친구 ${div}명에게 공평하게 나누어 준다면 한 명당 공평하게 몇 개씩 나누어 가질 수 있을까요?`;
            answer = `${ans}개`;
            break;
        }
        case 'story_conv': {
            icon = ["🔄", "🚀", "💡"][rand(0, 2)];
            let typ = rand(0, 2);
            if (typ === 0) { 
                let m = rand(80, 220);
                let h = Math.floor(m / 60);
                let rem = m % 60;
                story = `아빠가 운전하는 자동차가 고속도로를 달리는 데 총 ${m}분이 걸린다고 합니다. 이 긴 시간은 몇 시간 몇 분으로 바꿀 수 있을까요?`;
                answer = `${h}시간 ${rem}분`;
            } else if (typ === 1) { 
                let g = rand(1200, 4800);
                let kg = Math.floor(g / 1000);
                let rem = g % 1000;
                story = `시장 아저씨가 커다란 수박 한 통의 무게를 재어보니 ${g}g 이었습니다. 이 수박의 무게를 'kg'과 'g' 단위를 모두 사용해서 표현해 보세요.`;
                answer = `${kg}kg ${rem}g`;
            } else { 
                let cm = rand(150, 680);
                let m = Math.floor(cm / 100);
                let rem = cm % 100;
                story = `목수 아저씨가 가져오신 긴 원목의 길이는 무려 ${cm}cm 입니다. 이 길이를 'm'와 'cm' 단위를 모두 함께 사용해서 나타내면 어떻게 될까요?`;
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
