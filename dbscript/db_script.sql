create table place(
	id serial not null primary key,
	name varchar(50) not null,
	address varchar(200) not null,
	history text not null,
	info text,
	type smallint,
    photo varchar(200));

create table event(
	id serial not null primary key,
	name varchar(50) not null,
	address varchar(200),
	data varchar(20) not null,
	hour_range varchar(20) not null,
	description text not null,
	cost varchar(50) not null,
	place_name varchar(50),
	type smallint);

create table news(
	id serial not null primary key,
    title varchar(50) not null,
	description text not null,
	data varchar(20) not null,
	hour varchar(20),
	place_name varchar(50));
    
create table admin(
    username varchar(20) primary key,
    password varchar(20));

insert into admin(username, password) values ('nepotu', 'calculator');

insert into 
place(name,address,history,info,type, photo) 
values 
    ('Dante Alighieri Monument', 
    'Dante Squares, in front of Trenitalia Station', 
    'Guglielmo Ranzi ebbe l idea di un Monumento a Dante già nel 1886, in occasione della fondazione della società Pro Patria a Rovereto, allora sotto l amministrazione austro-ungarica, ma poi l abbandonò. Nel 1889 a Bolzano fu eretta una statua al poeta tedesco Walther von der Vogelweide come simbolo della cultura germanica della città e Ranzi ripropose l idea, questa volta ottenendo l appoggio del Podestà di Trento Paolo Oss Mazzurana e dell ingegnere Annibale Apollonio di costruire la statua come simbolo dell identità linguistica di Trento e del Tirolo italiano. Nell ottica dell impero austro-ungarico, quale entità multietnica, il Monumento a Dante aveva un forte valore simbolico; stava cioè ad indicare la convivenza pacifica della lingua italiana e tedesca nella Contea del Tirolo, una terra da sempre trilingue, la cui popolazione però era particolarmente fedele e legata alla Casa d Asburgo.', 
    'Lo si può ammirare tutti i giorni gratuitamente facendo una bella passeggiata anche nel parco.', 
    3, 
    'cesare_battis.jpg');
    
insert into 
place(name,address,history,info,type, photo) 
values 
    ('BuonConsiglio Castle', 
    'via Bernardo Clesio, 5 38122 Trento', 
    'The Buonconsiglio Castle is the largest and most important monumental complex of the Trentino Alto Adige region. It was the residence of the prince-bishops of Trento from the 13th century to the end of the 18th century, and is composed of a series of buildings of different eras, enclosed by walls and positioned slightly higher than the city. Castelvecchio is the oldest nucleus, dominated by an imposing cylindrical tower; the Magno Palazzo is the 16th century expansion in the Italian Renaissance-style as commissioned by the Prince-Bishop and Cardinal Bernardo Cles (1485-1539); the Baroque-style Giunta Albertiana dates from the end of the 17th century. At the extreme south of the complex is the Torre Aquila, within which is conserved the famous Cycle of the Months, one of the most fascinating secular pictorial cycles of the late Middle Ages. Also of exceptional interest are the extensive cycle of frescoes commissioned by the bishops to decorate the interior walls of the Castle, mainly in the late Middle Ages to the Renaissance period. After the end of the Episcopal principality (1803) the castle was used as a barracks; following its restoration in 1924, it became the National Museum, and since 1973 it belongs to the Autonomous Province of Trento. Currently it is the principal attraction among the museum group comprised of four castles which are among the most suggestive and prestigious of the Trentino area: in reference to Trento are Stenico Castle, in the Giudicarie Valley, Beseno Castle, in the Adige Valley between Trento and Rovereto, and Thun Castle, in the Valle di Non.', 
    'Tel +39 0461 233770
    Fax +39 0461 239497
    e-mail: info@buonconsiglio.it', 
    3, 
    'buonconsiglio.jpg');
    

