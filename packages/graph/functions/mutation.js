const { PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const { v4 } = require("uuid");
const client = require("./dynamodb-client");

import { stripe } from "./stripe";

async function createStripeSubsciption(ctx) {
  // create customer from user context
  const customer = await stripe.customers.create({
    name: ctx.identity.username,
  });

  let price;

  switch (ctx.arguments.plan) {
    case "STARTER":
      price = "price_1Kvv6bKfsnO6FKLvWmtNLe6j";
      break;
    case "PRO":
      price = "price_1KvbGMKfsnO6FKLva9EtEJn7";
      break;
    case "PARTNER":
      price = "price_1KvbEIKfsnO6FKLvdzHnPXpj";
  }

  // create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price }],
    payment_behavior: "default_incomplete",
    expand: ["latest_invoice.payment_intent"],
  });

  return {
    id: subscription.id,
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
  };
}

const resolvers = {
  Mutation: {
    planSubscriptionCreate: async (ctx) => {
      return createStripeSubsciption(ctx);
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
