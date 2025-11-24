
import { SetMetadata } from '@nestjs/common';
export const ROLE = 'role'
// export const Roles = Reflector.createDecorator<string[]>();
export const Roles = (value:string[])=> SetMetadata(ROLE,value)
