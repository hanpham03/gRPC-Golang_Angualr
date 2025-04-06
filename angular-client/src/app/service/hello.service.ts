import { Injectable } from '@angular/core';
// Sử dụng import từ ES modules thay vì CommonJS
import { HelloRequest, HelloReply } from '../proto/hello_pb';
import { GreeterClient } from '../proto/HelloServiceClientPb';

@Injectable({
  providedIn: 'root',
})
export class HelloService {
  private client: GreeterClient;

  constructor() {
    // Kết nối tới Envoy proxy (đổi port nếu cần)
    this.client = new GreeterClient('http://localhost:8080');
  }

  async sayHello(name: string): Promise<string> {
    const request = new HelloRequest();
    request.setName(name);

    try {
      // Sử dụng Promise-based API thay vì callback
      return new Promise((resolve, reject) => {
        this.client.sayHello(request, {}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.getMessage());
          }
        });
      });
    } catch (error) {
      console.error('gRPC error:', error);
      throw error;
    }
  }
}
