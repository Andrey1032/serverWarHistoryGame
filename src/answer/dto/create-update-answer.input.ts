import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { AnswerModel } from '../model/answer.model';

@InputType()
export class CreateUpdateAnswerInput extends PickType(AnswerModel, [
  'text',
  'correct',
  'questionId',
]) {
  @Field(() => String)
  text: string;

  @Field(() => String)
  correct: string;

  @Field(() => Int)
  questionId: number;
}
