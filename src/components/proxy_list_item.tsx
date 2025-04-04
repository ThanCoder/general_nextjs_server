interface Props {
  url: string;
  onClicked: (url: string) => void;
  onDelete?: (url: string) => void;
}
export default function ProxyListItem(props: Props) {
  return (
    <div className="flex justify-between mb-1 border-b">
      <div className="cursor-pointer hover:text-blue-600" onClick={() => props.onClicked(props.url)}>{props.url}</div>
      <button
      className="bg-red-500 hover:bg-red-700 text-white p-1 rounded-sm cursor-pointer"
      onClick={()=>{
        if(props.onDelete != null){
          props.onDelete(props.url);
        }
      }}>Delete</button>
    </div>
  );
}
