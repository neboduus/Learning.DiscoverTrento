/*######
 * CODE REVIEW 
 * GRAFE NON SEMPRE MESSE ALLO STESSO MODO
 * I vettori globali messi così non sono la scelta migliore da un punto di vista visivo
 #####*/
var primi = [{id:1, nome:"semolino", descrizione:"è molto buono", img:"img/semolino.jpg"},
	     {id:2, nome:"pasta al pesto", descrizione:"pasta molto buona", img:"img/pastaAlPesto.jpg"},
	     {id:3, nome:"pasta al pomodoro", descrizione:"è molto buono", img:"img/pastaAlPomodoro.jpg"},
	     {id:4, nome:"gnocchi", descrizione:"pasta molto buona", img:"img/gnocchi.jpg"},
	     {id:5, nome:"ravioli al pomodoro", descrizione:"è molto buono", img:"img/ravioliAlPomodoro.jpg"},
	     {id:6, nome:"tortellini", descrizione:"pasta molto buona", img:"img/tortellini.jpg"}
		];
var primiDelGiorno = [
{id:101, giorno:"venerdì pranzo", nome:"pasta al ragù", descrizione:"la solita pasta al ragu", img:"img/pastaAlRagu.jpg"},
{id:102, giorno:"sabato pranzo", nome:"lasagne", descrizione:"la solita pasta al ragu", img:"img/lasagne.jpg"},
{id:103, giorno:"venerdì cena", nome:"ravioli al vapore", descrizione:"la solita pasta al ragu", img:"img/ravioliAlVapore.jpeg"},
{id:104, giorno:"sabato cena", nome:"riso al tonno", descrizione:"la solita pasta al ragu", img:"img/risoAlTonno.jpeg"},
{id:105, giorno:"domenica pranzo", nome:"minestra", descrizione:"la solita pasta al ragu", img:"img/minestra.jpeg"},
{id:106, giorno:"domenica cena", nome:"crema di carote", descrizione:"la solita pasta al ragu", img:"img/cremaDiCarote.jpeg"},
{id:107, giorno:"lunedì pranzo", nome:"pasta al ragù", descrizione:"la solita pasta al ragu", img:"img/pastaAlRagu.jpg"},
{id:108, giorno:"martedì pranzo", nome:"lasagne", descrizione:"la solita pasta al ragu", img:"img/lasagne.jpg"},
{id:109, giorno:"lunedì cena", nome:"ravioli al vapore", descrizione:"la solita pasta al ragu", img:"img/ravioliAlVapore.jpeg"},
{id:110, giorno:"martedì cena", nome:"riso al tonno", descrizione:"la solita pasta al ragu", img:"img/risoAlTonno.jpeg"},
{id:111, giorno:"mercoledì pranzo", nome:"minestra", descrizione:"la solita pasta al ragu", img:"img/minestra.jpeg"},
{id:112, giorno:"mercoledì cena", nome:"crema di carote", descrizione:"la solita pasta al ragu", img:"img/cremaDiCarote.jpeg"},
{id:111, giorno:"giovedì pranzo", nome:"minestra", descrizione:"la solita pasta al ragu", img:"img/minestra.jpeg"},
{id:112, giorno:"giovedì cena", nome:"crema di carote", descrizione:"la solita pasta al ragu", img:"img/cremaDiCarote.jpeg"}			]

var secondi= [{id:11, nome:"cotoletta", descrizione:"è molto buono", img:"img/cotoletta.jpg"},
	     {id:12, nome:"brasato", descrizione:"molto buono", img:"img/brasato.jpg"}
		];

var contorni =[{id:21, nome:"patate al forno", descrizione:"è molto buono", img:"img/patateAlForno.jpeg"},
		{id:22, nome:"zucchine", descrizione:"è molto buono", img:"img/zucchine.jpeg"}];

var dolci=[{id:31, nome:"yogurt", descrizione:"è molto buono", img:"img/yogurt.jpeg"},
		{id:32, nome:"torta di mele", descrizione:"è molto buono", img:"img/tortaDiMele.jpeg"}];

