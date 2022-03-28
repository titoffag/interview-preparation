const required = (val) => {
  return val === ""
    ? {
        required: "field is required",
      }
    : null;
};

class FormModel {
  constructor(
    fields = {
      fieldName: {
        value: "",
        validators: [required],
      },
    }
  ) {
    this.fields = fields;
  }

  validationConcreteField(fieldName) {
    const field = this.fields[fieldName];
    const errors = field.validators
      .map((validator) => {
        const result = validator(field.value);
        this.fields[fieldName].errors[validator.name] = result,
        return result;
      })
      .filter(Boolean);

    this.fields[fieldName].isValid = errors.length === 0;
    return this.fields[fieldName].isValid;
  }
}
