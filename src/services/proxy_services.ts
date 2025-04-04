import path from "path"
import PathServices from "./path_services";
import { existsSync, readFileSync, writeFileSync } from "fs";

const dirpath = PathServices.createDir(path.join(process.cwd(),'public','proxy'));
const forwardPath = path.join(dirpath,'forward_proxy.json');
const browserPath = path.join(dirpath,'browser_proxy.json');

const ProxyServices = {
  async getForwardList():Promise<string[]>{
    let list:string[] = []
    if(existsSync(forwardPath)){
      const content = readFileSync(forwardPath,'utf8')
      return JSON.parse(content)
    }
    return list;
  },
  async getBrowserList():Promise<string[]>{
    let list:string[] = []
    if(existsSync(browserPath)){
      const content = readFileSync(browserPath,'utf8')
      return JSON.parse(content)
    }
    return list;
  },
  //set
  setForwardList(url:string){
    var list:string[] = []
    if(existsSync(forwardPath)){
      const content = readFileSync(forwardPath,'utf8')
      list = JSON.parse(content)
    }
    list.unshift(url)
    //save
    writeFileSync(forwardPath,JSON.stringify(list))
  },
  setBrowserList(url:string){
    var list:string[] = []
    if(existsSync(browserPath)){
      const content = readFileSync(browserPath,'utf8')
      list = JSON.parse(content)
    }
    list.unshift(url)
    //save
    writeFileSync(browserPath,JSON.stringify(list))
  },
  //delete
  deleteForwardList(url:string){
    var list:string[] = []
    if(existsSync(forwardPath)){
      const content = readFileSync(forwardPath,'utf8')
      list = JSON.parse(content)
    }
    list = list.filter((str)=> str !== url)
    
    //save
    writeFileSync(forwardPath,JSON.stringify(list))
  },
  deleteBrowserList(url:string){
    var list:string[] = []
    if(existsSync(browserPath)){
      const content = readFileSync(browserPath,'utf8')
      list = JSON.parse(content)
    }
    list = list.filter((str)=> str !== url)
    //save
    writeFileSync(browserPath,JSON.stringify(list))
  },
}

export default ProxyServices;