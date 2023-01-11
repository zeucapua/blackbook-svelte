import { json } from "@sveltejs/kit";
import redis from "$lib/server/upstash";
import type { RequestHandler } from "@sveltejs/kit";

const database = "blackbook";
const redirect = { status: 303, headers: { location: "/" } };

export const GET = (async () => {
  let spells : Record<string, unknown>[] = [];
  const data = await redis.hgetall(database);
  if (!data) return json({spells: spells});
  spells = Object.keys(data)
    .map((key) => ({
        id: key,
        chant: data[key]["chant"],
        result: data[key]["result"],
      })
    );

  return json({spells: spells});
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
  const id = Date.now().toString();
  const spell = await request.json();  

  await redis.hset(database, id, JSON.stringify(spell));
  return redirect;
});
