import ParseDate from "@/components/parse_date";
import prisma from "@/lib/prisma";
import { getProxyUrl } from "@/utils/app_utils";
import Link from "next/link";
import ReleaseDeleteButton from "./release_delete_button";

const RelaseList = async () => {
  const list = await prisma.release.findMany({ orderBy: { date: "desc" } });

  function getCoverUrl(url: string) {
    if (url === "") {
      return "/logo.webp";
    }
    return getProxyUrl(url);
  }

  return (
    <div className="mt-2">
      {list.map((release) => (
        <div
          key={release.id}
          className="flex gap-1 card border-b border-b-cyan-950 hover:cursor-pointer"
        >
          {/* cover image */}
          <img
            src={getCoverUrl(release.coverUrl)}
            width={130}
            height={130}
            alt={"img"}
          />
          {/* list */}
          <div className=" hover:bg-gray-300 flex-auto">
            <Link href={`/release/${release.id}`}>
            <div>Title: {release.title}</div>
            <div>Package Name: {release.packageName}</div>
            <div>Repository: {release.repository}</div>
            <div>Desc: {release.description}</div>
            <div>
              Date: <ParseDate date={release.date} />
            </div></Link>
            <div className="flex gap-1" >
              <Link href={`/release/${release.id}`} className="btn default">Edit</Link>
              <ReleaseDeleteButton release={release}/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelaseList;
