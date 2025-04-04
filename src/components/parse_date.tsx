'use client'

import TimeAgo from "react-timeago"

export default function ParseDate({date}:{date: string | number | Date}){
  return <TimeAgo date={date}/>
}