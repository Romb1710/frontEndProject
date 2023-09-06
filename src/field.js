
// Class that represents a field in a form
class Field {

  constructor(label, type, name, options=[] ,required = false) {
    this.label = label;
    this.type = type;
    this.name = name;
    this.required = required;
    this.options = options;
  }

}

export default Field;
