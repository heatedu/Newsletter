// https://stark-hamlet-37039.herokuapp.com/

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.post("/",function(req,res)
{
  var firstname=req.body.fName;
  var lastname=req.body.lName;
  var mail=req.body.email;

  var data={
    members:[
      {
        email_address:mail,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
      }
    ]
  };

  //TO TURN JS OBJECT INTO json
  var json=JSON.stringify(data)

  // console.log(firstname,lastname,mail);

var options={
  //THE URL THAT WE WANT TO SEND OUR REQUEST TO
  url:"https://us17.api.mailchimp.com/3.0/lists/09b2348c0a",
  //HOW WE WANT OUR REQUEST TO BE PROCESSED
  method:"POST",
  headers:{
    //AUTHORIZATION
    "Authorization":"sammy a00733936222e1a459a028b53dcd402e-us17"
  },
  body:json
};

request(options,function(error,response,body)
{
  if(error)
  {
    res.send("There was an error signing up,please try again!");
    // console.log(error);
  }
  else{
    if(response.statusCode===200)
    {
    // res.send("Successfully signed up");
    res.sendFile(__dirname+"/success.html");

  }
  else{
    // res.send("There was an error signing up,please try again!");
    res.sendFile(__dirname+"/failure.html");

  }
    // console.log(response.statusCode);
  }
});

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");

})
//TO WORK ON HEROKU process.env.PORT
//TO WORK LOCALLY 3000
app.listen(process.env.PORT || 3000,function()
{
  console.log("Server is running on port 3000");
})
// a00733936222e1a459a028b53dcd402e-us17
// 09b2348c0a
