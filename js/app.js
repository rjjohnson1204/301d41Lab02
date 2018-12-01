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

Horns.prototype.render = function() {
    const $template = $('#photo-template').html();
    const $src = Handlebars.compile($template);
    return $src(this);
}
function readJson() {
    $.get('../data/page-1.json', 'json')
    .then(data => {
        data.forEach(obj => {
            Horns.allHorns.push(new Horns(obj));
        })
    })
    .then(() => {
        for (let i = 0; i < Horns.allHorns.length; i++) {
            Horns.allHorns[i].render();
            Horns.allOpt.push(Horns.allHorns[i].keyword)
        }
        loadHorns();
        makeAllOptUnique();
        renderOpt();
    });
}

function loadHorns() {
    for (let i = 0; i < Horns.allHorns.length; i++) {
        $('#render-photos').append(Horns.allHorns[i].render());
    }
};

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
    }
}
function makeAllOptUnique() {
    var uniqueOptArr = [...new Set(Horns.allOpt)];
    Horns.uniqueOpt.push(uniqueOptArr);   
}

$('#opt-template').on('change', function renderSelOpt() {
 let SelVal = $(this).val();
 $('div').hide();
 $('div[id = "'+SelVal+'"]').show();
});

readJson();
fillOptArr();



