import { Injectable } from "@nestjs/common";

type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
};


@Injectable()
export class UsersRepository {
  private users:User[] = [
    {
      id: 1,
      email: "user1@example.com",
      name: "Alice Johnson",
      password: "password123",
      address: "123 Main St",
      phone: "555-1234",
      country: "USA",
      city: "New York"
    },
    {
      id: 2,
      email: "user2@example.com",
      name: "Bob Smith",
      password: "securePass1",
      address: "456 Elm St",
      phone: "555-5678",
      country: "Canada",
      city: "Toronto"
    },
    {
      id: 3,
      email: "user3@example.com",
      name: "Charlie Brown",
      password: "passCharlie",
      address: "789 Maple Ave",
      phone: "555-8765",
      country: "UK",
      city: "London"
    },
    {
      id: 4,
      email: "user4@example.com",
      name: "Diana Ross",
      password: "diana1234",
      address: "101 Oak St",
      phone: "555-6543",
      country: "Australia",
      city: "Sydney"
    },
    {
      id: 5,
      email: "user5@example.com",
      name: "Evan Williams",
      password: "evan2023",
      address: "202 Pine St",
      phone: "555-4321",
      country: "USA",
      city: "Chicago"
    },
    {
      id: 6,
      email: "user6@example.com",
      name: "Fiona Liu",
      password: "fionaLiu",
      address: "303 Cedar St",
      phone: "555-7890",
      country: "China",
      city: "Beijing"
    },
    {
      id: 7,
      email: "user7@example.com",
      name: "George Clark",
      password: "geoClark",
      address: "404 Birch St",
      phone: "555-6789",
      country: "New Zealand",
      city: "Wellington"
    },
    {
      id: 8,
      email: "user8@example.com",
      name: "Hannah Lee",
      password: "hannahPass",
      address: "505 Walnut Ave",
      phone: "555-2345",
      country: "South Korea",
      city: "Seoul"
    },
    {
      id: 9,
      email: "user9@example.com",
      name: "Ian Gomez",
      password: "ianGomez89",
      address: "606 Chestnut Ave",
      phone: "555-3456",
      country: "Bolivia",
      city: "Santa Cruz"
    },
    {
      id: 10,
      email: "user10@example.com",
      name: "Julia Roberts",
      password: "julRob99",
      address: "707 Redwood St",
      phone: "555-4567",
      country: "USA",
      city: "San Francisco"
    }
    
  ];
  getUsers(page: number, limit: number): User[] {
    const start = (page-1)*limit
    const end = start + +limit

    return this.users.slice(start, end)
  }

  getUserById(id:number){
    return this.users.find(user => user.id === id)
  }

  createUser(user: any){
    const id = this.users.length +1
    user.id =id
    this.users.push(user)
    return user
  }

  deleteUser(id:number){
    this.users = this.users.filter(user=>user.id !== id)
     return "Se eliminó al usuario"
  }

  updateUser(id:number, user: any){
    const oldUser = this.users.find((user)=>user.id === id)

    const updateUser = {...oldUser, ...user}
    return updateUser


  }
}
