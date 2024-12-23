import SharedComponent from "@/components/ShareComponent";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: {
    searchParams: SearchParams
  }) {
    const searchParams = await props.searchParams
    const id = searchParams.query
  return (
   <div>
    <SharedComponent id={id as string}/>
   </div>
  );
}