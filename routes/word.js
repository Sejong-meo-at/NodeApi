module.exports = word

function word(app, Words) {
    app.post('/addWord', async (req,res)=>{
        var new_word = new Words(req.body);
        console.log('아니씨발')
        try {
          var result = await new_word.save();
        }catch(e){
            return res.status(500).json({message : "fail"})
        }
        console.log('아니씨발')
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
        if(str != ""){
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