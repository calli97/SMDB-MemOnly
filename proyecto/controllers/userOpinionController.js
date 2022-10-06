const userOpinionPersistance=require('../database/userOpinionPersistance')
let userOpinionController={}

userOpinionController.addOpinion=async(req,res,next)=>{
    let tconst=req.params.tconst
    let userId=req.session.loggedin?req.session.user.idUser:null
    let rating=Number(req.body.rating)
    let favorite=req.body.favorite?1:0
    let state=req.body.state

    let userOpinion=await userOpinionPersistance.add(userId,tconst,rating,favorite,state)
    if(userOpinion){
        res.status(201).json(userOpinion)
    }else{
        res.status(500).end()
    }
}

userOpinionController.updateOpinion=async(req,res,next)=>{
    let tconst=req.params.tconst
    let userId=req.session.loggedin?req.session.user.idUser:null
    let rating=Number(req.body.rating)
    let favorite=req.body.favorite?1:0
    let state=req.body.state
    try {
        let userOpinion=await userOpinionPersistance.update(userId,tconst,rating,favorite,state)
        res.status(201).json(userOpinion)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

userOpinionController.deleteOpinion=async(req,res,next)=>{
    let tconst=req.params.tconst
    let userId=req.session.loggedin?req.session.user.idUser:null
    try {
        let userOpinion=await userOpinionPersistance.delete(userId,tconst)
        res.status(200).json(null)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports=userOpinionController