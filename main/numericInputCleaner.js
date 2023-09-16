export class NumericInputCleaner {
  static clear(str) {
    let result = "";
    
    for (const c of str) {
      if (NumericInputCleaner._isDigit(c))
        result += c;
    }

    return NumericInputCleaner._removeZeros(result) || "0";
  }

  static _isDigit(chr) {
    return chr >= '0' && chr <= '9';
  }

  static _removeZeros(str) {
    let carry = 0;

    for (const c of str) {
      if (c == 0)
        carry++;
      else
        break;
    }

    const slice = str.slice(carry);
    return slice;
  }
}