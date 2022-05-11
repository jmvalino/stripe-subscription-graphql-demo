import { useState } from "react";
import { API } from "aws-amplify";
import { Redirect } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$5",
    description: "Starter plan",
  },
  {
    name: "Pro",
    price: "$20",
    description: "Pro plan",
  },
  {
    name: "Partner",
    price: "$10",
    description: "Partner plan",
  },
];

const PlanSubscriptionCreateMutation = `
mutation planSubscriptionCreate($plan: Plan) {
  planSubscriptionCreate(plan: $plan) {
    id
    clientSecret
  }
}

`;

const Subscription = () => {
  const [subscriptionData, setSubscriptionData] = useState(null);

  async function handleSelectPlan(plan) {
    // console.log("plan", plan);
    const result = await API.graphql({
      query: PlanSubscriptionCreateMutation,
      variables: {
        plan: plan.toUpperCase(),
      },
    });
    console.log({ result });
    setSubscriptionData(result.data.planSubscriptionCreate);
  }

  if (subscriptionData) {
    return (
      <Redirect
        to={{
          pathname: "/payment",
          state: subscriptionData,
        }}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl text-primary">Subscription Plans</h1>
        <p className="text-lg text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="flex gap-2 mt-6">
        {plans.map(({ name, price }) => (
          <div
            key={name}
            onClick={() => handleSelectPlan(name)}
            className="flex flex-col border-primary border rounded-md w-72 h-80 p-4 cursor-pointer"
          >
            <h2 className="text-primary text-xl">{name}</h2>
            <p className="text-gray-500 text-lg">{price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Subscription;
