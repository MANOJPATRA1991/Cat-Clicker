$(document).ready(function(){

/* ======= Model ======= */

    var model = {
        currentCat: null,
        cats: [
            {
                clickCount : 0,
                name : 'Tabby',
                imgSrc : './img/download.jpg',
                visible: true
            },
            {
                clickCount : 0,
                name : 'Tiger',
                imgSrc : 'img/ba03237a6d6499f0e2633314826e1526--cutest-animals-baby-animals.jpg',
                visible: true
            },
            {
                clickCount : 0,
                name : 'Scaredy',
                imgSrc : 'img/4154543904_6e2428c421_z.jpg',
                visible: true
            },
            {
                clickCount : 0,
                name : 'Shadow',
                imgSrc : 'img/maxresdefault.jpg',
                visible: true
            },
            {
                clickCount : 0,
                name : 'Sleepy',
                imgSrc : 'img/4154543904_6e2428c421_z.jpg',
                visible: true
            }
        ],

        editCat: function(index, cat){
            if(cat.count){
                model.cats[index].clickCount = cat.count;
            }
            if(cat.name){
                model.cats[index].name = cat.name;
            }
            if(cat.url){
                model.cats[index].imgSrc = cat.url;
            }
        }
    };


    /* ======= Octopus ======= */

    var octopus = {

        init: function() {
            // set our current cat to the first one in the list
            model.currentCat = model.cats[0];

            // tell our views to initialize
            catListView.init();
            catView.init();
            adminView.init();
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        getCats: function() {
            return model.cats;
        },

        // set the currently-selected cat to the object passed in
        setCurrentCat: function(cat) {
            model.currentCat = cat;
        },

        // increments the counter for the currently-selected cat
        incrementCounter: function() {
            model.currentCat.clickCount++;
            catView.render();
        },
        saveCat: function(cat){
            var curr = this.getCurrentCat();
            var index = model.cats.indexOf(curr);
            
            model.editCat(index, cat);

            catListView.render();
            catView.render();
            adminView.render();
        }
    };


    /* ======= View ======= */

    var catView = {

        init: function() {
            // store pointers to our DOM elements for easy access later
            this.catElem = $('#cat');
            this.catNameElem = $('#cat-name');
            this.catImageElem = $('#cat-img');
            this.countElem = $('#cat-count');

            // on click, increment the current cat's counter
            this.catImageElem.on('click', function(){
                octopus.incrementCounter();
            });

            // render this view (update the DOM elements with the right values)
            this.render();
        },

        render: function() {
            // update the DOM elements with values from the current cat
            var currentCat = octopus.getCurrentCat();
            var catNameElem = this.catNameElem;
            var catImageElem = this.catImageElem;
            var countElem = this.countElem;
            
            countElem.text(currentCat.clickCount + " likes");
            catNameElem.text(currentCat.name);
            catImageElem.attr('src', currentCat.imgSrc);
        }
    };

    var catListView = {

        init: function() {
            // store the DOM element for easy access later
            this.catListElem = $('#cat-list');

            // render this view (update the DOM elements with the right values)
            this.render();
        },

        render: function() {
            // get the cats we'll be rendering from the octopus
            var cats = octopus.getCats();
            var catListElem = this.catListElem;
            // empty the cat list
            catListElem.html('');
            for(var i=0; i<cats.length; i++){
                let c = cats[i];
                catListElem.append("<li id='" + c.name + "'>" + c.name + "</li>");
                var id = $("#" + c.name);
                id.on('click', function(){
                    octopus.setCurrentCat(c);
                    catView.render();
                });
            }
        }
    };

    var adminView = {
        init: function(){
            this.adminElem = $('admin');
            this.adminBtn = $('#admin-button');
            this.form = $('#admin-form');
            this.cancelBtn = $('#cancel');
            this.saveBtn = $('#save');

            this.render();
        },

        render: function(){
            var adminBtn = this.adminBtn;
            var saveBtn = this.saveBtn;
            var cancelBtn = this.cancelBtn;
            var form = this.form;

            form.hide();

            adminBtn.on('click', function(){
                form.show();
            });
            cancelBtn.on('click', function(){
                form.hide();
            });

            saveBtn.on('click', function(){
                var cat = {
                    name: $("#name").val(),
                    count: $("#count").val(),
                    url: $("#url").val()
                }
                octopus.saveCat(cat);
            });
        }
    }

    // make it go!
    octopus.init();
}());

