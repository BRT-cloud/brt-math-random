const fs = require('fs');
const path = 'c:\\Users\\user\\Desktop\\웹앱\\math-worksheet-generator\\app.js';
let content = fs.readFileSync(path, 'utf8');

const newFunction = `function generateStoryProblem(type) {
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
            let scenario = rand(0, 2);
            if (op === 'add') {
                if (scenario === 0) {
                    icon = "🍎";
                    story = \`\${getJosa(name, '는')} 사과를 \${formatNum(a)}개 땄는데, 삼촌이 \${formatNum(b)}개를 더 주셨습니다. 사과는 모두 몇 개일까요?\`;
                    answer = \`\${formatNum(a+b)}개\`;
                } else if (scenario === 1) {
                    icon = "💰";
                    story = \`\${getJosa(name, '네')} 저금통에 동전이 \${formatNum(a)}개 있었습니다. 심부름을 하고 \${formatNum(b)}개를 더 넣었습니다. 동전은 모두 몇 개일까요?\`;
                    answer = \`\${formatNum(a+b)}개\`;
                } else {
                    icon = "🎈";
                    story = \`파티에 쓸 풍선이 \${formatNum(a)}개 있습니다. 친구가 \${formatNum(b)}개를 더 가져왔습니다. 풍선은 모두 몇 개일까요?\`;
                    answer = \`\${formatNum(a+b)}개\`;
                }
            } else {
                if (a < b) { let t = a; a = b; b = t; }
                if (scenario === 0) {
                    icon = "🧸";
                    story = \`가게에 스티커가 \${formatNum(a)}장 있었습니다. 어제 손님들이 와서 \${formatNum(b)}장을 사갔습니다. 남은 스티커는 몇 장일까요?\`;
                    answer = \`\${formatNum(a-b)}장\`;
                } else if (scenario === 1) {
                    icon = "🎨";
                    story = \`\${getJosa(name, '는')} 색종이를 \${formatNum(a)}장 가지고 있었는데, 미술 시간에 \${formatNum(b)}장을 사용했습니다. 남은 색종이는 몇 장일까요?\`;
                    answer = \`\${formatNum(a-b)}장\`;
                } else {
                    icon = "📖";
                    story = \`\${getJosa(name, '가')} 읽을 위인전은 모두 \${formatNum(a)}쪽입니다. 어제까지 \${formatNum(b)}쪽을 읽었다면 앞으로 몇 쪽을 더 읽어야 할까요?\`;
                    answer = \`\${formatNum(a-b)}쪽\`;
                }
            }
            break;
        }
        case 'story_mul': {
            let m_items = [ ["꽃", "송이"], ["사탕", "개"], ["구슬", "개"], ["연필", "자루"], ["쿠키", "개"] ];
            let item = m_items[rand(0, m_items.length - 1)];
            let a = rand(10, 80);
            let b = rand(4, 15);
            let scenario = rand(0, 1);
            icon = ["🎁", "🛍️", "🌼", "🍪"][rand(0, 3)];
            if (scenario === 0) {
                story = \`\${item[0]}을 한 묶음에 \${formatNum(a)}\${item[1]}씩 묶어서 아름다운 상자 \${formatNum(b)}개를 만들었습니다. 사용된 \${item[0]}은 모두 몇 \${item[1]}일까요?\`;
            } else {
                story = \`가게 진열대에 \${item[0]}이 한 줄에 \${formatNum(a)}\${item[1]}씩 \${formatNum(b)}줄로 놓여 있습니다. 진열된 \${item[0]}은 모두 몇 \${item[1]}일까요?\`;
            }
            answer = \`\${formatNum(a*b)}\${item[1]}\`;
            break;
        }
        case 'story_div': {
            let total = rand(20, 100);
            let p = rand(3, 9);
            total = Math.floor(total / p) * p; 
            if (total === 0) total = p * rand(3, 10);
            let kind = rand(0, 1) === 0 ? "등분제" : "포함제";
            let scenario = rand(0, 1);
            if (kind === "등분제") {
                if (scenario === 0) {
                    icon = "🍬";
                    story = \`\${getJosa(name, '는')} 생일파티에 쓸 사탕 \${formatNum(total)}개를 준비해서 친구 \${formatNum(p)}명에게 똑같이 나누어 주려고 합니다. 한 명당 몇 개씩 받을까요?\`;
                } else {
                    icon = "🧩";
                    story = \`선생님께서 장난감 블록 \${formatNum(total)}개를 모둠 \${formatNum(p)}개에 똑같이 나누어 주시려고 합니다. 한 모둠당 블록을 몇 개씩 가질까요?\`;
                }
                answer = \`\${formatNum(total/p)}개\`;
            } else {
                let p2 = rand(3, 8);
                total = p2 * rand(5, 15);
                if (scenario === 0) {
                    icon = "🥐";
                    story = \`빵집에 갓 구운 빵이 \${formatNum(total)}개 있습니다. 이 빵을 봉투 하나당 \${formatNum(p2)}개씩 똑같이 담는다면 모두 몇 개의 봉투가 필요할까요?\`;
                } else {
                    icon = "⚽";
                    story = \`체육 창고에 축구공이 \${formatNum(total)}개 있습니다. 한 바구니에 축구공을 \${formatNum(p2)}개씩 담으려면 바구니는 모두 몇 개가 필요할까요?\`;
                }
                answer = \`\${formatNum(total/p2)}개\`;
            }
            break;
        }
        case 'story_time': {
            icon = ["🕰️", "⏱️", "⏰"][rand(0, 2)];
            let scenario = rand(0, 2);
            if (rand(0, 1) === 0) {
                let h1 = rand(1, 4), m1 = rand(5, 50);
                let dur = rand(45, 150);
                let t1_mins = h1 * 60 + m1;
                let t2_mins = t1_mins + dur;
                
                let sStr = \`오후 \${h1}시 \${m1}분\`;
                let eH = Math.floor(t2_mins / 60);
                let eM = t2_mins % 60;
                let eStr = \`오후 \${eH}시 \${eM}분\`;
                
                let dh = Math.floor(dur / 60);
                let dm = dur % 60;
                let durStr = dh > 0 ? \`\${dh}시간 \${dm}분\` : \`\${dm}분\`;
                
                if (scenario === 0) {
                    story = \`\${getJosa(name, '는')} \${sStr}에 재미있는 만화 영화를 보기 시작해서 \${eStr}에 끝났습니다. 만화를 본 시간은 총 얼마만큼 인가요?\`;
                    answer = durStr;
                } else if (scenario === 1) {
                    story = \`\${getJosa(name, '가')} \${durStr} 동안 운동을 열심히 하고 시계를 보니 \${eStr}이었습니다. 운동을 시작했던 시각은 몇 시 몇 분일까요?\`;
                    answer = \`\${sStr}\`;
                } else {
                    story = \`\${getJosa(name, '는')} \${sStr}부터 피아노 학원에 가서 \${durStr} 동안 연습을 했습니다. 연습이 끝난 시각은 몇 시 몇 분일까요?\`;
                    answer = \`\${eStr}\`;
                }
            } else {
                let m1 = rand(65, 200);
                let dh = Math.floor(m1 / 60);
                let dm = m1 % 60;
                let ansStr = dh > 0 ? \`\${dh}시간 \${dm}분\` : \`\${dm}분\`;
                
                if (scenario === 0) {
                    story = \`\${getJosa(name, '는')} 할머니 댁에 가기 위해 버스를 탔습니다. 버스를 타고 가는 데 총 \${m1}분이 걸렸습니다. 이 시간은 몇 시간 몇 분일까요?\`;
                } else {
                    story = \`주말 농장 체험을 한 시간이 총 \${m1}분입니다. 이를 몇 시간 몇 분으로 나타낼 수 있을까요?\`;
                }
                answer = ansStr;
            }
            break;
        }
        case 'story_weight': {
            icon = ["⚖️", "🥩", "📦", "🐕"][rand(0, 3)];
            let w1 = rand(150, 950);
            let w2 = rand(1500, 3500);
            let scenario = rand(0, 1);
            if (rand(0, 1) === 0) {
                let ansG = w1 + w2;
                let h = Math.floor(ansG / 1000);
                let g = ansG % 1000;
                
                if (scenario === 0) {
                    story = \`가게에서 산 텅 빈 바구니의 무게가 \${w1}g 이었습니다. 바구니 안에 과일을 \${w2}g 담았습니다. 바구니와 과일 전체의 무게는 몇 kg 몇 g 일까요?\`;
                } else {
                    story = \`새로 태어난 강아지 첫째의 무게가 \${w2}g이고, 둘째가 \${w1}g입니다. 두 마리의 몸무게를 합치면 몇 kg 몇 g일까요?\`;
                }
                answer = h > 0 ? \`\${h}kg \${g}g\` : \`\${g}g\`;
            } else {
                let bagW = rand(2500, 4500);
                let bookW = rand(800, 1900);
                let rG = bagW - bookW;
                let h = Math.floor(rG / 1000);
                let g = rG % 1000;
                
                let bagStr = Math.floor(bagW/1000) > 0 ? \`\${Math.floor(bagW/1000)}kg \${bagW%1000}g\` : \`\${bagW}g\`;
                let bookStr = Math.floor(bookW/1000) > 0 ? \`\${Math.floor(bookW/1000)}kg \${bookW%1000}g\` : \`\${bookW}g\`;
                
                if (scenario === 0) {
                    story = \`\${getJosa(name, '가')} 메고 다니는 가방의 전체 무게는 \${bagStr} 입니다. 가방에서 책 \${bookStr} 분량을 꺼냈다면 남은 무게는 몇 kg 몇 g이 될까요?\`;
                } else {
                    story = \`과일 상자의 전체 무게를 재보니 \${bagStr} 이었습니다. 과일을 \${bookStr} 만큼 꺼내 먹었다면, 남은 상자와 과일의 무게는 몇 kg 몇 g일까요?\`;
                }
                answer = h > 0 ? \`\${h}kg \${g}g\` : \`\${g}g\`;
            }
            break;
        }
        case 'story_len': {
            icon = ["📏", "🚌", "🛣️", "🧵"][rand(0, 3)];
            let scenario = rand(0, 1);
            if (rand(0, 1) === 0) {
                let len1 = rand(120, 350);
                let len2 = rand(90, 250);
                let ans = len1 + len2;
                let h = Math.floor(ans / 100);
                let c = ans % 100;
                
                let l1_str = Math.floor(len1/100) > 0 ? \`\${Math.floor(len1/100)}m \${len1%100}cm\` : \`\${len1}cm\`;
                let l2_str = Math.floor(len2/100) > 0 ? \`\${Math.floor(len2/100)}m \${len2%100}cm\` : \`\${len2}cm\`;
                
                if (scenario === 0) {
                    story = \`미술 시간에 길이가 \${l1_str} 인 테이프와 \${l2_str} 인 테이프를 겹치지 않게 이어 붙였습니다. 이어진 테이프의 총 길이는 몇 m 몇 cm일까요?\`;
                } else {
                    story = \`길이가 \${l1_str} 인 끈과 \${l2_str} 인 끈을 서로 길게 연결했습니다. 이어진 끈의 전체 길이는 몇 m 몇 cm인가요?\`;
                }
                answer = \`\${h}m \${c}cm\`;
            } else {
                let km = rand(2, 6);
                let m = rand(100, 800);
                let totalM = km * 1000 + m; 
                let walked = rand(600, 2000);
                let left = totalM - walked;
                
                let left_km = Math.floor(left / 1000);
                let left_m = left % 1000;
                let ansStr = left_km > 0 ? \`\${left_km}km \${left_m}m\` : \`\${left_m}m\`;
                
                if (scenario === 0) {
                    story = \`\${getJosa(name, '네')} 집에서 할머니 댁까지 거리는 \${km}km \${m}m 입니다. 자전거를 타고 \${walked}m를 갔다면 남은 거리는 얼마일까요?\`;
                } else {
                    story = \`공원 산책 코스의 전체 거리는 \${km}km \${m}m 입니다. 강아지와 함께 \${walked}m를 걸었다면, 남은 거리는 몇 km 몇 m 인가요?\`;
                }
                answer = ansStr;
            }
            break;
        }
        case 'story_mixed': {
            icon = ["🧺", "🍔", "🧩", "🍓"][rand(0, 3)];
            let init = rand(10, 30);
            let plus = rand(20, 50);
            let div = rand(3, 6);
            let scenario = rand(0, 1);
            
            let tempTarget = Math.floor((init + plus) / div);
            let newPlus = (tempTarget * div) - init;
            if (newPlus <= 0) newPlus += div * 3;
            let ans = (init + newPlus) / div;
            
            if (scenario === 0) {
                story = \`\${getJosa(name, '는')} 처음에 구슬을 \${init}개 샀는데 아빠가 \${newPlus}개를 더 사주셨습니다. 이를 친구 \${div}명과 똑같이 나누면 한 명당 몇 개씩 가질까요?\`;
            } else {
                story = \`바구니에 딸기가 \${init}개 있었습니다. 농장에서 \${newPlus}개를 더 땄습니다. 접시 \${div}개에 똑같이 나누어 담으려면 한 접시에 몇 개씩 담게 될까요?\`;
            }
            answer = \`\${ans}개\`;
            break;
        }
        case 'story_conv': {
            icon = ["🔄", "🚀", "💡", "⏱️"][rand(0, 3)];
            let typ = rand(0, 2);
            let scenario = rand(0, 1);
            if (typ === 0) { 
                let m = rand(80, 220);
                let h = Math.floor(m / 60);
                let rem = m % 60;
                if (scenario === 0) {
                    story = \`자동차가 고속도로를 달리는 데 총 \${m}분이 걸렸습니다. 이 시간은 몇 시간 몇 분일까요?\`;
                } else {
                    story = \`가족이 산에 올라갔다가 내려오는 데 총 \${m}분이 걸렸습니다. 등산에 걸린 시간을 시간과 분으로 나타내어 보세요.\`;
                }
                answer = \`\${h}시간 \${rem}분\`;
            } else if (typ === 1) { 
                let g = rand(1200, 4800);
                let kg = Math.floor(g / 1000);
                let rem = g % 1000;
                if (scenario === 0) {
                    story = \`수박 한 통의 무게를 재어보니 \${g}g 이었습니다. 이 수박의 무게를 'kg'과 'g' 단위를 사용해서 표현해 보세요.\`;
                } else {
                    story = \`강아지의 몸무게를 달아보니 \${g}g 이었습니다. 강아지의 몸무게를 몇 kg 몇 g으로 나타낼 수 있을까요?\`;
                }
                answer = \`\${kg}kg \${rem}g\`;
            } else { 
                let cm = rand(150, 680);
                let m = Math.floor(cm / 100);
                let rem = cm % 100;
                if (scenario === 0) {
                    story = \`목수님이 가져오신 원목의 길이는 \${cm}cm 입니다. 이 길이를 'm'와 'cm' 단위를 함께 사용해서 나타내면 어떻게 될까요?\`;
                } else {
                    story = \`축제 장식에 쓸 천의 길이를 재어 보았더니 \${cm}cm 였습니다. 이 길이는 몇 m 몇 cm인지 변환해 보세요.\`;
                }
                answer = \`\${m}m \${rem}cm\`;
            }
            break;
        }
    }
    
    let exprHTML = \`<div class="story-wrapper"><div class="story-icon">\${icon}</div><div class="story-text">\${story}</div></div>\`;
    return { expr: exprHTML, ans: answer };
}`;

content = content.replace(/function generateStoryProblem\(type\) \{[\s\S]*?return \{ expr: exprHTML, ans: answer \};\n\}/, newFunction);

fs.writeFileSync(path, content, 'utf8');
