import { ListDto } from 'src/modules/list/dto/list.dto';

export class ProjectDetailDto {
  id: string;

  name: string;

  description: string;

  created_by: string;

  created_at: string;

  updated_at: string;

  lists: ListDto[];
}
