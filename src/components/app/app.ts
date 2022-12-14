import AppRouteBucket from "./routes/bucket";

class App {
  private message: string;
  private routes: AppRouteBucket;
  constructor() {
    this.message = "hello from App";
    this.routes = new AppRouteBucket();
  }
  public start() {
    console.log(this.message);
    console.log(this.routes.sum());
  }
}

export default App;
