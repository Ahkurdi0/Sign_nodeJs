const express = require('express');
const client = require("@mailchimp/mailchimp_marketing");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
})
app.post("/",(req,res)=>{
  const email = req.body.email;
  const fname = req.body.fname;
  const lname = req.body.lname;

  client.setConfig({
    apiKey: "9eb7c312df47852a3f4ab3b947b5ab19-us12",
    server: "us12",
  });

  const run = async () => {
      const response = await client.lists.addListMember("e624da1c56",
          {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                  FNAME: fname,
                  LNAME: lname,
              },
          },
          {
              skipMergeValidation: false
          }
      );
  };


  run()
  .then(()=>res.send("<h1>All good, thanks!</h1>"))
  .catch(()=>res.send("<h1>Error!</h1>"));
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is listening on port 3000");
})
//
// apiKey: "9eb7c312df47852a3f4ab3b947b5ab19-us12",
// server: "us12",
// e624da1c56


//

//

//
//
//
