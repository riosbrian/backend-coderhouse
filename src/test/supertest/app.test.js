import { expect } from "chai";
import supertest from "supertest";
import { verifyTokenTEST } from "../../utils/jwt.js";

const requester = supertest("http://localhost:8081/api");

describe("Testing de mi API REST", () => {
  let cookie;
  // AUTH
  /* it("Deberia registar un nuevo usuario exitosamente", async () => {
    const userData = {
      name: "Test",
      lastname: "User",
      username: "testing",
      email: "testuser@example.com",
      age: 25,
      password: "test1234",
    };

    const response = await requester
      .post("/auth/register")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).to.have.property("error", false);
    expect(response.body).to.have.property("data");
    expect(response.body).to.have.property(
      "message",
      "User register successflly"
    );
  }); */

  it("Deberia fallar al intentar registrar un usuario ya registrado", async () => {
    const existingUserData = {
      name: "Magali",
      lastname: "Rios",
      username: "magui",
      email: "magali@gmail.com",
      age: 25,
      password: "1234",
    };

    // Registro del usuario existente
    await requester.post("/auth/register").send(existingUserData);

    // Intentar registrar al mismo usuario nuevamente
    const response = await requester
      .post("/auth/register")
      .send(existingUserData)
      .expect("Content-Type", /json/)
      .expect(403);

    expect(response.body).to.have.property("status", 403);
    expect(response.body).to.have.property(
      "message",
      "Email already registered"
    );
  });

  it("Deberia loguear un usuario registrado correctamente", async () => {
    const userData = {
      email: "brian@gmail.com",
      password: "1234",
    };

    const response = await requester
      .post("/auth/login")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(200);

    const { headers } = response;
    cookie = {
      name: headers["set-cookie"][0].split("=")[0],
      value: headers["set-cookie"][0].split("=")[1],
    };

    expect(response.body).to.have.property("error", false);
    expect(response.body).to.have.property("data");
    expect(response.body).to.have.property(
      "message",
      "User logged successflly"
    );
  });

  it("Deberia fallar al loguear un usuario con credenciales incorrectas", async () => {
    const userData = {
      email: "brian@gmail.com",
      password: "incorrectpassword",
    };

    const response = await requester
      .post("/auth/login")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).to.have.property("status", 401);
    expect(response.body).to.have.property(
      "message",
      "Invalid credentials, authentication required"
    );
  });

  it("Deberia cerrar sesion correctamente", async () => {
    const response = await requester
      .post("/auth/logout")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.property("error", false);
    expect(response.body).to.have.property(
      "message",
      "Session closed successfully"
    );
    expect(response.body).to.have.property("redirect", "/login");
  });

  // PRODUCTOS
  it("Deberia obtener todos los productos", async () => {
    const response = await requester
      .get("/products/")
      .set("cookie", [cookie.name + "=" + cookie.value])
      .expect("Content-Type", /json/)
      .expect(200);

    let { _body } = response;
    const products = _body.data.docs;
    expect(Array.isArray(products)).to.be.equals(true);
  });

  it("Deberia obtener un producto por el ID", async () => {
    const response = await requester
      .get("/products/656a09747b82d525de7e79ac")
      .set("cookie", [cookie.name + "=" + cookie.value])
      .expect("Content-Type", /json/)
      .expect(200);

    let { _body } = response;
    const product = _body.data;
    expect(product).to.have.property("_id");
  });

  it("Deberia actualizar un producto por el ID", async () => {
    const updateTest = {
      title: "Halo Infinite - new title",
      price: 70.99,
    };

    const response = await requester
      .put("/products/656a09747b82d525de7e79ac")
      .send(updateTest)
      .set("cookie", [cookie.name + "=" + cookie.value])
      .expect("Content-Type", /json/)
      .expect(201);

    let { _body } = response;
    const product = _body.data;
    expect(product).to.have.property("_id");
  });

  /* it("Deberia crear un producto", async () => {
    const newProductTest = {
      title: "Product test",
      description: "Product description test",
      price: 50.99,
      thumbnail: "no imagen",
      code: "PTA345",
      stock: 100,
    };

    const response = await requester
      .post("/products/")
      .send(newProductTest)
      .set("cookie", [cookie.name + "=" + cookie.value])
      .expect("Content-Type", /json/)
      .expect(200);

    let { _body } = response;
    const product = _body.data;
    expect(product).to.have.property("_id");
  }); */

  /* it("Deberia eliminar un producto por ID", async () => {
    const response = await requester
      .delete("/products/656b6972669887931ee40c5f")
      .set("cookie", [cookie.name + "=" + cookie.value])
      .expect("Content-Type", /json/)
      .expect(201);

    let { _body } = response;
    const product = _body.data;
    expect(product).to.have.property("_id");
  }); */

  // CARRITO
  it("Deberia obtener el carrito del usuario logueado", async () => {
    const response = await requester
      .get("/carts/")
      .set("cookie", [cookie.name + "=" + cookie.value])
      .expect("Content-Type", /json/)
      .expect(200);

    let { _body } = response;
    const cart = _body.data;
    expect(cart).to.have.property("_id");
  });

  it("Deberia crear un carrito", async () => {
    console.log(secret);
    console.log(verifyTokenTEST(cookie.value.split(";")[0], secret));
    const response = await requester
      .post("/carts/")
      .set("cookie", [cookie.name + "=" + cookie.value])
      .expect("Content-Type", /json/)
      .expect(200);

    let { _body } = response;
    const cart = _body.data;
    expect(cart).to.have.property("_id");
  });
});
