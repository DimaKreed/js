import {CommentModel} from "./comment.model";

export interface PostModel {
  userId:number;
  id:number;
  title:string;
  body:string;
  comments:CommentModel[];
}
