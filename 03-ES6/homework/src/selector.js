var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];
 
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
 
  function recorrerDom(element) {
    if (matchFunc(element)) {
      resultSet.push(element);
    }
 
    for (var i = 0; i < element.children.length; i++) {
      recorrerDom(element.children[i]);
    }
  }
  recorrerDom(startEl);
 
  return resultSet;


  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if(selector.startsWith('#')){
    return 'id'
  }
  if(selector.startsWith('.')){
    return 'class'
  }
  if(selector.includes('.')){
    return 'tag.class'
  } else return 'tag'
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

//todo En el contexto de la programación y el desarrollo web, un "elemento" generalmente se refiere a un nodo en el Document Object Model (DOM), que es una representación en memoria de las páginas web. Cada elemento es un objeto y puede ser cualquier cosa en una página web, como un encabezado, un párrafo, una imagen, un enlace, etc.
//todo Cada elemento tiene propiedades y métodos que puedes utilizar para interactuar con él. Por ejemplo, puedes cambiar el contenido de un elemento, añadir o eliminar clases CSS, escuchar eventos, etc.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function (element){
      return element.id === selector.slice(1);
    }
  } else if (selectorType === "class") {
    matchFunction = function (element){
      return element.classList.contains(selector.slice(1));
    }
  } else if (selectorType === "tag.class") {
    var [tag,className] = selector.split('.');
    matchFunction = function (element){
      return element.tagName.toLowerCase() === tag && element.classList.contains(className);
    }
  } else if (selectorType === "tag") {
    matchFunction = function (element){
      return element.tagName.toLowerCase() === selector;
    }
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  // for (let i = 0; i < elements.length; i++) {
  //   if(selector > elements[i]){
  //     $(elements[i])
  //   }
  // }
  return elements;
};