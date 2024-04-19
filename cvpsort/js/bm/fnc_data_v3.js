// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'img/';
// 0:順番に　1:昔の
var bln_ResultMode = 1;
// 0:テキスト　1:イラスト　2:テキスト＋イラスト
var int_ResultImg = 2;
// イラスト表示時、何位までをイラスト表示にするか。
var int_ResultRank = 3;

// ソート用のテーブルを
// 0:残す　1:消す
var bln_ResultStyle = 0;

// ソート進捗バーの表示
// 0:表示　1:消す
var bln_ProgessBar = 1;

// Maximum number of result rows before being broken off into another table.
var maxRows = 20;

// * タイトル情報（編集可能。最後の行に”,”を付けないようにしてください）
var int_Colspan = 4;
var ary_TitleData = [
 "Caravan Palace (2008)",
 "Panic (2012)",
 "<|°_°|> (2015)",
 "Chronologic (2019)",
 "Gangbusters Melody Club (2024)"
];

// * キャラクター情報（編集可能。最後の行に”,”を付けないようにしてください）
// * 使用フラグ（0にするとソートに入りません）, 
//   "タイトルID"（先頭から0, 1, 2...）, 
//   {タイトル別参加フラグ}（1を入れると対象タイトルに入ります）,
//   "キャラクター名", "画像（空白の場合、キャラクター名が使用されます）"
//                                      [1,2,3,4,5,6,7,8,9,
var ary_CharacterData = [
  [1, "Dragons",                                                    [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "Star Scat",                                                  [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "Ended with the night",                                       [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "Jolie Coquine",                                              [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "Oooh",                                                       [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "Suzy",                                                       [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "Je m'amuse",                                                 [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "Violente Valse",                                             [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "Brotherswing",                                               [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "L'envol",                                                    [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "Sofa",                                                       [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "Bambous",                                                    [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "Lazy Place",                                                 [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "We Can Dance",                                               [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],
  [1, "La Caravane",                                                [1,0,0,0,0,0,0,0], "cvp/a1.jpeg"],

  [1, "Queens",                                                     [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Maniac",                                                     [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "The dirty side of the road",                                 [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "12 juin 3049",                                               [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Rock it for me",                                             [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Clash",                                                      [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Newbop",                                                     [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Glory of Nelly",                                             [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Dramophone",                                                 [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Cotton Heads",                                               [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Panic",                                                      [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Pirates",                                                    [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Beatophone",                                                 [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Sydney",                                                     [0,1,0,0,0,0,0,0], "cvp/a2.jpg"],
  [1, "Lone Digger",                                                [0,0,1,0,0,0,0,0], "cvp/a3.png"],

  [1, "Comics",                                                     [0,0,1,0,0,0,0,0], "cvp/a3.png"],
  [1, "Mighty (feat. JFTH)",                                        [0,0,1,0,0,0,0,0], "cvp/a3.png"],
  [1, "Aftermath",                                                  [0,0,1,0,0,0,0,0], "cvp/a3.png"],
  [1, "Wonderland",                                                 [0,0,1,0,0,0,0,0], "cvp/a3.png"],
  [1, "Tattoos",                                                    [0,0,1,0,0,0,0,0], "cvp/a3.png"],
  [1, "Midnight",                                                   [0,0,1,0,0,0,0,0], "cvp/a3.png"],
  [1, "Russian",                                                    [0,0,1,0,0,0,0,0], "cvp/a3.png"],
  [1, "Wonda",                                                      [0,0,1,0,0,0,0,0], "cvp/a3.png"],
  [1, "Human Leather Shoes for Crocodile Dandies",                  [0,0,1,0,0,0,0,0], "cvp/a3.png"],
  [1, "Lay Down",                                                   [0,0,1,0,0,0,0,0], "cvp/a3.png"],
  
  [1, "Miracle",                                                    [0,0,0,1,0,0,0,0], "cvp/a4.png"],
  [1, "About You",                                                  [0,0,0,1,0,0,0,0], "cvp/a4.png"],
  [1, "Moonshine",                                                  [0,0,0,1,0,0,0,0], "cvp/a4.png"],
  [1, "Melancolia",                                                 [0,0,0,1,0,0,0,0], "cvp/a4.png"],
  [1, "Plume",                                                      [0,0,0,1,0,0,0,0], "cvp/a4.png"],
  [1, "Fargo",                                                      [0,0,0,1,0,0,0,0], "cvp/a4.png"],
  [1, "Waterguns",                                                  [0,0,0,1,0,0,0,0], "cvp/a4.png"],
  [1, "Leena",                                                      [0,0,0,1,0,0,0,0], "cvp/a4.png"],
  [1, "Supersonics",                                                [0,0,0,1,0,0,0,0], "cvp/a4.png"],
  [1, "Ghosts",                                                     [0,0,0,1,0,0,0,0], "cvp/a4.png"],
  [1, "April",                                                      [0,0,0,1,0,0,0,0], "cvp/a4.png"],
  
  
     
  [1, "MAD",                                                        [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],
  [1, "Mirrors",                                                    [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],  
  [1, "81 Special",                                                 [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],  
  [1, "Raccoons",                                                   [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],  
  [1, "Avalanches",                                                 [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],  
  [1, "Reverse",                                                    [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],  
  [1, "Fool",                                                       [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],  
  [1, "Spirits",                                                    [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],  
  [1, "Blonde Dynamite",                                            [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],  
  [1, "Portobello",                                                 [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],  
  [1, "City Cook",                                                  [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],  
  [1, "Villa Rose",                                                 [0,0,0,0,1,0,0,0], "cvp/a5.jpg"],  
];
