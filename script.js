function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "../posts.xml?id="+Math.random(), false);
  xmlhttp.send();
}



function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;

  var x = xmlDoc.getElementsByTagName("posts");
  var y = x[0].getElementsByTagName("post");

  for (i = 0; i <y.length; i++) {
   // set the innerhtml of all elements with id 0,1,2,3,4... 
    document.getElementById(i).innerHTML=
          y[i].getElementsByTagName("title")[0].innerHTML;
   
   //and their links...
    document.getElementById(i).href = 
          y[i].getElementsByTagName("link")[0].innerHTML;               
  }    
}


/*document.onload = function(){
  var button = document.getElementById('clickButton');
  setInterval(function(){
        button.click();
    },6000);
}*/