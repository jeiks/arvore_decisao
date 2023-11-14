var mousePosition;
var offset = [0,0];
var isDown = false;

function setHelpProperties() {
    let helpContainer = document.querySelector('.help'),
        helpDrag = document.querySelector('#moveHelp'),
        helpClose = document.querySelector('#closeHelp'),
        helpOpen = document.querySelector('#displayHelpButton');

    helpDrag.addEventListener('mousedown', function(e) {
        isDown = true;
        offset = [
            helpContainer.offsetLeft - e.clientX,
            helpContainer.offsetTop - e.clientY
        ];
        helpDrag.style.cursor = 'grabbing';
    }, true);

    document.addEventListener('mouseup', function() {
        isDown = false;
        helpDrag.style.cursor = 'grab';
    }, true);

    document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {
                x : event.clientX,
                y : event.clientY
            };
            helpContainer.style.left = (mousePosition.x + offset[0]) + 'px';
            helpContainer.style.top  = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);

    helpClose.addEventListener('click', function(e) {
        helpContainer.style.visibility = 'hidden';
        displayHelpButton.style.visibility = 'visible';
    }, true);
    displayHelpButton.addEventListener('click', function(e) {
        helpContainer.style.visibility = 'visible';
        displayHelpButton.style.visibility = 'hidden';
    }, true);

    let entPos = document.querySelector('#posInputEntropia'),
        entNeg = document.querySelector('#negInputEntropia');
    entPos.addEventListener('input', calcEntropy);
    entNeg.addEventListener('input', calcEntropy);
}
document.addEventListener("DOMContentLoaded", function(){
    setHelpProperties();
});

function calcEntropy() {
    let entPos = document.querySelector('#posInputEntropia').value,
        entNeg = document.querySelector('#negInputEntropia').value,
        entRes = document.querySelector('#respEntropia');
    if (isNaN(entPos) || isNaN(entNeg) || entPos == '' || entNeg == ''){
        entRes.textContent = '';
        return;
    }
    entPos = parseFloat(entPos);
    entNeg = parseFloat(entNeg);
    if (entPos == 0 || entNeg == 0)
        entRes.textContent = '0';
    else {
        let total = entPos + entNeg;
        let p_pos = entPos/total,
            p_neg = entNeg/total;
        entRes.textContent = ''+(-(p_pos*Math.log2(p_pos) + p_neg*Math.log2(p_neg))).toFixed(3);
    }
}
