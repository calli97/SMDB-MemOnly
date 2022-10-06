const {parser}=require('./utils')
const Title=require('../../models/title')

class TitleBasics{
    static #INITIALIZE=false
    static #ROWS=[]
    static get(path){
        if(TitleBasics.#INITIALIZE){
            return TitleBasics.#ROWS
        }else{
            let rows=parser(path,'\t')
            
            for(let i=0;i<rows.length;i++){
                if(rows[i].length!=9){
                    continue
                }
                const tconst=rows[i][0]
                const titleType=rows[i][1]
                const primaryTitle=rows[i][2]
                const originalTitle=rows[i][3]
                const isAdult=rows[i][4]=='1'?true:false
                const startYear=rows[i][5]=='NULL'?null:Number(rows[i][5])
                const endYear=rows[i][6]=='NULL'?null:Number(rows[i][6])
                const duration=rows[i][7]=='NULL'?null:Number(rows[i][7])
                let genres=rows[i][8]=='NULL'?null:rows[i][8].split(',')
                TitleBasics.#INITIALIZE=true
                TitleBasics.#ROWS.push(new Title(tconst,primaryTitle,originalTitle,titleType,duration,startYear,endYear,isAdult,genres))
            }
            return TitleBasics.#ROWS
        }
    }
}

module.exports=TitleBasics