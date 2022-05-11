const client = require("./dynamodb-client");
const { ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

async function listTodos() {
  try {
    const params = {
      TableName: "TodoTable",
    };

    const command = new ScanCommand(params);
    const request = await client.send(command);
    const parseResponse = request.Items.map((data) => unmarshall(data));
    response = request ? parseResponse : {};
  } catch (e) {
    console.log(e);
    response = {
      error: e.message,
      errorStack: e.stack,
      statusCode: 500,
    };
  }

  return response;
}

const resolvers = {
  Query: {
    todos: async (ctx) => {
      return listTodos(ctx);
    },
  },
};

exports.handler = async (ctx) => {
  const typeHandler = resolvers[ctx.info.parentTypeName];
  if (typeHandler) {
    const resolver = typeHandler[ctx.info.fieldName];
    if (resolver) {
      return await resolver(ctx);
    }
  }
  throw new Error("Resolver not found.");
};
