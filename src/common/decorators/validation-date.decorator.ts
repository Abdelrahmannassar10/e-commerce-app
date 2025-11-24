import { DiscountType } from '@common/types';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const { fromDate } = obj;
          if (fromDate > value) {
            return false;
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const obj = args.object as any;
          const { fromDate,toDate } = obj;
          if (fromDate > toDate) {
            return 'to date cannot exceed from date';
          }
          
          return 'Invalid to date';
        },
      },
    });
  };
}
