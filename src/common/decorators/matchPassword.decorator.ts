import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'MatchPassword',
  async: false,
})
export class MatchPassword implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    if (confirmPassword !== (args.object as any)[args.constraints[0]])
      return false;
    return true;
  }
  defaultMessage(): string {
    return 'Password no coincide con su confirmacion';
  }
}
