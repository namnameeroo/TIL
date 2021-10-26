// 연습 1
const nam = kim(5);   // nam = (b) => (c) => {return 5+b-c}
  const han = nam(2); // han = (c) => {return 5+2-c}
  const su = han(3);  // su  = return 5+2-3
  console.log(su);    // 따라서 = 4

// 연습 2
const func = (msg) => () => {
      console.log(msg);
    };
const innerFunc1 = func("hello");
innerFunc1();

// 연습 3
const minsu = (j) => love(j)

function love(i) {
    let sentence = "love " + i 
    return sentence
}
minsu(hansu);