insert into 
place(name,address,history,info,type, photo) 
values 
    ('Cesare Battisti Mausoleum', 
    'Via Dòs Trento, 38121 Trento', 
    'The most famous Trentino irredentist rests in a mausoleum overlooking the city of Trento, surrounded by a lovely natural park, a popular destination for walking.', 
    'Il monumento poggia su una base circolare ispirata al mondo classico sulla quale si trova un porticato, costituito da sedici colonne alte più di dieci metri in pietra chiara unite.', 
    3, 
    'cesare_battis.jpg');
    
insert into 
place(name,address,history,info,type, photo) 
values 
    ('Biblioteca Centrale Albere', 
    'Università degli Studi di Trento, Via Giuseppe Verdi, 8, 38122 Trento', 
    'The most famous Trentino irredentist rests in a mausoleum overlooking the city of Trento, surrounded by a lovely natural park, a popular destination for walking.', 
    'Phone:0461 283011
     Hours: 8AM–11:45PM', 
    1, 
    'biblio_albere.jpg');
    
    insert into 
place(name,address,history,info,type, photo) 
values 
    ('Biblioteca Comunale', 
    'Via Roma, 55
     0461 889521', 
    'La Biblioteca Centrale è al servizio dell attività didattica e di ricerca dei Dipartimenti di Sociologia e ricerca sociale, del Dipartimento di Economia e management e della Facoltà di Giurisprudenza.', 
    'Opens at 8:30 AM', 
    1, 
    'biblio_centrale.jpg');
    
insert into 
place(name,address,history,info,type, photo) 
values 
    ('Biblioteca di Scienze - Povo', 
    'Polo Scientifico e Tecnologico Fabio Ferrari, Via Sommarive 5 - 38123 Trento', 
    'La Biblioteca di Scienze raccoglie, organizza e conserva il materiale documentario a supporto dell attività didattica e di ricerca del Dipartimento di Matematica, del Dipartimento di Fisica, del Dipartimento di Ingegneria industriale, del Dipartimento di Ingegneria e Scienza dell Informazione e del Centro interdipartimentale per la biologia integrata.', 
    'Apertura e Prestito: lunedì-venerdì: 8.00-21.45; sabato: 8.00-12.45.', 
    1, 
    'biblio_povo.jpg');
    
insert into 
place(name,address,history,info,type, photo) 
values 
    ('Facoltà di Giurisprudenza', 
    'via Verdi, 53 - I-38122 Trento', 
    'La Facoltà di Giurisprudenza dell Università degli Studi di Trento offre una didattica di qualità, attestata dal secondo posto su base nazionale ottenuto nella classifica del CENSIS. Questa posizione di prestigio è stata guadagnata anche grazie ad una programmazione annuale dei corsi aggiornata alle moderne prospettive professionali del giurista europeo.', 
    'tel. +39 0461 281818
    Segreteria.Giurisprudenza@unitn.it.', 
    0, 
    'giurisprudenza.jpg');
    
insert into 
place(name,address,history,info,type, photo) 
values 
    ('Dipartimento di Economia e Management', 
    'via Inama 5, I-38122 Trento', 
    'Il Dipartimento di Economia e management dell Università degli studi di Trento nasce dalla Facoltà di Economia, creata più di trent’anni fa. É riconosciuto come uno delle migliori, a livello nazionale ed internazionale, sia per la qualità della didattica che della della Facoltà di Economia. L elevato tasso di occupazione dei laureati lo può testimoniare..', 
    'Tel. +39 0461 28 2126 - 2239 - 2318
    Fax +39 0461 282241
    dem@unitn.it', 
    0, 
    'economia.jpg');
    
