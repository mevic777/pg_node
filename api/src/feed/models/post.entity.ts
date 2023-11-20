import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('feed_post') // Crearea tabelului si structura sa
export class FeedPostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    body: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}