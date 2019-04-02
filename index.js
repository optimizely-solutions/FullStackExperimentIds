console.log("v0.12");
var optly = new OptimizelyAPI({
    password: 'fsexperimentids',
    oauth_client_id: 14330300653
  });

var form = document.getElementById("simple-form")
form.onsubmit = function (event) { 
    event.preventDefault(); 
    optly.get("experiments?project_id=13239170233", function(exps){
        console.log(exps);
    });
}