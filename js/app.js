'use strict';

function Horns(horns) {
    this.title = horns.title;
    this.image_url = horns.image_url;
    this.description = horns.description;
    this.keyword = horns.keyword;
    this.horns = horns.horns;
}

Horns.allHorns = [];
Horns.allOpt = [];
Horns.uniqueOpt = [];

Horns.prototype.render = function () {
    $('main').append('<div class="clone"></div>');
    let hornClone = $('div[class="clone"]');
    let hornHTML = $('#photo-template').html();
    hornClone.html(hornHTML);
    hornClone.find('h2').text(this.title);
    hornClone.find('img').attr('src', this.image_url);
    hornClone.find('p').text(this.description);
    hornClone.removeClass('clone');
    hornClone.attr('class', this.title);
}

function readJson() {
    $.get('../data/page-1.json', 'json')
    .then(data => {
        data.forEach(obj => {
            Horns.allHorns.push(new Horns(obj));
        })
        
        console.log('my data from page 1', data);
    })
    .then(() => {
        for (let i = 0; i < Horns.allHorns.length; i++) {
            Horns.allHorns[i].render();
            Horns.allOpt.push(Horns.allHorns[i].keyword)
        }
        console.log(Horns.allOpt);
        loadHorns();
        makeAllOptUnique();
        renderOpt();
    });
}

function loadHorns() {
    for (let i = 0; i < Horns.allHorns.length; i++) {
        Horns.allHorns[i].render();
    }

};

console.log(Horns.allHorns);


function fillOptArr() {
    for (let i = 0; i < Horns.allHorns.length; i++) {
        Horns.allOpt.push(Horns.allHorns[i].keyword);
    }
    return Horns.allOpt;
}
function renderOpt() {
    for (let i = 0; i < Horns.uniqueOpt[0]["length"]; i++) {
        $('#opt-template').append(`<option class="clone"></option>`);
        let optClone = $('option[class="clone"]');
        let optHTML = $('#photo-template').html();
        optClone.html(optHTML);
        optClone.removeClass('clone');
        optClone.attr('class', Horns.uniqueOpt[0][i]);
        optClone.text(Horns.uniqueOpt[0][i]);

        console.log(Horns.uniqueOpt[0][i]);
    }
}
function makeAllOptUnique() {
    var uniqueOptArr = [...new Set(Horns.allOpt)];
    Horns.uniqueOpt.push(uniqueOptArr);
    
}
readJson();
fillOptArr();

console.log(Horns.allOpt);

