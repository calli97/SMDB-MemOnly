const fs = require("fs");

module.exports={
    parser:(path,separator)=>{
        const file=fs.readFileSync(path,'utf-8')
        let lines=file.split(/\r?\n/)
        let rows=[]
        for(let i=1;i<lines.length;i++){
        rows.push(lines[i].split(separator))
        }
        return rows
    }
}