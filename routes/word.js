module.exports = word

function word(app, Words) {
    app.post('/addWord', async (req,res)=>{
        var word = new Words(req.body);
        try {
          var result = await word.save();
        }catch(e){
          if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
          if(e instanceof ValidationError) return res.status(400).json({message: e.message});
          if(e instanceof paramsError) return res.status(400).json({message: e.message});
        }
        res.status(200).json({message : "success!"});
    })
    .post('/findWord', async (req,res)=>{
        let result = await Words.findOne({word : req.body.word})
        if(!result) return res.status(204).json({message : "Not Found!"})
        else return res.status(200).json({mean : result.mean})
    })
    .post('/change', async (req,res)=>{
        let result = await Words.find()
        let str = req.body.str
        let ss = str
        if(str.length >= 1){
            for(var i=0;result[i] != null;i++){
              ss = ss.replace(new RegExp(result[i].word,"gi"),result[i].mean);
            }
            res.status(200).send(ss);
        }
        else {
            res.status(404).send("입력해요..");
        }
    })
    .post('/findAll', async (req,res)=>{
        let result = await Words.find()
        res.status(200).json({list : result})
    })
}