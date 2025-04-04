import { ReleaseAppModel } from "@/models/ReleaseAppModel";
import  fs,{ existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import PathServices from "./path_services";

const filepath = path.join(PathServices.createDir(path.join(process.cwd(),'public','release')),'release_app.json')


const ReleaseAppServices = {
    getList():ReleaseAppModel[]{
        let list:ReleaseAppModel[] = []
        if(existsSync(filepath)){
            const res = readFileSync(filepath,'utf8')
            if(res === ''){
                fs.unlinkSync(filepath)
                return list;
            }
            //is not empty 
            const jsonList=  JSON.parse(res)
            for(var json of jsonList){
                list.push(ReleaseAppModel.fromJson(json))
                
            }
            
            
        }
        return list;
    },
    async setList(release:ReleaseAppModel){
        let list = this.getList()
        list.unshift(release)
        writeFileSync(filepath,JSON.stringify(list,null,2),'utf8')
        
    }
}

export default ReleaseAppServices;



