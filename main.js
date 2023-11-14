function isWhite(e) {
    if (e.tagName == 'TR') e = e.getElementsByTagName('td')[0];
    return e.style.backgroundColor == 'white' ||
            e.style.backgroundColor == '' ||
            e.style.backgroundColor == 'rgb(255,255,255)'
}
function realChangeColor(e) {
    if (isWhite(e))
        e.style.backgroundColor = '#CCC';
    else
        e.style.backgroundColor = 'white';
}
function changeColor(e) {
    let cells = e.getElementsByTagName('td');
    for (let i=0;i<cells.length-1;i++)
        realChangeColor(cells[i]);
}
var removedRows = [];
function removeRow(e) {
    e = e.parentElement;
    removedRows.push(e);
    e.style.opacity = '0';
    setTimeout(() => e.remove(), 100);
    showButtons();
    changeColor(e);
}
function undo() {
    if (removedRows.length != 0) {
        var t = document.getElementsByTagName('tbody')[0];
        let r = removedRows.pop();
        r.style.opacity = '1';
        t.appendChild(r);
    }
    showButtons();
}
function restoreRows() {
    while (removedRows.length > 0) undo();
    document.getElementsByTagName('tr')[0].getElementsByTagName('th')[1].click();
    document.getElementsByTagName('tr')[0].getElementsByTagName('th')[0].click();
    let rows = document.getElementsByTagName('tr');
    for (let i=1;i<rows.length;i++)
        if (!isWhite(rows[i])) changeColor(rows[i]);
}
function showButtons() {
    let prop = (removedRows.length == 0)?'hidden':'visible';
    restoreButton.style.visibility = undoButton.style.visibility = prop;
}
function getIndex(e) {
    let elems = e.parentElement.children;
    for (let i=0;i<elems.length;i++)
        if (elems[i] == e) return i;
}
function updateLinks() {
    var elems = document.getElementsByTagName('tr');
    for (var i=1;i<elems.length;i++) {
        elems[i].onclick = function() {changeColor(this);};
        let c = elems[i].insertCell();
        c.className = 'remove';
        c.innerHTML = '&#10007;';
        c.bgColor = '';
        c.onclick = function() { removeRow(this);};
    }
    let ub = document.getElementById('undoButton'),
        rb = document.getElementById('restoreButton');
    ub.onclick = function() {undo();};
    rb.onclick = function() {restoreRows();};
    showButtons();
    let th_elems = document.getElementsByTagName('thead')[0].getElementsByTagName('th');
    for (let i=0;i<th_elems.length;i++) {
        let table = document.getElementsByTagName('table')[0];
        th_elems[i].onclick = function() {sortTable(table, getIndex(this));}
    }
}
document.addEventListener('DOMContentLoaded', updateLinks, false);

// EXTRA:
function getValues(n) {
    let table = document.getElementsByTagName('table')[0];
    let rows = table.rows;
    var ret = [];
    for (let i=1;i<rows.length;i++) {
        let val = rows[i].getElementsByTagName('td')[n].innerHTML;
        if (isNaN(val)) ret.push(val);
        else ret.push(parseFloat(val));
    }
    return ret;
}
function countValues(n) {
    let list = getValues(n);
    var counts = {};
    list.forEach(function(e) {
        if (counts[e] === undefined) counts[e] = 0;
        counts[e]++;
    });
    return counts;
}
function indexLastColumn() {
    return document.getElementsByTagName('tr')[1].getElementsByTagName('td').length-2;
}
