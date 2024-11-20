import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

//funcion validadora
@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPassword implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    console.log('ESTO ES ARGS', args);

    if (password !== args.object[args.constraints[0]]) return false;
    return true;
  }
  defaultMessage(args?: ValidationArguments): string {
    return 'El password no coincide';
  }
}
