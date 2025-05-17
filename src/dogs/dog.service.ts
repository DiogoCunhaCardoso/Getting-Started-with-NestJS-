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
      name: 'Rex',
      age: 4,
      breed: 'Labrador',
      isGoodBoy: true,
      birthdate: '2019-03-10',
    },
    {
      id: 2,
      name: 'Bella',
      age: 2,
      breed: 'Bulldog',
      isGoodBoy: true,
      birthdate: '2021-07-25',
    },
    {
      id: 3,
      name: 'Charlie',
      age: 5,
      breed: 'Beagle',
      isGoodBoy: false,
      birthdate: '2018-01-15',
    },
    {
      id: 4,
      name: 'Lucy',
      age: 3,
      breed: 'Poodle',
      isGoodBoy: true,
      birthdate: '2020-11-05',
    },
    {
      id: 5,
      name: 'Max',
      age: 6,
      breed: 'German Shepherd',
      isGoodBoy: true,
      birthdate: '2017-09-30',
    },
    {
      id: 6,
      name: 'Daisy',
      age: 1,
      breed: 'Cocker Spaniel',
      isGoodBoy: false,
      birthdate: '2022-02-20',
    },
    {
      id: 7,
      name: 'Molly',
      age: 4,
      breed: 'Shih Tzu',
      isGoodBoy: true,
      birthdate: '2019-05-14',
    },
    {
      id: 8,
      name: 'Rocky',
      age: 3,
      breed: 'Boxer',
      isGoodBoy: true,
      birthdate: '2020-08-22',
    },
    {
      id: 9,
      name: 'Sadie',
      age: 2,
      breed: 'Schnauzer',
      isGoodBoy: false,
      birthdate: '2021-06-18',
    },
    {
      id: 10,
      name: 'Toby',
      age: 5,
      breed: 'Dachshund',
      isGoodBoy: true,
      birthdate: '2018-04-09',
    },
    {
      id: 11,
      name: 'Bailey',
      age: 6,
      breed: 'Rottweiler',
      isGoodBoy: true,
      birthdate: '2017-12-12',
    },
    {
      id: 12,
      name: 'Lola',
      age: 2,
      breed: 'Yorkshire Terrier',
      isGoodBoy: false,
      birthdate: '2021-03-01',
    },
    {
      id: 13,
      name: 'Buddy',
      age: 7,
      breed: 'Golden Retriever',
      isGoodBoy: true,
      birthdate: '2016-10-16',
    },
    {
      id: 14,
      name: 'Chloe',
      age: 4,
      breed: 'Shetland Sheepdog',
      isGoodBoy: true,
      birthdate: '2019-02-28',
    },
    {
      id: 15,
      name: 'Jasper',
      age: 5,
      breed: 'Boston Terrier',
      isGoodBoy: false,
      birthdate: '2018-07-07',
    },
    {
      id: 16,
      name: 'Zoe',
      age: 3,
      breed: 'Bichon Frise',
      isGoodBoy: true,
      birthdate: '2020-09-25',
    },
    {
      id: 17,
      name: 'Jack',
      age: 6,
      breed: 'Australian Shepherd',
      isGoodBoy: true,
      birthdate: '2017-11-11',
    },
    {
      id: 18,
      name: 'Luna',
      age: 1,
      breed: 'Maltese',
      isGoodBoy: false,
      birthdate: '2022-01-10',
    },
    {
      id: 19,
      name: 'Duke',
      age: 4,
      breed: 'Great Dane',
      isGoodBoy: true,
      birthdate: '2019-06-15',
    },
    {
      id: 20,
      name: 'Riley',
      age: 2,
      breed: 'Pomeranian',
      isGoodBoy: true,
      birthdate: '2021-08-20',
    },
    {
      id: 21,
      name: 'Maggie',
      age: 3,
      breed: 'Cavalier King Charles Spaniel',
      isGoodBoy: true,
      birthdate: '2020-04-04',
    },
    {
      id: 22,
      name: 'Gracie',
      age: 7,
      breed: 'Havanese',
      isGoodBoy: false,
      birthdate: '2016-12-30',
    },
  ];
  findAll(limit: number): Dog[] {
    this.authService.authenticate();
    return this.dogsDB.slice(0, limit);
  }

  findOne(id: number, date?: Date): Dog {
    const dog = this.dogsDB.find((dog) => dog.id === id);

    if (date) {
      const dogBithdate = new Date(dog.birthdate);

      const isMatch = dogBithdate.getTime() === date.getTime();

      console.log(isMatch ? 'YOU GOT IT RIGHT' : 'HOW DONT YOU KNOW??');
    }

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
