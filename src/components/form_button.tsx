import { useFormStatus } from "react-dom";

export default function FormButton({text,pendingText,className}:{text:string,pendingText:string,className?:string}) {
  const status = useFormStatus();
  return (
    <button className={className} disabled={status.pending}>
      {status.pending ? pendingText : text}
    </button>
  );
}