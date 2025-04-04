import fs, { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import PathServices from "./path_services";
import { ReleaseModel } from "@/models/release_model";
import { release } from "node:os";

const filepath = path.join(PathServices.createDir(path.join(process.cwd(), 'public', 'release')), 'release.json')

const ReleaseServices = {
  async getList(): Promise<ReleaseModel[]> {
    let list: ReleaseModel[] = []
    if (existsSync(filepath)) {
      const res = readFileSync(filepath, 'utf8')
      if (res === '') {
        fs.unlinkSync(filepath)
        return list;
      }
      //is not empty 
      const jsonList = JSON.parse(res)
      for (var json of jsonList) {
          list.push(json as ReleaseModel);   
      }
    }
    return list;
  },
  async get({key,value}:{key:string,value:string}):Promise<ReleaseModel | undefined> {
    const list = await this.getList()
    return list.find((release)=> release[key as keyof typeof release] == value)
  },
  async addList(release: ReleaseModel) {
    let list = await this.getList()
    list.unshift(release)
    writeFileSync(filepath, JSON.stringify(list, null, 2), 'utf8')

  },
  async update({id,body}:{id:string,body:ReleaseModel}) {
    var list = await this.getList()
    list = list.filter((release)=> release.id != id);
    list.unshift(body)
    writeFileSync(filepath, JSON.stringify(list, null, 2), 'utf8')
  },
}

export default ReleaseServices;