window.addEventListener('load', start);

var inputA = document.querySelector('#numberA');
var inputB = document.querySelector('#numberB');

var objectCalculations = [
  {
    description: 'Soma (a+b):',
    calculate: function soma(a, b) {
      return a + b;
    },
    type: 'a_b',
  },
  {
    description: 'Subtração (a-b):',
    calculate: function sub(a, b) {
      return a - b;
    },
    type: 'a_b',
  },
  {
    description: 'Subtração2 (b-a):',
    calculate: function sub1(b, a) {
      return b - a;
    },
    type: 'b_a',
  },
  {
    description: 'Multipliacação (a*b):',
    calculate: function mult(a, b) {
      return a * b;
    },
    type: 'a_b',
  },
  {
    description: 'Divisão (a/b):',
    calculate: function div1(a, b) {
      return a / b;
    },
    type: 'a_b',
  },
  {
    description: 'Divisão2 (b/a):',
    calculate: function div2(b, a) {
      return b / a;
    },
    type: 'b_a',
  },
  {
    description: 'Quadrado de a (a²):',
    calculate: function quad(a) {
      return a * a;
    },
    type: 'a',
  },
  {
    description: 'Quadrado de b (b²):',
    calculate: function quad(b) {
      return b * b;
    },
    type: 'b',
  },
  {
    description: 'Divisores inteiros de a:',
    calculate: function divisorA(a) {
      var a = divisors(a);
      return a;
    },
    type: 'a',
  },
  {
    description: 'Divisores inteiros de b:',
    calculate: function divisorB(b) {
      var b = divisors(b);
      return b;
    },
    type: 'b',
  },
  {
    description: 'Fatorial de a:',
    calculate: function fatA(a) {
      var a = fatorial(a);
      return a;
    },
    type: 'a',
  },
  {
    description: 'Fatorial de b:',
    calculate: function fatB(b) {
      var b = fatorial(b);
      return b;
    },
    type: 'b',
  },
];

function start() {
  handleInput();
  renderCalc();
}

function formatNumber(number) {
  return new Intl.NumberFormat('pt-BR').format(number);
}

function handleInput() {
  function handleTypingA(event) {
    renderCalc();
  }
  function handleTypingB(event) {
    renderCalc();
  }
  inputA.addEventListener('input', handleTypingA);
  inputB.addEventListener('input', handleTypingB);
}

function renderCalc() {
  var divCalc = document.createElement('div');
  divCalc.classList.add('row');

  var a = parseInt(inputA.value, 10);
  var b = parseInt(inputB.value, 10);

  var calculations = document.querySelector('#mathematics');

  for (var i = 0; i < objectCalculations.length; i++) {
    var calculation = objectCalculations[i];
    var value = getCalculationFrom(
      calculation.type,
      calculation.calculate,
      a,
      b
    );

    if (value === undefined || value === ' (0)' || Number.isNaN(value)) {
      value = 0;
    }

    var div = document.createElement('div');
    div.classList.add('input-field', 'col', 's6');

    var input = document.createElement('input');
    if (
      (a >= 21 && calculation.description === 'Fatorial de a:') ||
      (b >= 21 && calculation.description === 'Fatorial de b:')
    ) {
      input.value = 'Número muito grande.';
    } else {
      if (
        calculation.description === 'Divisores inteiros de b:' ||
        calculation.description === 'Divisores inteiros de a:'
      ) {
        input.value = value;
      } else {
        input.value = formatNumber(value);
      }
    }

    var label = document.createElement('label');
    label.textContent = calculation.description;
    label.classList.add('active');

    div.appendChild(input);
    div.appendChild(label);
    divCalc.appendChild(div);
  }

  calculations.innerHTML = '';
  calculations.appendChild(divCalc);
}

function getCalculationFrom(type, calculationFunction, a, b) {
  var value = '';

  switch (type) {
    case 'a':
      value = calculationFunction(a);
      break;

    case 'b':
      value = calculationFunction(b);
      break;

    case 'a_b':
      value = calculationFunction(a, b);
      break;

    case 'b_a':
      value = calculationFunction(b, a);
      break;

    default:
      value = 'Erro no cálculo. Verifique o que foi digitado.';
  }

  return value;
}

function divisors(number) {
  var divisors = [];
  var num = parseInt(number);
  var count = 0;
  for (var i = 0; i <= num; i++) {
    if (num % i === 0) {
      ++count;
      divisors.push(i);
    }
  }
  var finalAnswer = divisors + ' (' + count + ')';
  return finalAnswer;
}

function fatorial(num) {
  var answer;
  var number = parseInt(num);
  if (number === 0 || number === 1) {
    answer = 1;
    return answer;
  } else {
    var aux = 1;
    for (var i = number; i > 1; i--) {
      aux = aux * i;
      answer = aux;
    }
    return answer;
  }
}
