const NameBasics=require('./parser/nameBasics')
const principalPersistance=require('./principalPersistance')

let namePersitance={}

namePersitance.getNameFullData=(nconst)=>{
    let nameBasics=NameBasics.get('./datasets/name_basics.csv')
    let name=nameBasics.filter(name=>name.nconst=nconst)
    if(name.length!=1){
        throw new Error('Name Not Found')
    }
    name[0].addRoles(principalPersistance.getPrincipalForName(nconst))
    return name[0]
}

namePersitance.getName=(nconst)=>{
    let nameBasics=NameBasics.get('./datasets/name_basics.csv')
    let name=nameBasics.filter(name=>name.nconst=nconst)
    if(name.length!=1){
        throw new Error('Name Not Found')
    }
    return name[0]
}

module.exports=namePersitance