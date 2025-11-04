import { SetMetadata } from "@nestjs/common"
export const PUBLIC ="PUBLIC"
export const Public =()=>{
    return SetMetadata(PUBLIC,true);
}