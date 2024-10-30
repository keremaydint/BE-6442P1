import { GRPC as Cerbos } from "@cerbos/grpc";

const cerbos = new Cerbos("localhost:3000", { tls: false });
interface Principal {
  id: number;
  roles: string[];
}

interface Resource {
  kind: string;
  id: number;
}

export const authorize = async (
  principal: Principal,
  resource: Resource,
  action: string
): Promise<boolean> => {
  const result = await cerbos.check({
    principal,
    resource,
    actions: [action],
  });
  return result.isAllowed(action);
};
