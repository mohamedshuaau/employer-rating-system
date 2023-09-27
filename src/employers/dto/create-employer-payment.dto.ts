import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateEmployerPaymentDto {
  @IsNotEmpty({ message: 'An employer must be selected' })
  @IsInt()
  employer_id: number;

  @IsDateString()
  @IsNotEmpty({ message: 'Contribution month is required' })
  contribution_month: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Due date is required' })
  due_date: string;
}
