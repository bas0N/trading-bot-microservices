import avro from "avsc";
export default avro.Type.forSchema({
  type: "record",
  name: "Pet",
  fields: [
    {
      name: "category",
      type: { type: "enum", name: "PetKind", symbols: ["CAT", "DOG"] },
    },
    { name: "noise", type: "string" },
  ],
});
