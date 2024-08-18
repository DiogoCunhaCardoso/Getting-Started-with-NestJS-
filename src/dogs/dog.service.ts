import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './interface/dog.interface';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
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
    return this.dogsDB;
  }

  findOne(id: number): Dog {
    const dog = this.dogsDB.find((dog) => dog.id === id);
    return dog;
  }

  create(body: CreateDogDto): Dog {
    const newId = this.dogsDB.length + 1;
    const newDog = { id: newId, ...body };
    this.dogsDB.push(newDog);
    return newDog;
  }

  update(id: number, body: UpdateDogDto): Dog {
    const dogIndex = this.dogsDB.findIndex((dog) => dog.id === id);
    const updatedDog = { ...this.dogsDB[dogIndex], ...body };
    this.dogsDB[dogIndex] = updatedDog;

    return updatedDog;
  }

  delete(id: number): void {
    const dogIndex = this.dogsDB.findIndex((dog) => dog.id === id);

    this.dogsDB.splice(dogIndex, 1);
  }
}
