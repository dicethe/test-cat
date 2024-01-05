
"use strict";

// const quiz = document.querySelector.('.quiz');
const $ = document.querySelector.bind(document);

const quiz = $(".quiz");
const warning = $(".warning");
const btnNext = $(".quiz__next-btn");

//Клик на кнопку "Далее"
btnNext.addEventListener('click', nextQuestion);

let count = 0;

//Кол-во правильных ответов пользователя
let userScore = 0;

if(typeof questions !== "undefined" && questions.length > 0 ){
		quiz.classList.remove('hidden');
		showQuestions(count);
}	else{
		warning.classList.remove('hidden');
}


//Функция рендеринга теста
function showQuestions (index){

	let title = $(".quiz__title");
	let list = $(".quiz__list");
	let progress = $(".quiz__progress-inner");
	let total = $(".quiz__total");

//Вопрос
	title.innerHTML = `${questions[index].question}`;
//Варианты ответов
	list.innerHTML = '';
	questions[index].options.forEach(el => {
		const text = `<li class = "quiz__option">${el}</li>`;
		list.insertAdjacentHTML("beforeend", text);
		});

//Кол-во пройденных вопросов
	total.innerHTML = `${index + 1} из ${questions.length}`;

//Шкала прогресса
	progress.style.width = `${Math.round(((index + 1) / questions.length) * 100)}%`;

//Вызов функции optionSelected
	const options = list.querySelectorAll(".quiz__option");
	options.forEach(el => el.setAttribute ("onclick", "optionSelected(this)"));
}



//Функция обработки ответов пользователя
function optionSelected(answer){

	const userAnswer = answer.textContent;
	const correctAnswer = questions[count].answer;
	const options = document.querySelectorAll(".quiz__option");

	//Значок правильного ответа
	const iconCorrect = "<span>&#9989;</span>";
	//Значок неправильного
	const iconIncorrect = "<span>&#10060;</span>";

	if(userAnswer == correctAnswer){
		userScore += 1;
		answer.classList.add("correct");
		answer.insertAdjacentHTML("beforeend",iconCorrect);
	} else{
		answer.classList.add("incorrect")
		answer.insertAdjacentHTML("beforeend",iconIncorrect);

//Показ правильного ответа с задержкой
		options.forEach(el => {
			if(el.textContent == correctAnswer){
				setTimeout(() => {
				el.classList.add("correct");
				el.insertAdjacentHTML("beforeend",iconCorrect);
			}, 100);
		}
	});
}

//Отключение реакции кнопок на клик
options.forEach(el => el.classList.add("disabled"));
}



//Функция для кнопки "Далее"
function nextQuestion(){
	const option = $(".quiz__option");
	const result = $(".result");
	const resultText = $(".result__text");

	if((count + 1) == questions.length && option.classList.contains('disabled')){
		result.classList.remove('hidden');
		quiz.classList.add('hidden');
		resultText.innerHTML = `Вы ответили правильно на ${userScore} из ${questions.length}.`
		console.log()
		return;
	}


	if(option.classList.contains('disabled')) {
		count++;
		showQuestions(count);
	} else{
		alert("Сначала выберите вариант ответа, а потом переходите к следующему вопросу.");
	}
}