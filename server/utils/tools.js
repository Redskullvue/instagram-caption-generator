export const tools = [
  {
    type: "function",
    function: {
      name: "newsForm",
      description:
        "returns a template for news like captions for journalists as string",
      parameters: {
        type: "object",
        properties: {
          subject: {
            type: "string",
            description:
              "The subject that user wants to write about Options : Could be anything",
          },
        },
      },
      required: ["subject"],
    },
  },
];

export function newsForm(subject) {
  return `کپشن نوشته شده باید در مورد ${subject} باشه 
    قالب کپشن های خبری در اینستاگرام به صورت سریع و  فوق العاده رسمی هستند
    `;
}
