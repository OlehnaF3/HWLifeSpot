document.addEventListener('DOMContentLoaded', function () {

    const modal = document.getElementsByClassName('modal')[0];
    const closeModalbtn = modal.getElementsByTagName('button')[0];
    const openModalbtn = document.getElementsByClassName('buttonOpen')[0];
    const publishbtn = modal.getElementsByTagName('button')[1];
    const inputtextfeedback = modal.getElementsByTagName('input')[1];
    const inputnamefeedback = modal.getElementsByTagName('input')[0];
    const boxfeedback = document.getElementById('boxfeedback');

    openModalbtn.addEventListener('click', openModal);
    closeModalbtn.addEventListener('click', closeModal);
    publishbtn.addEventListener('click', addInputInDoc);

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
    }

    function addInputInDoc() {
        AddFeedBack(inputnamefeedback.value, inputtextfeedback.value);
        if (boxfeedback.style.display != 'block') {

            boxfeedback.style.display = 'block';
        }
        else {

        }
        inputnamefeedback.value = "";
        inputtextfeedback.value = "";
        closeModal();
    }

});

function AddFeedBack(name, text) {
    let lablename = document.createElement('lable'); //create lable for feedback
    let labletext = document.createElement('lable');

    let nodelablename = document.createTextNode('Имя пользователя:');
    let nodelabletext = document.createTextNode('Отзыв о сайте:');

    lablename.appendChild(nodelablename);
    labletext.appendChild(nodelabletext);

    let paraname = document.createElement('p'); //create p for print text
    let paratext = document.createElement('p'); 


    let nodename = document.createTextNode(name);
    let nodetext = document.createTextNode(text);

    paraname.appendChild(nodename);
    paratext.appendChild(nodetext);

    let divfeedbackname = document.createElement('div');  //child div in box
    let divfeedbacktext = document.createElement('div');

    divfeedbackname.appendChild(lablename);
    divfeedbackname.appendChild(paraname);

    divfeedbacktext.appendChild(labletext);
    divfeedbacktext.appendChild(paratext);

    let divfeedback = document.createElement('div'); //create new div

    if (!divfeedback.classList.contains('borderd')){
        divfeedback.classList.add('bordered'); //update class 
    }

    divfeedback.appendChild(divfeedbackname);
    divfeedback.appendChild(divfeedbacktext);

    boxfeedback.appendChild(divfeedback);
}