var giorni =[{id:1, giorno:"lunedì pranzo", ordinato:false, valutato:false}, {id:2, giorno:"lunedì cena", ordinato:false, valutato:false},
             {id:3, giorno:"martedì pranzo", ordinato:false, valutato:false}, {id:4, giorno:"martedì cena", ordinato:false, valutato:false},
             {id:5, giorno:"mercoledì pranzo", ordinato:false, valutato:false}, {id:6, giorno:"mercoledì cena", ordinato:false, valutato:false},
             {id:7, giorno:"giovedì pranzo", ordinato:false, valutato:false}, {id:8, giorno:"giovedì cena", ordinato:false, valutato:false},
             {id:9, giorno:"venerdì pranzo", ordinato:false, valutato:false}, {id:10, giorno:"venerdì cena", ordinato:false, valutato:false},
             {id:11, giorno:"sabato pranzo", ordinato:false, valutato:false}, {id:12, giorno:"sabato cena", ordinato:false, valutato:false},
             {id:13, giorno:"domenica pranzo", ordinato:false, valutato:false}, {id:14, giorno:"domenica cena", ordinato:false, valutato:false}
            ];

var ordini =[];

/*##### MANCA LA DESCRIZIONE #####*/
function indiceGiorno(giorno){
       var trovato = false;
       var i;
       for (i = 0; i < giorni.length && !trovato; i++) {
           if (giorni[i].giorno.localeCompare(giorno) == 0) {
                trovato = true;
           }
       }
       return (trovato ? i-1: -1);

}

/*##### MANCA LA DESCRIZIONE #####*/  
function piattoDelGiorno(giorno) {
       var trovato = false;
       var i;
       for (i = 0; i < primiDelGiorno.length && !trovato; i++) {
           if (primiDelGiorno[i].giorno.localeCompare(giorno) == 0) {
                trovato = true;
           }
       }
       return (trovato ? primiDelGiorno[i-1] : "");
}

/*##### MANCA LA DESCRIZIONE #####*/
function ordineGiorno(giorno) {
       var trovato = false;
       var i;
       for (i = 0; i < ordini.length && !trovato; i++) {
           if (ordini[i].giorno.localeCompare(giorno) == 0) {
                trovato = true;
           }
       }
       return (trovato ? ordini[i-1] : "");
}


//express lib
var express = require('express');
//inspect /* INSPECT COSA?? */
var util = require('util');

//instantiate express
var app = express();

//for templates
var bind = require('bind');

var path = require('path'); /*##### A COSA SERVE QUESTO IMPORT?? #####*/

//POST
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', (process.env.PORT || 1337));



////////////////////////////////////////
//nome: ordina pasto
//input: giorno prenotazione
//output: pagina ordinazione
////////////////////////////////////////
app.use('/ordina', function(request, response) 
{
	//aquisiamo il valore del giorno selezionata
	var g = "errore";
	if ( typeof request.body !== 'undefined' && request.body){
				
		if ( typeof request.body.giorno !== 'undefined' && request.body.giorno){
			g = request.body.giorno;
		}
	}
		/*##### TROPPI SPAZI TRA GLI IF #####*/

	//passiamo le informazioni relative ai piatti alla pagina della orinanazione
    	bind.toFile('views/ordinazione.tpl', 
	{
        	//set up parameters
	    giorno: g,
            primi: primi,
	    primiDelGiorno: piattoDelGiorno(g),
	    secondi: secondi,
	    contorni: contorni,
	    dolci: dolci
   	 }, 
    	function(data) 
    	{
        	//write response
        	response.writeHead(200, {'Content-Type': 'text/html'});
        	response.end(data);
    	});

	/*##### TROPPI SPAZI #####*/

});



////////////////////////////////////////
//nome: effettua ordine pasto
//input: giorno prenotazione, lista piatti selezionati
//server: salva le informazioni relative all'ordine
//output: pagina ordinazione effettuata con successo
////////////////////////////////////////
app.use('/effettuaOrdine', function(request, response) 
{	
	/*##### TROPPI SPAZI #####*/
	//get giorno attuale e lista ordinazioni
	var o = "";
	var g = "";
	if ( typeof request.body !== 'undefined' && request.body){
				
		if ( typeof request.body.ord !== 'undefined' && request.body.ord){
			o = request.body.ord;
		}
		if ( typeof request.body.giorno !== 'undefined' && request.body.giorno){
			g = request.body.giorno;
		}
	}	
	
	/*##### TROPPI SPAZI #####*/
	if(!o){
		//passiamo alla pagina info
    		bind.toFile('views/info.tpl', 
		{
        	//set up parameters
	    	info : "NESSUNA PIETANZA SELEZIONATA"
   	 	}, 
    		function(data) 
    		{
        		//write response
        		response.writeHead(200, {'Content-Type': 'text/html'});
        		response.end(data);
    		});
	}else{
		/*##### TROPPI SPAZI #####*/
		var ordinazione =[]; 
		ordinazione = o.split(",");
	
		//salviamo l'ordinazione
		ordini.push({giorno:g,ordine:ordinazione});
		var ig = indiceGiorno(g);
		giorni[ig].ordinato = true;
	
		//passiamo alla pagina info
	    	bind.toFile('views/info.tpl', 
		{
	        	//set up parameters
		    info : "ORDINAZIONE EFFETTUATA!"
	   	 }, 
	    	function(data) 
	    	{
	        	//write response
	        	response.writeHead(200, {'Content-Type': 'text/html'});
	        	response.end(data);
	    	});
	}


});


