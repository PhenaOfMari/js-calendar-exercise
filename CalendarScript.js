$(function(){
	// Define the month object
	var month = Backbone.Model.extend({
		defaults: function(){
			return {
				name: "",
				number: NaN,
				current: false
			};
		},
		update: function(){
			this.save({current: BirthdayMonth.getMonth() == this.get("name")});
		}
	});
	
	// Define the year collection
	var yearBackbone = Backbone.Collection.extend({
		model: month,
		localStorage: new Backbone.LocalStorage("year-backbone"),
		// Sorts the collection by name
		alphabetize: function(){
			this.comparator = 'name';
			this.sort();
		},
		// Sorts the collection by number
		numerical: function(){
			this.comparator = 'number';
			this.sort();
		},
		comparator: 'number'
	});
	// Create a global instance of a year to use in the app
	var year = new yearBackbone;
	
	// Create a view for the year
	var yearView = Backbone.View.extend({
		tagName: "div",
		template: _.template("<div class='monthItem' style='background-color:<%= current ? 'red' : 'deepskyblue' %>;border-style:solid;border-width:1px'><%- name %></div>"),//template: _.template($('#item-template').html()),
		events: {
			"click .monthItem" : "setCurrent"
		},
		initialize: function(){
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		isCurrent: function(){
			return BirthdayMonth.getMonth() == this.model.get('name');
		},
		// Sets the current month to the one that was clicked
		setCurrent: function(){
			BirthdayMonth.setMonth(this.model.get('name'));
			year.each(function(model, index){model.update();}, this);
		}
	});
	
	var appView = Backbone.View.extend({
		el: $("#main"),
		events: {
			"click #alpha-btn": "alphabetize",
			"click #num-btn": "numerical"
		},
		initialize: function(){
			year.reset();
			this.listenTo(year, 'add', this.add);
			this.listenTo(year, 'sort', this.refresh);
			
			// Define the months of the year and add them to the year collection
			year.create({name: "January", number: 1});
			year.create({name: "February", number: 2});
			year.create({name: "March", number: 3});
			year.create({name: "April", number: 4});
			year.create({name: "May", number: 5});
			year.create({name: "June", number: 6});
			year.create({name: "July", number: 7});
			year.create({name: "August", number: 8});
			year.create({name: "September", number: 9});
			year.create({name: "October", number: 10});
			year.create({name: "November", number: 11});
			year.create({name: "December", number: 12});
			//Set April to current month and update the list
			BirthdayMonth.setMonth("April");
			year.each(function(model, index){model.update();}, this);
		},
		add: function(month){
			var view = new yearView({model: month});
			this.$("#month-list").append(view.render().el);
		},
		refresh: function(){
			while($("#month-list")[0].firstChild){
				$("#month-list")[0].removeChild($("#month-list")[0].firstChild);
			};
			year.each(this.add, this);
		},
		// Handler for the Alphabetize button
		alphabetize: function(){
			year.alphabetize();
		},
		// Handler for the Numerical button
		numerical: function(){
			year.numerical();
		}
	});
	
	var app = new appView;
});

//BirthdayMonth module pattern
var BirthdayMonth = (function(){
	// private variable that stores the current month, defaults to April (my birth month)
	var currentMonth = null;
	
	// public functions
	return {
		// Returns the current month
		getMonth:function(){
			return currentMonth;
		},
		// Sets the current month
		setMonth:function(newMonth){
			currentMonth = newMonth;
			console.log(newMonth + " has been set to the new birth month.");
		}
	};
}());