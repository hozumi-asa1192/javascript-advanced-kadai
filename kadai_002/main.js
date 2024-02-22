// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typing = document.getElementById('typing');


// 複数のテキストを格納する配列
const textLists = [
    'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
];

// ランダムなテキストを表示
const createText = () => {

    typed = '';
    typedfield.textContent = typed;

    let random = (Math.floor(Math.random() * textLists.length));
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

// キー入力判定
const KeyPress = e => {
    
    if (e.key !== untyped.substring(0,1)) {
        wrap.classList.add('mistyped');

        // 100ms後に元に戻す
        setTimeout(() => {         
        wrap.classList.remove('mistyped');
        },100);
        return;
    }

    // 正タイプの場合
    // スコアのインクリメント
    score = score + 1;

    //  正タイピングするたびにカウントされていく

    const tyScore = () => {    
        typing.textContent = score;
    }
    tyScore();    
    
     wrap.classList.remove('mistyped');

     typed = typed + untyped.substring(0,1);
     untyped = untyped.substring(1);
     typedfield.textContent = typed;
     untypedfield.textContent = untyped;

    //  テキストがなくなったら新しいテキストを表示
    if(untyped === ''){
        createText();
    }
};

// タイピングスキルのランク判定
const rankCheck = score => {

    // テキストを格納する変数を作る
    let text = '';

    // スコアに大路てことなるメッセージを変数textに格納する
    if(score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です`;
    }else if(score < 200){
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です`;
    }else if(score < 300){
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です`;
    }else if(score >= 300){
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    // 生成したメッセージと一緒に文字列を返す
    return `${score}\n${text}\n【OK】リトライ/【キャンセル】終了`;
};


const timer = () => {

    // タイマー部分のHTML要素(p）を取得する
    let time = count.textContent;

    // setInterval(関数，ミリ秒)；でカウントダウン出来る
   const id = setInterval(() => {

    // カウントダウンする
    time = time - 1;
    count.textContent = time;

    // カウントが０になったらタイマーを停止する
    if(time <= 0) {
        clearInterval(id); 
        count.textContent = '0';

        setTimeout(() => {
         wrap.textContent = ('タイムアップ！');
            },100)

        setTimeout(() => {
        const result = confirm(rankCheck(score)); 
               
    //  okボタンをクリックされたらリロードする
        if(result == true){
        window.location.reload();
            } },200);};
                  },1000);};

untypedfield.textContent = 'スタートボタンで開始';

// ゲームスタートの時の処理
start.addEventListener('click',() => {

    // カウントダウンタイマーを開始する
    timer();

    createText();

    // スタートボタンを非表示にする
    start.style.display = 'none';

    // キーボードのイベント処理（キーを押せば、KeyPressの関数のイベントが起こる）
    document.addEventListener('keypress',KeyPress)
});