////////////////////////////////////////
//nome: effettua valutazione pasto
//input: giorno prenotazione, indice della lista dei piatti selezionati
//server: setta il flag valutato per quel giorno a true
//output: pagina valutazione effettuata con successo
////////////////////////////////////////
app.use('/valuta', function(request, response) 
{
	//get giorno ordinazione
	var g = "erroreG";
	if ( typeof request.body !== 'undefined' && request.body){
				
		if ( typeof request.body.giorno !== 'undefined' && request.body.giorno){
			g = request.body.giorno;
		}
	}
	var o = ordineGiorno(g);

	//get indice ordinazione
	var i = "erroreI";
	if ( typeof request.body !== 'undefined' && request.body){
				
		if ( typeof request.body.indice !== 'undefined' && request.body.indice){
			i = parseInt(request.body.indice);
		}
	}
	
	//controllo fine piatti da valutare per quel giorno
	if(i==o.ordine.length){
		//passiamo alla pagina info
		giorni[indiceGiorno(g)].valutato = true;
		bind.toFile('views/info.tpl', 
			{ 
				info: "VALUTAZIONE EFFETTUATA!"
			}, 
    			function(data) 
    			{
        			//write response
        			response.writeHead(200, {'Content-Type': 'text/html'});
        			response.end(data);
    			});
		
	}else{ 

		//se ci sono ancora piatti da valutare incrementa i e ritorna a questa pagina
    		bind.toFile('views/valutazione.tpl', 
		{
        	    //set up parameters
        	    giorno: o.giorno,
		    piatto: o.ordine[i],
		    indice: i+1
   		 }, 
    		function(data) 
    		{
        		//write response
        		response.writeHead(200, {'Content-Type': 'text/html'});
        		response.end(data);
    		});
	}



});



////////////////////////////////////////
//nome: effettua valutazione pasto
//input: giorno attuale, se non specificato è mercoledì cena
//server: #
//output: lista di tutti i giorni della settimana con 
//	  parametri valutato e orinato a seconda del giorno attuale,
//	  giorno attuale
////////////////////////////////////////
app.use('/', function(request, response) 
{
	/*##### TROPPI SPAZI #####*/

	var giorni2 = [];
	var giornoAttuale = 5;
	//get giorno attuale
	if ( typeof request.body !== 'undefined' && request.body){
				
		if ( typeof request.body.giornoAttuale !== 'undefined' && request.body.giornoAttuale){
			giornoAttuale = request.body.giornoAttuale-1;
		}
	}

	//riempimento della lista da passare
	var ord;
	var val;
	for(var i=0; i<=giornoAttuale; i++){
		if(giorni[i].ordinato){
			ord = "ordinato";
			if(giorni[i].valutato){
				val ="valutato";
			}else{
				val='<form action="http://127.0.0.1:1337/valuta" method="post"> <input type="hidden" name="giorno" value="'+giorni[i].giorno+'"> <input type="hidden" name="indice" value="0"> <button type="button" onclick="submit()">valuta</button></form>';
			}
		}else{
			ord="troppo tardi";
			val="non valutabile";
		}
		giorni2.push({id:giorni[i].id, giorno:giorni[i].giorno, ordinato:ord, valutato:val});
	 }


	for(var i=giornoAttuale+1; i<giorni.length; i++){
		if(giorni[i].ordinato){
			ord = "ordinato";
			val= "aspetta";
		}else{				/*##### URL???localhost??? #####*/
			ord='<form action="http://127.0.0.1:1337/ordina" method="post"> <input type="hidden" name="giorno" value="'+giorni[i].giorno+'"> <button type="button" onclick="submit()">ordina</button></form>'
			val="non valutabile"
		}
		giorni2.push({id:giorni[i].id, giorno:giorni[i].giorno, ordinato:ord, valutato:val});
	 }


	//andiamo alla pagina menu portandoci dietro la lista fatta ad hoc
    	bind.toFile('views/menu.tpl', 
	{
        	//set up parameters
	    giornoCorrente: giornoAttuale+1,
            giorni: giorni2
   	 }, 
    	function(data) 
    	{
        	//write response
        	response.writeHead(200, {'Content-Type': 'text/html'});
        	response.end(data);
    	});



});

/*##### TROPPI SPAZI #####*/


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
