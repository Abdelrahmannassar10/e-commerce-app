import { PartialType } from '@nestjs/mapped-types';
import { AddToCartDTO } from './add-to.dto';

export class UpdateCartDto extends PartialType(AddToCartDTO) {}
