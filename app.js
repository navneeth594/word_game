const express = require('express');
const request = require('request');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
 mongoose.connect("mongodb://localhost:27017/thinkerbell", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended : true }));

var wordSchema = new mongoose.Schema({
    ww: Object
});
var Words = mongoose.model("Words", wordSchema);
const rn1=[];
const rn2=[];
const rn3=[];
Words.find({stage:"1"},function(err,words){
	words[0].ww.forEach(function(word){
		rn1.push(word)
	})
	
})

Words.find({stage:"2"},function(err,words){
	words[0].ww.forEach(function(word){
		rn2.push(word)
	})
	
})

Words.find({stage:"3"},function(err,words){
	words[0].ww.forEach(function(word){
		rn3.push(word)
	})
	
})

const lvl1=rn1.length;
const lvl2=rn2.length;
const lvl3=rn3.length;

var score=0;

app.get('/1',function(req,res){
	
		
		 
			res.render('index.ejs',{word:rn1[0], pres: "1",next:"2",level:"1", score:score})
	

	
			
});

app.get('/2',function(req,res){
	res.render('index.ejs',{data:rn2, pres: "2",next:"3",level:"2", score:score})
})

app.get('/3',function(req,res){
	res.render('index.ejs',{data:rn3, pres: "3",next:"Nill",level:"3", score:score})
})



app.post('/correct/:pres/:next',function(req,res){

	if (req.params.pres=="1"){
		score=score+100;
		const index1 = rn1.indexOf(req.body.value);
		if (index1 > -1) {
  			rn1.splice(index1, 1);
		}

		if (rn1.length>=1){
			res.redirect('/1')
		}
		else{
			res.render('passed.ejs',{next : req.params.next})
		}

	}

	if (req.params.pres=="2"){
		score=score+200;
		const index2 = rn2.indexOf(req.body.value);
		if (index2 > -1) {
  			rn2.splice(index2, 1);
		}
		if (rn2.length>=1){
			res.redirect('/2')
		}
		else{
			res.render('passed.ejs',{next : req.params.next})
		}

	}

	if (req.params.pres=="3"){
		score=score+300;
		const index3 = rn3.indexOf(req.body.value);
		if (index3 > -1) {
  			rn3.splice(index3, 1);
		}
		if (rn3.length>=1){
			res.redirect('/3')
		}
		else{
			res.render('results.ejs')
		}

	}
	
	
})

app.listen(3000, function(){
     console.log(' app started on port: 3000');
     
 });