import { existsSync, mkdirSync, statSync } from "fs";

const PathServices = {
  createDir(path:string):string{
    if(existsSync(path) == false){
      mkdirSync(path)
    }
    return path;
  }
}

export default PathServices;