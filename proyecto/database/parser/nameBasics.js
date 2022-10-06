const {parser}=require('./utils')
const Name=require('../../models/name')

class NameBasics{
    static #INITIALIZE=false
    static #ROWS=[]
    static get(path){
        if(NameBasics.#INITIALIZE){
            return NameBasics.#ROWS
        }else{
            let rows=parser(path,'\t')
            for(let i=0;i<rows.length;i++){
                if(rows[i].length!=6){
                    continue
                }
                const nconst=rows[i][0]
                const primaryName=rows[i][1]
                const birthYear=rows[i][2]==0?null:Number(rows[i][2])
                const deathYear=rows[i][3]==0?null:Number(rows[i][3])
                let primaryProfession=(rows[i][4]=='NULL'||rows[i][4]=='')?null:rows[i][4].split(',')
                let knownForTitles=(rows[i][5]=='NULL'||rows[i][5]=='')?null:rows[i][5].split(',')
                NameBasics.#ROWS.push(new Name(nconst,primaryName,birthYear,deathYear,primaryProfession,knownForTitles))
            }
            return NameBasics.#ROWS
        }
    }
}

module.exports=NameBasics