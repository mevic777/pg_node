import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPost } from '../models/post.interface';
import { from, Observable } from 'rxjs';

@Injectable()
export class FeedService {
  //  Inject repository from our entity
  //  The <Repository> class helps us to interact with database
  //  And write queries without actually using SQL and reuse
  //  queries without duplication
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  //  Transforming and processing our promise into Observable
  //  (asynchronious operations) - async, await
  createPost(feedPost: FeedPost): Observable<FeedPost> {
    return from(this.feedPostRepository.save(feedPost));
  }

  findAllPosts(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }
}
