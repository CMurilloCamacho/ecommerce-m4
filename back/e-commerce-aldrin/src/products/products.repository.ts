import { Injectable } from "@nestjs/common";

export interface Product  {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  imgUrl: string;
}
@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop Pro 15',
      description: 'High-performance laptop with 16GB RAM and 512GB SSD.',
      price: 1299.99,
      stock: true,
      imgUrl: 'https://example.com/images/laptop-pro-15.jpg',
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      description: 'Noise-canceling over-ear headphones with Bluetooth.',
      price: 199.99,
      stock: true,
      imgUrl: 'https://example.com/images/wireless-headphones.jpg',
    },
    {
      id: 3,
      name: 'Smartphone X',
      description: 'Latest model smartphone with 5G and 128GB storage.',
      price: 899.99,
      stock: false,
      imgUrl: 'https://example.com/images/smartphone-x.jpg',
    },
    {
      id: 4,
      name: '4K LED TV',
      description: '55-inch 4K Ultra HD TV with HDR.',
      price: 749.99,
      stock: true,
      imgUrl: 'https://example.com/images/4k-led-tv.jpg',
    },
    {
      id: 5,
      name: 'Gaming Console',
      description: 'Next-gen gaming console with 1TB storage.',
      price: 499.99,
      stock: false,
      imgUrl: 'https://example.com/images/gaming-console.jpg',
    },
    {
      id: 6,
      name: 'Smartwatch Series 5',
      description: 'Fitness tracking smartwatch with heart rate monitor.',
      price: 299.99,
      stock: true,
      imgUrl: 'https://example.com/images/smartwatch-series-5.jpg',
    },
    {
      id: 7,
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with powerful bass.',
      price: 49.99,
      stock: true,
      imgUrl: 'https://example.com/images/bluetooth-speaker.jpg',
    },
    {
      id: 8,
      name: 'Digital Camera',
      description: 'Compact digital camera with 20MP resolution.',
      price: 399.99,
      stock: false,
      imgUrl: 'https://example.com/images/digital-camera.jpg',
    },
    {
      id: 9,
      name: 'Tablet S10',
      description: '10-inch tablet with 64GB storage and stylus support.',
      price: 299.99,
      stock: true,
      imgUrl: 'https://example.com/images/tablet-s10.jpg',
    },
    {
      id: 10,
      name: 'Wireless Charger',
      description: 'Fast wireless charger compatible with all Qi devices.',
      price: 29.99,
      stock: true,
      imgUrl: 'https://example.com/images/wireless-charger.jpg',
    },
  ];
  getProducts(): Product[] {
    return this.products;
  }
}
