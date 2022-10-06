const TitleCrew=require('./parser/titleCrew')

let crewPersistance={}

crewPersistance.getCrew=(tconst)=>{
    titleCrew=TitleCrew.get('./datasets/title_crew.csv')
    let crew=titleCrew.filter(crew=>crew.tconst==tconst)
    return crew.length==1?crew[0]:null
}

module.exports=crewPersistance