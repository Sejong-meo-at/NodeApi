module.exports = auth

function auth(app, Users, rndstring){
    app.post('/signin', async (req,res) => {
        let result = await Users.findOne(req.body)
        if(!result) return res.status(404).json({message : "User Not Found"})
        res.status(200).json({token : result.token})
    })
    .post('/signup', async(req,res)=>{
        var user = new Users(req.body);
        user.token = rndstring.generate(25);
        try {
          var result = await user.save();
        }catch(e){
          if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
          if(e instanceof ValidationError) return res.status(400).json({message: e.message});
          if(e instanceof paramsError) return res.status(400).json({message: e.message});
        }
        res.status(200).json(user);
    })
    .post('/signdel', async(req,res)=>{
        var result = await Users.remove({token : req.body.token})
        if(!result.ok) return res.status(500).json({message : "ERR!"})
        else return res.status(200).json({message : "success!"})
    })
}