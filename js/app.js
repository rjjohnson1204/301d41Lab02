'use strict'

function Horns(horns) {
    this.title = horns.title;
    this.image_url = horns.image_url;
    this.description = horns.description;
    this.keyword = horns.keyword;
    this.horns = horns.horns;
}

Horns.allHorns = [];
Horns.allOpt = [];

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

Horns.readJson = () => {
    $.get('../data/page-1.json', 'json')
        .then(data => {
            data.forEach(obj => {
                Horns.allHorns.push(new Horns(obj))
            })
        })
        .then(Horns.loadHorns)
}

Horns.loadHorns = () => {
    Horns.allHorns.forEach(horns => horns.render())
}
console.log(Horns.allHorns)

$(() => Horns.readJson());

Horns.fillOptArr = function () {
    for (let i = 0; i < Horns.allHorns.length; i++) {
        Horns.allOpt.push(Horns.allHorns[i].keyword);
    }
    return Horns.allOpt;
}
Horns.fillOptArr();

function checkKeyword(){    }


function loadOpt (){
    Horns.allOpt.forEach(horns => {
        console.log(horns);
        // $('#opt-template').append('<option class="clone"></option>');
        // let optClone = $('option[class="clone"]');
        // $('option').text(horns);
        // optClone.attr('class', horns);
        // optClone.removeClass('clone');
    });
}


console.log(Horns.allOpt);
loadOpt();

