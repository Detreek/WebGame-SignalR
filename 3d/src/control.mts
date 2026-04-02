import { canvas } from "./canvas.mts";
class Key {
  wentDown = false;
  wentUp = false;
  isDown = false;

  handleKeyDown() {
    if (!this.isDown) {
      this.wentDown = true;
      this.isDown = true;
    }
  }

  handleKeyUp() {
    if (this.isDown) {
      this.wentUp = true;
      this.isDown = false;
    }
  }

  clear() {
    this.wentUp = false;
    this.wentDown = false;
  }
}

class Mouse extends Key {
  x = 0;
  y = 0;
  movementX = 0;
  movementY = 0;

  clear() {
    super.clear();
    this.movementX = 0;
    this.movementY = 0;
  }
}

class Input {
  keyboard : Record<string,Key> = {};
  mouse = new Mouse();

  #locked = false;

  init() {
    this.#watchKeyDown();
    this.#watchKeyUp();
    this.#watchLockMouse();
    this.#watchMouseDown();
    this.#watchMouseUp();
    this.#watchMouseMove();
    this.#watchMouseLeave();
  }

  clear() {
    for (let key in this.keyboard) {
      this.keyboard[key].clear();
    }
    this.mouse.clear();
  }

  #watchKeyDown() {
    document.addEventListener("keydown", (event : KeyboardEvent) => {
      if (!this.keyboard[event.key]) {
        this.keyboard[event.key] = new Key();
      }
      const key = this.keyboard[event.key];
      key.handleKeyDown();
    });
  }

  #watchKeyUp() {
    document.addEventListener("keyup", (event : KeyboardEvent) => {
      if (!this.keyboard[event.key]) {
        this.keyboard[event.key] = new Key();
      }
      const key = this.keyboard[event.key];
      key.handleKeyUp();
    });
  }

  #watchLockMouse() {
    document.addEventListener("pointerlockchange", () => {
      this.#locked = !this.#locked;
    });
  }

 #watchMouseDown() {
    document.addEventListener("mousedown", () => {
      if (!this.#locked) {
        document.body.requestPointerLock();
        document.body.requestFullscreen();
      }
      this.mouse.handleKeyDown();
    });
  }

  #watchMouseUp() {
    document.addEventListener("mouseup", () => {
      this.mouse.handleKeyUp();
    });
  }

  #watchMouseMove() {
    document.addEventListener("mousemove", (event) => {
      let rect = canvas.getBoundingClientRect();
      this.mouse.x =
        (event.clientX / rect.width) * canvas.width - canvas.width / 2;
      this.mouse.y =
        (event.clientY / rect.height) * canvas.height - canvas.height / 2;
      if (this.#locked) {
        this.mouse.movementX += event.movementX;
        this.mouse.movementY += event.movementY;
      }
    });
  }

  #watchMouseLeave() {
    document.addEventListener("mouseleave", () => {
      this.mouse.x = 0;
      this.mouse.y = 0;
    });
  }
}

export const input = new Input();
input.init();
