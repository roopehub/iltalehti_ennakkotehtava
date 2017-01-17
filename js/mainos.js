/*magic funktio lé cheff*/
function onBodyLoad(){
    
/*Luodaan random luku muuttujaan ja kutsutaan sitä arvoilla, jotta saadaan tulostettua satunnainen mainos*/    
function randomNumero(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/*1-10 koska oli 10 mainosta*/
var randomMainos = randomNumero(0, 10);
    
/*Teksti punaiseksi, mustaa eikä valkoista erota koska tausta :) */   
if(randomMainos == 5 || randomMainos == 4){
    $('#tulostaMainos').css('color', 'red');
    $('#otsikkoteksti').css('color', 'red');
}

/*Määritellään tulostuksen kohde*/
$("#tulostaMainos").append("<h2></h2>");
    
$.ajax({  
    url:'data/feed.xml', /*Tehtävän annossa ei määritelty haluttiinko hakea data webistä vai näin lokaalisti, http://.../feed antoi "equest header field Content-Type is not allowed by Access-Control-Allow-Headers, ilmeisesti vaatii käyttöoikeudet? tms?*/
    dataType:'text',  
    contentType:'application/xml',  
    timeout:10000,  
    type:'GET',  
    success:function(data) {  

    /*Alustetaan tulostus*/         
    var response = $('<html />').html(data);
        
    /*haetaan tiedot xmllästä*/
    var otsikko = response.find('item title')[randomMainos].childNodes[0].nodeValue;
    
    var taustakuva = response.find('item articleimagebig')[randomMainos].childNodes[0].nodeValue;
    
    var haettulinkki = response.find('item link')[randomMainos].nextSibling.nodeValue;
        
    /*Tulostetaan haettu teksti html*/
    $("<h2></h2>").html(otsikko).appendTo("#tulostaMainos h2");
        
    /*Asetetaan haettu kuva taustaksi*/
    $('.mainwrapper').css('background-image', 'url(' + taustakuva +' )');
            
    /*lisätään tilaadiville linkkaus*/
    var a = document.getElementById('tilaalinkki');
    a.href = haettulinkki;
        
    /*Näkee mitä haetaan selaimen consolessa*/
    console.log(otsikko);
    console.log(taustakuva);
    console.log(haettulinkki);
    console.log(randomMainos);
    },
    
    /*Tämä pahis heittää erroria jos homma ei toimi*/
    error:function(XMLHttpRequest,textStatus, errorThrown) {     
      alert("Error status :"+textStatus);  
      alert("Error type :"+errorThrown);  
      alert("Error message :"+XMLHttpRequest.responseXML);  
    }});
}

    