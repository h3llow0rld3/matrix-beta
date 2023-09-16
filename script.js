import { MatrixInput } from "./matrix/matrixInput.js";
import { InitButtons } from "./operations/initButtons.js";

// let matrixInput = new MatrixInput();
// document.getElementById("main").append(matrixInput.matrixContainer);

InitButtons.init();

import { Mult } from "./operations/binaryOperation/main/mult.js";
import { UnaryOperation } from "./operations/unaryOperation/unaryOperation.js";

let matrixInputLeft = new MatrixInput();
let matrixInputRight = new MatrixInput();

import { NumericInputEvents } from "./main/numericInputEvents.js";
NumericInputEvents.addEvents();


// let bo = new BinaryOperation();
const mult = new Mult();
// const uo = new UnaryOperation();

// bo.operandsData.left.append(matrixInputLeft.matrixContainer);

// bo.operandsData.right.append(matrixInputRight.matrixContainer);
// document.getElementById("main").append(bo.container);
import { ShowPrompt } from "./main/showPrompt.js";
const sp = new ShowPrompt();
sp.init();

import { InitDropDownPanel } from "./main/dropDownPanel/InitDropDawnPanel.js";
InitDropDownPanel.init();

import { MainProperties } from "./operations/unaryOperation/main/matrixProperties/mainProperties.js";
import { PropertiesIfMatrixSquare } from "./operations/unaryOperation/main/matrixProperties/propertiesIfMatrixSquare.js";

// import { CheckProperties } from "./operations/unaryOperation/main/checkProperties.js";
// const cp = new CheckProperties();
// cp.test();

// const matrix = [
//   [1, 0, 0],
//   [0, 2, 0],
//   [0, 0, 1],
// ]

// const mp = new MainProperties(matrix);
// mp.generateProperties();
// const ifsq = new PropertiesIfMatrixSquare(mp);

// const res = ifsq._getDiagonalRelatedProperties();
// alert(`diag=${res.isDiagonal} ident=${res.isIdentity} uper=${res.isUpperTriangular} lower=${res.isLowerTriangular} symetric=${res.isSymmetric}`);