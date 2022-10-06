const {parser}=require('./utils')
const Role=require('../../models/role')

class TitlePrincipals{
    static #INITIALIZE=false
    static #ROWS=[]
    static get(path){
        if(TitlePrincipals.#INITIALIZE){
            return TitlePrincipals.#ROWS
        }else{
            let rows=parser(path,'\t')
            for(let i=0;i<rows.length;i++){
                if(rows[i].length!=6){
                    continue
                }
                const tconst=rows[i][0]
                const nconst=rows[i][2]
                const category=rows[i][3]
                const job=rows[i][4]=='NULL'?null:rows[i][4]
                let characters
                if(rows[i][5]=='NULL'){
                    characters=null
                }else{
                    characters=rows[i][5].replaceAll('\"','')
                    characters=characters.replaceAll('[','')
                    characters=characters.replaceAll(']','')
                    characters=characters.split(',')
                }
                TitlePrincipals.#ROWS.push(new Role(nconst,tconst,category,job,characters))
            }
            TitlePrincipals.#INITIALIZE=true
            return TitlePrincipals.#ROWS
        }
    }
}

module.exports=TitlePrincipals