export class BigNum {
  constructor(init, log10 = false) {
    if (log10) {
      this.value = init;
    } else if (typeof init === "number") {
      this.value = Math.log10(init);
    } else if (typeof init === "string") {
      let v = init.split("e");
      this.value = Math.log10(v[0]) + parseInt(v[1]);
    } else if (typeof init === "object") {
      this.value = init.value;
    } else {
      console.error("could not convert to BigNum", init);
    }
  }

  plus(v) {
    return this.add(v);
  }

  add(v) {
    if (typeof v === "number") {
      v = new BigNum(v);
    }
    let diff = this.value - v.value;
    if (diff > 32) {
      this.value = Math.max(this.value, v.value);
    } else {
      this.value = Math.log10(Math.pow(10, diff) + 1) + v.value;
    }
    return this;
  }

  subtract(v) {
    if (typeof v === "number") {
      v = new BigNum(v);
    }

    if (v > this) {
      this.value = -Infinity;
    } else {
      let diff = this.value - v.value;
      if (diff < 32) {
        this.value = Math.log10(Math.pow(10, diff) - 1) + v.value;
      }
    }
    return this;
  }

  minus(v) {
    return this.subtract(v);
  }

  times(v) {
    return this.multiply(v);
  }

  multiply(v) {
    if (typeof v === "number") {
      this.value += Math.log10(v);
    } else {
      this.value += v.value;
    }
    return this;
  }

  divide(v) {
    if (typeof v === "number") {
      this.value -= Math.log10(v);
    } else {
      this.value -= v.value;
    }
    return this;
  }

  pow(v) {
    this.value *= v;
    return this;
  }

  to(type = "engineering") {
    if (this.value < 7) {
      type = "number";
    }
    switch (type) {
      case "engineering":
        return `${Math.pow(10, this.value % 3).toFixed(3)}e${
          3 * Math.floor(this.value / 3)
        }`;
      case "number":
        return `${Math.round(Math.pow(10, this.value)).toLocaleString()}`;
      default:
        return this.value;
    }
  }

  geometricSum(numerator, number) {
    return this.copy()
      .times(new BigNum(numerator).pow(number).minus(1))
      .divide(numerator - 1);
  }

  maxGeometricSum(numerator, threshold) {
    return (
      threshold
        .copy()
        .divide(this.copy())
        .times(numerator - 1)
        .add(1).value / Math.log10(numerator)
    );
  }

  copy() {
    return new BigNum(this.value, true);
  }

  valueOf() {
    return this.value;
  }

  toJSON() {
    return this.value;
  }

  static fromNumber(init) {
    return new BigNum(init);
  }

  static fromEngineering(init) {
    return new BigNum(init);
  }

  static fromLog10(init) {
    return new BigNum(init, true);
  }

  static times(a, b) {
    return a.copy().times(b);
  }

  static add(a, b) {
    return a.copy().add(b);
  }
  static subtract(a, b) {
    return a.copy().subtract(b);
  }
}
