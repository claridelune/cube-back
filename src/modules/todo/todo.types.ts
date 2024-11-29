import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  state: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}
