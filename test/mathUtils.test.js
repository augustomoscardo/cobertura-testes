import { expect } from "chai"
import { GenericContainer } from "testcontainers"
import { sum, divide } from "../src/mathUtils.js"

let container;

before(async function () {
  this.timeout(30000)

  container = await new GenericContainer("alpine")
    .withCommand(["sh", "-c", "sleep 60"])
    .start();

  console.log(`Container iniciada: ${container.getId()}`);
})

after(async function () {
  if (container) {
    await container.stop()
    console.log('Container encerrada.');
  }
})

describe('sum', () => {
  it('should add two numbers', () => {
    expect(sum(2, 3)).to.equal(5);
  });

  it('should throw error for non-number inputs', () => {
    expect(() => sum("2", 3)).to.throw('Invalid arguments');
  });
})

describe("divide", () => {
  it('should divide two numbers', () => {
    expect(divide(6, 3)).to.equal(2)
  })

  it('should throw error for 0 divisor', () => {
    expect(() => divide(4, 0)).to.throw('Division by zero');
  });
})