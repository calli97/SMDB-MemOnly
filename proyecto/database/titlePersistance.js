const TitleBasics=require('./parser/titleBasics')
const Title=require('../models/title')
const ratingsPersistance=require('./ratingsPersistance')
const crewPersistance=require('./crewPersistance')
const principalPersistance=require('./principalPersistance')
const userOpinionPersistance=require('./userOpinionPersistance')

let titlePersistance={}

titlePersistance.getTitle=(tconst)=>{
    let titleBasics=TitleBasics.get('./datasets/title_basics.csv')
    let title=titleBasics.filter(title=>title.tconst==tconst)
    if(title.length==0){
        throw new Error('Title Not Found')
    }else{
        return title[0]
    }  
}

titlePersistance.getTitleFullData=(tconst,idUser=null)=>{
    let titleBasics=TitleBasics.get('./datasets/title_basics.csv')
    let aux=titleBasics.filter(title=>title.tconst==tconst)
    if(aux.length==0){
        throw new Error('Title Not Found')
    }else{
        let title=new Title(aux.tconst,aux.primaryTitle,aux.originalTitle,aux.type,aux.duration,aux.startYear,aux.endYear,aux.isAdult,aux.genres)
        title.addScore(ratingsPersistance.getTitleRating(tconst))
        title.addCrew(crewPersistance.getCrew(tconst))
        title.addPrincipals(principalPersistance.getPrincipalsForTitle(tconst))
        if(idUser!=null){
            try {
                let opinion=userOpinionPersistance.get(idUser,tconst)
                title.addUserOpinion(opinion)
            } catch (error) {
                //No existe la opinion
                return title
            }
        }
        return title
    }  
}

module.exports=titlePersistance