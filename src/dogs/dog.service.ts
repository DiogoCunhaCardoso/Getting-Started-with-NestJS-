import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './interface/dog.interface';
import { UpdateDogDto } from './dto/update-dog.dto';
import { AuthService } from 'src/auth/auth.service';
/* import { DogNotFoundException } from 'src/exceptions/dog-not-found.exception'; */

@Injectable()
export class DogsService {
  constructor(private authService: AuthService) {}
  private readonly dogsDB: Dog[] = [
    {
      id: 1,
      name: 'Buddy',
      age: 3,
      breed: 'Golden Retriever',
      isGoodBoy: true,
    },
    { id: 2, name: 'Max', age: 5, breed: 'German Shepherd', isGoodBoy: false },
  ];
  findAll(): Dog[] {
    this.authService.authenticate();
    return this.dogsDB;
  }

  findOne(id: number): Dog {
    const dog = this.dogsDB.find((dog) => dog.id === id);
    if (!dog) throw new NotFoundException(id);
    return dog;
  }

  create(body: CreateDogDto): Dog {
    const exists = this.dogsDB.some((dog) => dog.name === body.name);
    if (exists) throw new ConflictException("Can't have same name");
    const newId = this.dogsDB.length + 1;
    const newDog = { id: newId, ...body };
    this.dogsDB.push(newDog);
    return newDog;
  }

  update(id: number, body: UpdateDogDto): Dog {
    const dogIndex = this.dogsDB.findIndex((dog) => dog.id === id);
    if (dogIndex === -1) throw new NotFoundException(id);
    const updatedDog = { ...this.dogsDB[dogIndex], ...body };
    this.dogsDB[dogIndex] = updatedDog;

    return updatedDog;
  }

  delete(id: number): void {
    const dogIndex = this.dogsDB.findIndex((dog) => dog.id === id);
    if (dogIndex === -1) throw new NotFoundException(id);
    this.dogsDB.splice(dogIndex, 1);
  }
}
