//TODO: 03
/*
DOM <- como recorrerlo
document.body 
document.body.children 
[ e1, e2, e3 ]
recorren  e1.children.length [ ]
*/
/*
<body>[<h1>,<h2 id='pagetitle'>]</body>     

$$$$$("#pagetitle")
-> traverseDomAndCollectElements((element) => `#${element.id}` === selector, undefined)

resultSet = []
startEl = document.body;
if((startEl) => `#${startEl.id}` === selector)) 
const child of startEl.children
 resultSet.push <-- traverseDomAndCollectElements((element) =>, <h1>)     traverseDomAndCollectElements(match,<h2 id='pagetitle'>)
                                  []                                              [<h2 id='pagetitle'>]             
*/
var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
  if (matchFunc(startEl)) resultSet.push(startEl);
  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien
  for (const child of startEl.children) {
    resultSet.push(...traverseDomAndCollectElements(matchFunc, child));
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

//TODO: 01
var selectorTypeMatcher = function (selector) {
  // $("#pagetitle")  $(".pagetitle")  $("img.deleted")  $("div")
  // tu código aquí
  if (selector[0] === "#") return "id";
  if (selector[0] === ".") return "class";
  for (let i = 1; i < selector.length; i++) {
    if (selector[i] === ".") return "tag.class"; // Rex.Exp || includes
  }
  return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

//TODO: 02
//* CLOSURE <- esto es una Function que va a retornar NO un valor sino otra function
var matchFunctionMaker = function (selector) {
  // $(".pagetitle")
  var selectorType = selectorTypeMatcher(selector); // --> "id"
  var matchFunction;
  if (selectorType === "id") {
    // "#" + "pagetitle"  === "#pagetitle"
    matchFunction = (element) => `#${element.id}` === selector; // retorna un true || false
  } else if (selectorType === "class") {
    matchFunction = (element) => {
      // []    ".pagetitle"
      for (let i = 0; i < element.classList.length; i++) {
        if (`.${element.classList[i]}` === selector) return true;
      }
      return false;
    };
  } else if (selectorType === "tag.class") {
    matchFunction = (element) => {
      let [tag, clase] = selector.split("."); // -> ["tag", "class"]
      let funcClass = matchFunctionMaker(`.${clase}`);
      let funcTag = matchFunctionMaker(tag); // -> (element) => element.tagName === selector.toUpperCase()
      return funcClass(element) && funcTag(element);
    };
  } else if (selectorType === "tag") {
    // element.tagName --> DIV
    matchFunction = (element) => element.tagName === selector.toUpperCase();
  }
  return matchFunction; // (element) => element.tagName === selector.toUpperCase() && matchFunction = (element) => {
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  // traverseDomAndCollectElements((element) => `#${element.id}` === selector)
  return elements;
};

//$(".small") // [<>,<>]

/*
document.getElementById()
 id 
 class 
 tag 
 tag class 
*/

/*
$MYSELECTOR("#pagetitle")
result = [<h2 class='lead big' id='pagetitle'>]

document.body     <body>...</body>      document.body.id ===  small
                                         "#" + element
                                             #small   === #small
document.body.children -> [<h1>,<h2 class='lead big' id='pagetitle'>, etc..]

[<h1>,<h2 class='lead big' id='pagetitle'>, etc..].map((element)=> element.id === pagetitle )
                                                                  pagetitle
         <h1> 1° Verifica MATCH   
         <h1>.children -> [].map()    


 <div class='photos'>.id === pagetitle

<div class='photos'>.children.map()


<h2 class='lead big' id='pagetitle'>My Photos</h2>.children -> []

<body>
  <h1>Selectores Tests</h1>
  <h2 class='lead big' id='pagetitle'>My Photos</h2>
  <div class='photos'>
    <img src='https://via.placeholder.com/150x50/FFFF00/000000?text=SoyHenry' class='photo'>
    <img src='https://via.placeholder.com/150x50/000000/FFFFFF?text=ES6' class='photo'>
  </div>
  <h2 class='small lead'>Deleted Photos</h2>
  <div class='photos'>
    <img src='https://via.placeholder.com/150x50' class='deleted'>
    <img src='https://via.placeholder.com/150x50' class='deleted'>
  </div>
  <h2 class='small lead'>Other Photos</h2>
  <div class='photos'>
    <img src='https://via.placeholder.com/125x50' class='photo'>
  </div>
  <p class='small'>Copyright Notice for no one in particular.</p>
  <p class='small'>Soy Henry</p>
</body>
*/
