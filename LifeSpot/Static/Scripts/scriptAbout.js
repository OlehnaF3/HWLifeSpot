document.addEventListener('DOMContentLoaded', function () {

    const defaultrating = 0;
    const modal = document.getElementsByClassName('modal')[0];
    const closeModalbtn = modal.getElementsByTagName('button')[0];
    const openModalbtn = document.getElementsByClassName('buttonOpen')[0];
    const publishbtn = modal.getElementsByTagName('button')[1];
    const inputtextfeedback = modal.getElementsByTagName('input')[1];
    const inputnamefeedback = modal.getElementsByTagName('input')[0];
    const boxfeedback = document.getElementById('boxfeedback');
    const checkboxinmodal = document.getElementsByTagName('input')[2];

    const modaloffset = modal.offsetTop;

    openModalbtn.addEventListener('click', openModal);
    openModalbtn.addEventListener('click', scrollToModal);
    closeModalbtn.addEventListener('click', closeModal);
    publishbtn.addEventListener('click', addInputInDoc);

    function scrollToModal(){

        window.scroll({
            top: modaloffset,
            behavior: 'smooth'
        })
    }

    function openModal () {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'false');
        openModalbtn.style.display = 'none';
        document.body.style.overflow = 'hidden';
        
    }

    function closeModal () {
        modal.classList.remove('hidden');
        openModalbtn.style.display = 'block' ;
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'visible';
    }

    function addInputInDoc() {
        let inputobj = {
            name: inputnamefeedback.value,
            text: inputtextfeedback.value,
            rating: defaultrating
        };

        if (checkboxinmodal.checked) {
            AddCommit(inputobj);
        }
        else{
         AddFeedBack(inputobj);
        }
        console.log(inputobj.name);
        console.log(inputobj.text);
        if (boxfeedback.style.display !== 'block') {

            boxfeedback.style.display = 'block';
        }
        inputnamefeedback.value = "";
        inputtextfeedback.value = "";
        closeModal();
    }

});



///Вибдек со свойством рейтинга
function AddFeedBack(inputobj) {
    if (!inputobj || !inputobj['name'] || !inputobj['text'] || inputobj['name'] == "" || inputobj['text'] == "") {
        console.error('Invalid input object');
        return;
    }
        let lablename = document.createElement('lable'); //create lable for feedback
        let labletext = document.createElement('lable');

        let nodelablename = document.createTextNode('Имя пользователя:');
        let nodelabletext = document.createTextNode('Отзыв о сайте:');

        lablename.appendChild(nodelablename);
        labletext.appendChild(nodelabletext);

        let paraname = document.createElement('p'); //create p for print text
        let paratext = document.createElement('p');


        let nodename = document.createTextNode(inputobj['name']);
        let nodetext = document.createTextNode(inputobj['text']);

        paraname.appendChild(nodename);
        paratext.appendChild(nodetext);

        let divfeedbackname = document.createElement('div');  //child div in box
        let divfeedbacktext = document.createElement('div');

        divfeedbackname.appendChild(lablename);
        divfeedbackname.appendChild(paraname);

        divfeedbacktext.appendChild(labletext);
        divfeedbacktext.appendChild(paratext);

        let divfeedback = document.createElement('div'); //create new div

        if (!divfeedback.classList.contains('borderd')) {
            divfeedback.classList.add('bordered'); //update class 
        }

        divfeedback.appendChild(divfeedbackname);
        divfeedback.appendChild(divfeedbacktext);

        boxfeedback.appendChild(divfeedback);
}

///У коммента нету свойства рейтинга 
function AddCommit(inputobj) {

    if (!inputobj || !inputobj['name'] || !inputobj['text'] || inputobj['name'] == "" || inputobj['text'] == "") {
        console.error('Invalid input object');
        return;
    }
    let ratingbox = document.createElement('div');

    let ratingdown = document.createElement('div');
    let rationbuttondown = document.createTextNode('👎');

    let ratingup = document.createElement('div');
    let ratingbuttonup = document.createTextNode('👍');

    ratingdown.appendChild(rationbuttondown);
    ratingup.appendChild(ratingbuttonup);

    let ratingtextnode = document.createTextNode('Рейтинг комментария : ' + inputobj.rating + ' 👍');
    ratingbox.appendChild(ratingtextnode);
    ratingbox.appendChild(ratingup);
    ratingbox.appendChild(ratingdown);
    ratingdown.classList.add('buttondown');
    ratingup.classList.add('buttonup');


    let lablename = document.createElement('lable'); //create lable for feedback
    let labletext = document.createElement('lable');

    let nodelablename = document.createTextNode('Имя пользователя:');
    let nodelabletext = document.createTextNode('Отзыв о сайте:');

    lablename.appendChild(nodelablename);
    labletext.appendChild(nodelabletext);

    let paraname = document.createElement('p'); //create p for print text
    let paratext = document.createElement('p');


    let nodename = document.createTextNode(inputobj['name']);
    let nodetext = document.createTextNode(inputobj['text']);

    paraname.appendChild(nodename);
    paratext.appendChild(nodetext);

    let divfeedbackname = document.createElement('div');  //child div in box
    let divfeedbacktext = document.createElement('div');

    divfeedbackname.appendChild(lablename);
    divfeedbackname.appendChild(paraname);

    divfeedbacktext.appendChild(labletext);
    divfeedbacktext.appendChild(paratext);

    let divfeedback = document.createElement('div'); //create new div

    if (!divfeedback.classList.contains('borderd')) {
        divfeedback.classList.add('bordered'); //update class 
    }

    divfeedback.appendChild(divfeedbackname);
    divfeedback.appendChild(divfeedbacktext);

    boxfeedback.appendChild(ratingbox);
    boxfeedback.appendChild(divfeedback);
}