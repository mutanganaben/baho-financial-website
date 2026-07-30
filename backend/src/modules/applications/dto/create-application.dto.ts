import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'National ID or Passport number is required' })
  @Matches(/^[0-9]{16}$|^[A-Z0-9]{6,12}$/i, {
    message: 'National ID must be a valid 16-digit Rwandan ID or Passport number',
  })
  nationalId: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'Residential location (District & Sector) is required' })
  district: string;

  @IsString()
  @IsNotEmpty({ message: 'Product selection is required' })
  productSlug: string;

  @IsInt({ message: 'Amount requested must be a whole number' })
  @Min(50000, { message: 'Minimum loan amount is RWF 50,000' })
  @Max(50000000, { message: 'Maximum loan amount is RWF 50,000,000' })
  amountRequested: number;

  @IsInt({ message: 'Duration must be a whole number of months' })
  @Min(1, { message: 'Minimum duration is 1 month' })
  @Max(12, { message: 'Maximum duration is 12 months' })
  durationMonths: number;

  @IsString()
  @IsNotEmpty({ message: 'Loan purpose & business description is required' })
  loanPurpose: string;

  @IsString()
  @IsOptional()
  preferredBranch?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
