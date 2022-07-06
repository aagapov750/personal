//Массив с вопросами
const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

//Находим элементы
const headerConteiner = document.querySelector('#header');
const otvetList = document.querySelector('#list');
const subm = document.querySelector('#submit');

let score = 0; //Баллы за правильные ответы
let qindex = 0; //Текущий вопрос

clearPage();
showQuestion();
subm.onclick = checkAnswer;

//Ф-я очистки полей с ответами и вопросами
function clearPage() {
	headerConteiner.innerHTML = '';
	otvetList.innerHTML = '';
}

//Ф-я вывода вопроса и ответа на страницу
function showQuestion() {
	//Разметка с вопросом
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	//Вырезаем и вставляем нужный вопрос
	const title = headerTemplate.replace('%title%', questions[qindex]['question']);
	headerConteiner.innerHTML = title;
	//Вывод вариантов ответов
	let answerNumber = 1;
	for (item of questions[qindex]['answers']) {
		const questionTemplate = `<li>
		<label>
			<input value = "%number%" type="radio" class="answer" name="answer" />
			<span>%answer%</span>
		</label>
	</li>`;
	let answerHtml = questionTemplate.replace('%answer%', item);
	answerHtml = answerHtml.replace('%number%', answerNumber);
	otvetList.innerHTML = otvetList.innerHTML + answerHtml;
	answerNumber++;
	}

}


function checkAnswer() {
	//Находим выбранную радиокнопку
	const checkedRadio = otvetList.querySelector('input[type = "radio"]:checked');
	//Если ответ не выбран просто выходим из ф-и
	if(!checkedRadio) {
		subm.blur();
		return
	}
	//Выбранный ответ пользователя
const userAnswer = parseInt(checkedRadio.value);
//Если ответ правильный увеличиваем score на 1
if(userAnswer === questions[qindex]['correct']) {
	score++;
}
//Проверка. Это последний вопрос?
if(qindex !== questions.length -1) {
	qindex++;
	clearPage();
	showQuestion();
}
else {
	clearPage();
	showoRezult();
}
}


function showoRezult() {
	console.log('showoRezult Start')
	const rezultTemplate = `<h2 class="title">%title%</h2>
							<h3 class="summary">%message%</h3>
							<p class="result">%result%</p>
							<img src = './nasty.jpg' width = '200' align="middle">`;

	let title, message;

	if(score === questions.length) {
		title = "Поздравляем 😍";
		message = 'Вы ответили верно на все вопросы 😉';
	}
	else if ((score * 50) / questions.length >= 50) {
		title = 'Неплохой результат';
		message = 'Вы ответили правильно более чем на половину вопросов';
	}
	else {
		title = 'Стоит постараться';
		message = 'Пока у вас меньше половины правильных ответов';
	}

	let rezult = `${score} из ${questions.length}`;
	const finalMessage = rezultTemplate.replace('%title%', title).replace('%message%', message).replace('%result%', rezult);
	headerConteiner.innerHTML = finalMessage;

	subm.blur();
	subm.innerText = 'Начать заново';
	subm.onclick = function() {
		history.go();
	}
}
