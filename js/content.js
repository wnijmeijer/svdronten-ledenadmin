'use strict';
// jshint -W003
/*global chrome*/

function set() {

}
function setValues(data) {
  if (dActiveElement==null) return;
  //use this: document.querySelector("[id='00N320000030M2p_ileinner']")
  let toGet = {
    Naam: "bedrijf",
    Geslacht: "geslacht", //m of v select
    Adres: "adres",
    Postcode: "postcode",
    Plaats: "plaats",
    Telefoon: "telefoonnummer",
    Geboortedatum: "c1Value",
    Aanvang: "",
    Trainingdag: "trainingdag",
    GSM: "mobielnummer",
    Email: "email",
    Bankrekening: "iban",
    Lidnummer: "c2Value",
    Jeugd:"", //ook bij notitie
    Volw:"", //ook bij notitie
    Gezin:"", //ook bij notitie
    MaatShirt:"",//ook bij notitie
    Bijzonderheden:"notitie"
  };
  //Check if we have bedrijf
  try {
    $('#bedrijf', dActiveElement.getRootNode()).focus();
    document.execCommand('insertText', false, data['Naam']);
    //dActiveElement.getRootNode().querySelector("[id='bedrijf']").value=data['Naam'];
  }
  catch(e)
  {
    //console.log(window.location+" ==>"+ e);
    return false;
  }
  
  //$('#bedrijf', dActiveElement.getRootNode()).val('WIM').change().triggerHandler('change');
  /*var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", true, false);
            $('#bedrijf', dActiveElement.getRootNode()).dispatchEvent(evt);
  $('#bedrijf', dActiveElement.getRootNode()).removeClass('ng-untouched').removeClass('ng-pristine');
  $('#bedrijf', dActiveElement.getRootNode()).addClass('ng-touched').addClass('ng-dirty');
  $('#bedrijf', dActiveElement.getRootNode()).trigger('ngModelChange');
  $('#bedrijf', dActiveElement.getRootNode()).trigger('input');*/
  //dActiveElement.getRootNode().querySelector("[id='adres']").
  $('#adres', dActiveElement.getRootNode()).focus();
  document.execCommand('insertText', false, data['Adres']);
  //dActiveElement.getRootNode().querySelector("[id='adres']").value=data['Adres'];
  $('#geslacht', dActiveElement.getRootNode()).focus();
  document.execCommand('insertText', false, data['Geslacht'].toLowerCase());
  //dActiveElement.getRootNode().querySelector("[id='geslacht']").value=data['Geslacht'].toLowerCase();
  $('#postcode', dActiveElement.getRootNode()).focus();
  document.execCommand('insertText', false, data['Postcode']);
  //dActiveElement.getRootNode().querySelector("[id='postcode']").value=data['Postcode'];
  $('#plaats', dActiveElement.getRootNode()).focus();
  document.execCommand('insertText', false, data['Plaats']);
  //dActiveElement.getRootNode().querySelector("[id='plaats']").value=data['Plaats'];
  $('#telefoonnummer', dActiveElement.getRootNode()).focus();
  document.execCommand('insertText', false, data['Telefoon']);
  //dActiveElement.getRootNode().querySelector("[id='telefoonnummer']").value=data['Telefoon'];
  $('#c1Value', dActiveElement.getRootNode()).focus();
  document.execCommand('insertText', false, data['Geboortedatum']);
  //dActiveElement.getRootNode().querySelector("[id='c1Value']").value=data['Geboortedatum'];
  $('#email', dActiveElement.getRootNode()).focus();
  document.execCommand('insertText', false, data['Email']);
  //dActiveElement.getRootNode().querySelector("[id='email']").value=data['Email'];
  $('#mobielnummer', dActiveElement.getRootNode()).focus();
  document.execCommand('insertText', false, data['GSM']);
  //dActiveElement.getRootNode().querySelector("[id='mobielnummer']").value=data['GSM'];
  $('#iban', dActiveElement.getRootNode()).focus();
  document.execCommand('insertText', false, data['Bankrekening']);
  //dActiveElement.getRootNode().querySelector("[id='iban']").value=data['Bankrekening'];
  $('#c2Value', dActiveElement.getRootNode()).focus();
  document.execCommand('insertText', false, data['Lidnummer']);
  //dActiveElement.getRootNode().querySelector("[id='c2Value']").value=data['Lidnummer'];
  let bijzonder='Aanvang lidmaatschap: '+data['Aanvang lidmaatschap']+'\n';
  bijzonder +='Trainen jeugd: '+data['Jeugd']+'\n';
  bijzonder += 'Trainen volwassenen: '+data['Volw']+'\n';
  bijzonder += 'Gezin aantal personen: '+data['Gezin']+'\n';
  bijzonder += 'Maat Shirt: '+data['Maat Shirt']+'\n';
  bijzonder += 'Voorkeur trainingsdag: '+data['Trainingsdag']+'\n';
  bijzonder += 'Bijzonderheden: '+data['Bijzonderheden']+'\n';
  $('#notitie', dActiveElement.getRootNode()).focus();
  document.execCommand('insertText', false, bijzonder);
  //dActiveElement.getRootNode().querySelector("[id='notitie']").value=bijzonder;
  return true;
}

chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
      // do nothing...
      //console.log("SVDronten: connected");
    });
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection") {
    //console.log("SVDronten: getSelection message received");
    let set= setValues(request.data);
    sendResponse({}); // nothing
  } else {
    sendResponse({}); // snub them.
  }
});


var dActiveElement = null;

function _dom_trackActiveElement(evt) {
   if (evt && evt.target) {
      dActiveElement = evt.target;
      //console.log("focus on: " + dActiveElement.nodeName + " id: " + dActiveElement.id);
   } else {
     //console.log("focus else..");
   }
}

if (document.addEventListener) {
  document.addEventListener("focus",_dom_trackActiveElement,true);
}


//console.log(window.location+" ==>"+ "SVDronten: loaded...");