insert into 
place(name,address,history,info,type, photo) 
values 
    ('Dipartimento di Lettere e Filosofia', 
    'via Tommaso Gar, 14 - 38122 Trento', 
    'La Facoltà di Lettere e Filosofia dell’Università degli Studi di Trento è stata istituita con Legge n. 590 del 14 agosto 1982, e ha iniziato la sua attività con l’anno accademico 1984/1985.

    Dall’anno accademico 2001/2002, in applicazione del D.M. 509/1999, ha modificato il suo ordinamento ed ha offerto cinque corsi di laurea triennali: Filosofia, Lettere (con i percorsi classico e moderno), Mediazione linguistica e Comunicazione letteraria (con i percorsi di Lingue e Letterature moderne e Mediazione per le Imprese e il Turismo ), Scienze dei Beni culturali (con i percorsi: archivistico-librario, archeologico, beni musicali e storico-artistico), Scienze storiche. Le lauree triennali consentono l’accesso a diverse attività professionali (nel pubblico impiego, nel terziario, nel giornalismo, nell’editoria, nei sistemi bibliotecari, nei sistemi museali, nelle istituzioni culturali in genere).

    ', 
    'Tel. +39 0461 281717-2723
    Fax +39 0461 281799
    staffdip.lett@unitn.it
    Orario di apertura:
    da lunedì a giovedì 7.40 - 22.00
    venerdì 7.40 - 20.00
    sabato 7.40 - 12.30', 
    0, 
    'lettere.jpg');
    
insert into 
place(name,address,history,info,type, photo) 
values 
    ('Piazza del Duomo', 
    '38122 Trento', 
    'Chi prende oggi contatto con il Duomo di Trento, la chiesa cattedrale che porta il nome del patrono diocesano san Vigilio, è invitato dalle stesse strutture ad estendere il suo sguardo in larghezza e in profondità. Guardando dalla piazza quel lato settentrionale dell’edificio, realizzato ancora con funzione di facciata verso la parte più antica e più nobile della città, articolato con le sue strutture dal campanile alla crociera con la cupola, ci si rende conto come la costruzione non rimane un fatto isolato, ma si integra con il retrostante Castelletto dei vescovi e con l’adiacente ', 
    'La maestosità di questa piazza si può ammirare 24/24', 
    2, 
    'duomo.jpg');
    
    
insert into 
place(name,address,history,info,type, photo) 
values 
    ('Piazza Fiera', 
    '38122 Trento', 
    'Chi prende oggi contatto con il Duomo di Trento, la chiesa cattedrale che porta il nome del patrono diocesano san Vigilio, è invitato dalle stesse strutture ad estendere il suo sguardo in larghezza e in profondità. Guardando dalla piazza quel lato settentrionale dell’edificio, realizzato ancora con funzione di facciata verso la parte più antica e più nobile della città, articolato con le sue strutture dal campanile alla crociera con la cupola, ci si rende conto come la costruzione non rimane un fatto isolato, ma si integra con il retrostante Castelletto dei vescovi e con l’adiacente ', 
    'La maestosità di questa piazza si può ammirare 24/24', 
    2, 
    'fiera.jpg');
    
insert into 
place(name,address,history,info,type, photo) 
values 
    ('Piazza Venezia', 
    '38122 Trento', 
    'Chi prende oggi contatto con il Duomo di Trento, la chiesa cattedrale che porta il nome del patrono diocesano san Vigilio, è invitato dalle stesse strutture ad estendere il suo sguardo in larghezza e in profondità. Guardando dalla piazza quel lato settentrionale dell’edificio, realizzato ancora con funzione di facciata verso la parte più antica e più nobile della città, articolato con le sue strutture dal campanile alla crociera con la cupola, ci si rende conto come la costruzione non rimane un fatto isolato, ma si integra con il retrostante Castelletto dei vescovi e con l’adiacente ', 
    'La maestosità di questa piazza si può ammirare 24/24', 
    2, 
    'venezia.jpg');
    
    
    
    
    
    
    
    
    
    
    
    
    




0 for University Department<br>
1 for Libraries <br>
2 for City Squares<br>
3 for Monuments
    
    
    
    
    
    
    
    
    
