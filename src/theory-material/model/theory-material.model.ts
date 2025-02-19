import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { TheoryMaterial } from '@prisma/client';
import { TypeFileModel } from 'src/type-file/model/type-mini-game.model';

@ObjectType()
export class TheoryMaterialModel implements TheoryMaterial {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  topicId: number;

  @Field(() => Int)
  typeFileId: number;

  @Field(() => TypeFileModel)
  TypeFile: TypeFileModel;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  deleted_at: Date;
}
