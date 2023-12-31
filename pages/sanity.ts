import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";
export const client=createClient({
    projectId:"owo0k8ny",
    dataset:"production",
    apiVersion:"",
    useCdn:true,
});
const builder=ImageUrlBuilder(client);
export function urlFor(source:any){
    return builder.image(source);
}