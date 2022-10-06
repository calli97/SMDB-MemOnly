const titlePersistance=require('../database/titlePersistance')
let titleController={}

titleController.titleData=async(req,res,next)=>{
    const tconst=req.params.tconst
    let userId=req.session.loggedin?req.session.user.idUser:null
    let locals={}
    locals.path=req.path
    try {
        locals.title=await titlePersistance.getTitleFullData(tconst,userId)
        res.json(locals)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports=titleController