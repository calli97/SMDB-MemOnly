const TitlePrincipals=require('./parser/titlePrincipals')

let principalsPersistance={}

principalsPersistance.getPrincipalsForTitle=(tconst)=>{
    let titlePrincipals=TitlePrincipals.get('./datasets/title_principals.csv')
    let roles=titlePrincipals.filter(principipal=>principipal.tconst==tconst)
    return roles.length==0?null:roles
}
principalsPersistance.getPrincipalForTitleAndName=(tconst,nconst)=>{
    let titlePrincipals=TitlePrincipals.get('./datasets/title_principals.csv')
    let role=titlePrincipals.filter(principal=>(principal.tconst==tconst&&principal.nconst==nconst))
    return role.length==1?role[0]:null
}
principalsPersistance.getPrincipalForName=(nconst)=>{
    let titlePrincipals=TitlePrincipals.get('./datasets/title_principals.csv')
    let roles=titlePrincipals.filter(principal=>(principal.nconst==nconst))
    return roles.length==0?null:roles
}

module.exports=principalsPersistance