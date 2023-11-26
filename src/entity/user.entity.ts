import {Entity,PrimaryColumn,Column} from 'typeorm';
@Entity()
export class User{
    @PrimaryColumn()
    public id : number;

    @Column()
    public name:string;

    @Column({unique :true})
    public email:string

    @Column()
    public password:string;
    
}