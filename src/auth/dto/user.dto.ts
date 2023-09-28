import { Expose } from 'class-transformer';

// this DTO specify what properties should be expose to the outgoing responses
export class UserDto {
    // specify this property will be exposed to responses
    @Expose()
    id: number;

    // sepcify this peropty will be exposed to responses
    @Expose()
    email: string;

    @Expose()
    userName: string;
}
